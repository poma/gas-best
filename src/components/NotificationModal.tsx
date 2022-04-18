import {
  FormEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useClickAway, useLocalStorage, usePermission } from "react-use";
import { rgba } from "polished";
import styled from "styled-components";
import { IS_EXTENSION } from "~/config";
import useFeeNotificationSetting from "~/hooks/useFeeNotificationSettings";
import useModal from "~/hooks/useModal";
import Modal from "./Modal";
import Panel from "./Panel";
import Text from "./Text";

const Content = styled(Panel)`
  display: flex;
  flex-direction: column;
  max-width: 200px;
  padding: 10px 12px;
  margin: max(100px, 10%) auto;
`;

const Header = styled.header`
  padding-bottom: 8px;
`;

const Title = styled.h1`
  padding-bottom: 4px;
  color: ${(props) => props.theme.fg.title};
  font-size: 12px;
  font-weight: 600;
  margin: 0;
  user-select: none;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 8px;
`;

const Input = styled.input`
  flex: 1 0 auto;
  max-width: 90px;
  padding: 4px;
  margin-right: 5px;
  color: #ffffff;
  background: ${(props) => props.theme.bg.secondary};
  border-radius: 3px;
  border: 1px solid transparent;

  &:focus {
    outline: none;
    border-color: ${(props) => rgba(props.theme.fg.primary, 0.5)};
  }

  &:hover {
    border-color: ${(props) => rgba(props.theme.accent.primary, 0.5)};
  }

  &:disabled {
    color: ${(props) => rgba(props.theme.fg.primary, 0.5)};
    border: 1px solid ${(props) => rgba(props.theme.fg.primary, 0.5)};
  }
`;

const Button = styled.button`
  flex: 0 1 70px;
  color: #ffffff;
  cursor: pointer;
  border-radius: 3px;
  border: 1px solid transparent;
  background: transparent;

  &:focus {
    outline: none;
    border-color: ${(props) => rgba(props.theme.fg.primary, 0.5)};
  }

  &:hover {
    border-color: ${(props) => rgba(props.theme.accent.primary, 0.5)};
  }

  &:disabled {
    color: ${(props) => props.theme.fg.primary};
    cursor: default;
    pointer-events: none;
  }
`;

const CheckboxLabel = styled.label<{ disabled: boolean }>`
  display: grid;
  grid-template-columns: 1em auto;
  gap: 1em;
  line-height: 1.2;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
`;

const Checkbox = styled.input`
  display: grid;
  place-content: center;

  appearance: none;
  margin: 0;

  font: inherit;
  color: transparent;
  width: 16px;
  height: 16px;
  background: ${(props) => props.theme.bg.secondary} !important;
  border-radius: 3px;
  border-width: 1px !important;
  border-style: solid !important;
  transform: translateY(-0.075em);

  &:focus {
    outline: none;
    border-color: ${(props) => rgba(props.theme.fg.primary, 0.5)};
  }

  &:hover {
    border-color: ${(props) => rgba(props.theme.accent.primary, 0.5)};
  }

  &::before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    transform: scale(0);
    transform-origin: center;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em var(--form-control-color);
    background: ${(props) => rgba(props.theme.accent.primary, 1)};
  }

  &:checked::before {
    transform: scale(1.4);
  }

  &:disabled {
    color: ${(props) => props.theme.fg.primary};
    cursor: default;
    background: ${(props) => rgba(props.theme.fg.primary, 0.5)};
    border: 1px solid ${(props) => rgba(props.theme.fg.primary, 0.5)};
    pointer-events: none;
  }

  &:disabled::before {
    background: ${(props) => rgba(props.theme.fg.primary, 0.5)};
  }
`;

const isValidInput = (value: string) => /^([1-9]\d{0,3})?$/.test(value);

const NotificationModal: React.FC = () => {
  const { notification, setNotification, clearNotification } =
    useFeeNotificationSetting();
  const isActive = useMemo(() => !!notification.target, [notification]);
  const permission = usePermission({ name: "notifications" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [price, setPrice] = useState(
    isActive ? String(notification.target) : ""
  );
  const [once, setOnce] = useLocalStorage(
    "fee-notification-once",
    notification.once
  );

  const { closeModal } = useModal();
  const modalRef = useRef(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  useClickAway(modalRef, closeModal);

  const inputHandler = (value: string) => {
    if (isValidInput(value)) {
      setPrice(value);
    }
  };

  const submitHandler: FormEventHandler = useCallback(
    async (event) => {
      event.preventDefault();
      if (isActive) {
        clearNotification();
      } else {
        const parsed = parseInt(price, 10);
        setNotification({ target: parsed, once: !!once });
        setFormSubmitted(true);
      }
    },
    [isActive, price, once, setNotification, clearNotification]
  );

  useEffect(() => inputRef.current?.focus(), [inputRef]);

  const NotificationWarnings = useCallback(() => {
    const isPrompt = formSubmitted && permission === "prompt";
    const isDenied = permission === "denied";

    if (!IS_EXTENSION && (isPrompt || isDenied)) {
      return (
        <Text variant="warning" style={{ paddingTop: 8 }}>
          Please allow browser notifications
        </Text>
      );
    }

    return null;
  }, [formSubmitted, permission]);

  return (
    <Modal>
      <Content ref={modalRef}>
        <Header>
          <Title>Notification</Title>
          <Text>Notify when gas price is lower than:</Text>
        </Header>
        <Form onSubmit={(event) => submitHandler(event)}>
          <Input
            pattern="^[1-9]\d{0,3}$"
            disabled={isActive}
            onChange={(event) => inputHandler(event.target.value)}
            value={price}
            ref={inputRef}
            tabIndex={1}
          />
          <Button disabled={!price} tabIndex={2} type="submit">
            {!isActive ? "SET" : "REMOVE"}
          </Button>
        </Form>
        <CheckboxLabel disabled={isActive}>
          <Checkbox
            disabled={isActive}
            type="checkbox"
            checked={isActive ? notification.once : once}
            onChange={(event) => setOnce(event.target.checked)}
            tabIndex={3}
          />
          <Text>Notify once</Text>
        </CheckboxLabel>
        <NotificationWarnings />
      </Content>
    </Modal>
  );
};

export default NotificationModal;
