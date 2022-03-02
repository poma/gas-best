import NavButton from "../NavButton";
import { ReactComponent as NotificationSVG } from "./assets/notification.svg";

interface NotificationButtonProps {
  onClick: () => void;
}

const NotificationButton: React.FC<NotificationButtonProps> = ({ onClick }) => (
  <NavButton onClick={onClick}>
    <NotificationSVG />
  </NavButton>
);

export default NotificationButton;
