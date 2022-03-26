import { useState } from "react";
import Main from "./views/Main";
import Container from "./components/Container";
import Theme from "./styles/Theme";
import ExtensionStyle from "./styles/ExtensionStyle";
// import NotificationButton from "./components/NotificationButton";
// import PasteButton from "./components/PasteButton";

type Page = "main" | "test";

const titles: Record<Page, string> = {
  main: "Recommended gas prices",
  test: "Test",
};

function App() {
  const [page, _setPage] = useState<Page>("main");

  const renderPages = () => {
    switch (page) {
      case "main":
        return <Main />;
      case "test":
        return <div>test</div>;
    }
  };
  return (
    <div className="App">
      <Theme>
        <ExtensionStyle />
        <Container
          title={titles[page]}
          // nav={
          //   <React.Fragment>
          //     <PasteButton onClick={() => setPage("main")} />
          //     <NotificationButton onClick={() => setPage("test")} />
          //   </React.Fragment>
          // }
        >
          {renderPages()}
        </Container>
      </Theme>
    </div>
  );
}

export default App;
