import React, { useContext, useState } from "react";
import NavigationBar from "./NavigationBar";
import { GlobalState } from "../GlobalState";
export default function AppComponent() {
  const state = useContext(GlobalState);
  const addExpense = state.userAPI.addExpense;

  const [item, setItem] = useState([]);
  const [inputValue, setInputValue] = useState("");

  function handleChange(e) {
    const { value } = e.target;
    setInputValue(value);
  }

  function addItem(e) {
    e.preventDefault();
    setItem(prevVal => {
      return [...prevVal, inputValue]
    })
    // addExpense(item);
    setInputValue("");
  }

  return (
    <>
      <div className="container container-fluid d-flex justify-content-center mt-5">
        <div className="col-md-10 d-flex justify-content-center">
          <div>
            {item.map((element, index) =>
              <div className="" key={index}>
                <p className="border p-2 fs-3 text-black">{element}</p>
              </div>
            )}
      <div className="expense-list-container">
        {"Enter here"}
      </div>
      
            <form action="" onSubmit={addItem}>
            <input
  type="text"
  className="expense-input"
  name="doItem"
  value={inputValue}
  onChange={handleChange}
/>
              <button type="submit" className="btn btn-success rounded-2">Add</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
