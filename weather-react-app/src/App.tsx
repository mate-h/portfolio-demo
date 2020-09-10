import React from "react";
import { Paragraph } from "./components/Paragraph";

function App() {
  return (
    <main className="container mx-auto">
      <header className="App-header">
        <Paragraph className="headline6">Simple weather application</Paragraph>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </main>
  );
}

export default App;
