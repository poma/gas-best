import { FeeNotificationContextProvider } from "./contexts/FeeNotificationContext";
import { ModalContextProvider } from "./contexts/ModalContext";

const Providers: React.FC = ({ children }) => (
  <ModalContextProvider>
    <FeeNotificationContextProvider>{children}</FeeNotificationContextProvider>
  </ModalContextProvider>
);

export default Providers;
