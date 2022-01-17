import React, { Fragment } from "react";
import "./App.css";
import TodoInput from "./components/TodoInput";

function App() {
  return (
    <Fragment>
      <div className="container">
        <TodoInput />
      </div>
    </Fragment>
  );
}

export default App;
