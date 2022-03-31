import styled from "styled-components";

interface ModalProps {
  className?: string;
}

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
`;

const Modal: React.FC<ModalProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Modal;
