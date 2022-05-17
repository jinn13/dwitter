import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";
import ExpensesFilter from "./components/Expenses/ExpensesFilter";

const App = () => {
  const expenses = [
    {
      id: "e1",
      title: "Toilet Paper",
      amount: 94.12,
      date: new Date(2020, 7, 14),
    },
    {
      id: "e2",
      title: "New TV",
      amount: 799.49,
      date: new Date(2021, 2, 12),
    },
    {
      id: "e3",
      title: "Car Insurance",
      amount: 294.67,
      date: new Date(2019, 2, 28),
    },
    {
      id: "e4",
      title: "New Desk (Wooden)",
      amount: 450,
      date: new Date(2021, 5, 12),
    },
  ];

  const addExpensehandler = (expense) => {
    console.log("In App.js");
    console.log(expense);
  };

  const changeDate = (year) => {
    console.log(year);

    for (let index = 0; index < expenses.length; index++) {
      if (year == expenses[index].date.getFullYear()) {
        console.log(expenses[index].date.getFullYear());
      }
    }
  };

  return (
    <div>
      <NewExpense onAddExpense={addExpensehandler} />
      <ExpensesFilter onSaveDate={changeDate} />
      <Expenses items={expenses} />
    </div>
  );
};

export default App;
