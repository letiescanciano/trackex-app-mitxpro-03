import React from "react";

const TrackexContext = React.createContext();

const TrackexProvider = ({ children }) => {
  const categories = {
    eating_out: "Eating out",
    clothes: "Clothes",
    electronics: "Electronics",
    groceries: "Groceries",
    salary: "Salary",
  };

  const types = {
    expense: "Expense",
    income: "Income",
  };

  return (
    <TrackexContext.Provider value={{ categories, types }}>
      {children}
    </TrackexContext.Provider>
  );
};

export { TrackexContext, TrackexProvider };
