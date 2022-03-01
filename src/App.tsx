import React, { useState } from "react";
import Main from "./views/Main";
import Container from "./components/Container";
import Theme from "./styles/Theme";

type Page = "main" | "test";

function App() {
  const [page, setPage] = useState<Page>("main");
  return (
    <div className="App">
      <Theme>
        <Container>
          <Main />
        </Container>
      </Theme>
    </div>
  );
}

export default App;
