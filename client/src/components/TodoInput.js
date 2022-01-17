import React, { Fragment, useState } from "react";
import axios from "axios";

const TodoInput = () => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const headers = { "Content-Type": "application/json" };

    try {
      const body = { description };
      const response = await axios.post("http://localhost:5000/todos", body, {
        headers,
      });
      window.location = "/";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">PERN Todo List</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-success"> Add </button>
      </form>
    </Fragment>
  );
};

export default TodoInput;
