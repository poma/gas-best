import React, { useState } from "react";
import Main from "./views/Main";
import Container from "./components/Container";
import Theme from "./styles/Theme";
import ExtensionStyle from "./styles/ExtensionStyle";
import NotificationButton from "./components/NotificationButton";
// import PasteButton from "./components/PasteButton";
import NotificationModal from "./components/NotificationModal";
import useModal from "./hooks/useModal";

type Page = "main";

const titles: Record<Page, string> = {
  main: "Recommended gas prices",
};

const isNotificationSupported = !!window.Notification;

function App() {
  const [page, _setPage] = useState<Page>("main");
  const { modal, openModal } = useModal();

  const renderPage = () => {
    switch (page) {
      case "main":
        return <Main />;
    }
  };

  const renderModal = () => {
    switch (modal) {
      case "notification":
        return <NotificationModal />;
      case "none":
        return null;
    }
  };

  return (
    <div className="App">
      <Theme>
        <ExtensionStyle />
        <Container
          title={titles[page]}
          nav={
            <React.Fragment>
              {isNotificationSupported && (
                <NotificationButton onClick={() => openModal("notification")} />
              )}
            </React.Fragment>
          }
        >
          {renderPage()}
          {renderModal()}
        </Container>
      </Theme>
    </div>
  );
}

export default App;
