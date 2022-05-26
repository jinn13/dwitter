import React, { useState } from "react";

const NewInputForm = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredAge, setEnteredAge] = useState("");

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const submitChangeHandler = (event) => {
    event.preventDefault();

    const inputData = {
      id: Math.random().toString(),
      name: enteredName,
      age: enteredAge,
    };

    props.onAddNew(inputData);
    setEnteredName("");
    setEnteredAge("");

    console.log(inputData);
  };

  return (
    <form onSubmit={submitChangeHandler}>
      <div>
        <div>
          <label style={{ fontWeight: "bold" }}>UserName</label>
        </div>
        <input type="text" onChange={nameChangeHandler} value={enteredName} />
      </div>
      <div>
        <div>
          <label style={{ fontWeight: "bold" }}>Age(Years)</label>
        </div>
        <input type="text" onChange={ageChangeHandler} value={enteredAge} />
      </div>
      <div>
        <button type="submit">Add User</button>
      </div>
    </form>
  );
};

export default NewInputForm;
