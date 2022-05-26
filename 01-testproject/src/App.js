import React, { useState } from "react";
import Card from "./Components/UI/Card";
import NewInputForm from "./Components/InputForm/NewInputForm";
import ItemList from "./Components/NewItem/ItemList";

function App() {
  const [inputNew, setInputNew] = useState([]);

  const addNewHandler = (enteredText) => {
    setInputNew((prevGoals) => {
      console.log("App.js에서 찍은 내용 : " + enteredText);
      return [enteredText, ...prevGoals];
    });
  };

  const deleteItemHandler = (goalId) => {
    setInputNew((prevGoals) => {
      console.log(goalId);
      const updatedGoals = prevGoals.filter((goal) => goal.id !== goalId);
      return updatedGoals;
    });
  };

  return (
    <div>
      <Card>
        <br />
        <h2>안녕하세요!</h2>
        <NewInputForm onAddNew={addNewHandler}></NewInputForm>
      </Card>
      <ItemList items={inputNew} onDeleteItem={deleteItemHandler}></ItemList>
    </div>
  );
}

export default App;
