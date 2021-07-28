import "./App.css";
import styled from "styled-components";

import { NavBar } from "./components/NavBar";

const data = [
  {
    id: 0,
    date: "22/04/2021",
    name: "Coffee",
    category: "eating_out",
    amount: 4.5,
    type: "expense",
  },
  {
    id: 1,
    date: "22/04/2021",
    name: "Coffee",
    category: "eating_out",
    amount: 4.5,
    type: "expense",
  },
  {
    id: 2,
    date: "22/04/2021",

    name: "April payroll",
    category: "salary",
    amount: 4500,
    type: "income",
  },
  {
    id: 3,
    date: "22/04/2021",

    name: "Coffee",
    category: "eating_out",
    amount: 4.5,
    type: "expense",
  },
  {
    id: 4,
    date: "22/04/2021",
    name: "Macbook",
    category: "electronics",
    amount: 4500,
    type: "expense",
  },
  {
    id: 5,
    date: "22/04/2021",
    name: "T-shirt",
    category: "clothes",
    amount: 35,
    type: "expense",
  },
];

const Table = styled.table`
  width: 80%;
  padding: 64px;
  text-align: left;
`;

const HeadCell = styled.th`
  padding: 16px 0;
  width: 20%;
`;

const TableCell = styled.td`
  padding: 8px 0;
  width: 20%;
`;
//  color: ${(props) => {
//   console.log("props", props);
//   switch (props.type) {
//     case "expense":
//       return "red";
//     case "income":
//       return "green";
//     default:
//       return "inherit";
//   }
//  }};

const Amount = styled.p`
  color: ${(props) => (props.type === "expense" ? "#FF7661" : "#00E4C6")};
`;

// const ExpenseCell = styled.td`
//   padding: 8px 0;
//   width: 20%;
//   color: red;
// `;
// const IncomeCell = styled.td`
//   padding: 8px 0;
//   width: 20%;
//   color: green;
// `;

function App() {
  // const amountCell = (transaction) => {
  //   // switch(transaction.type)
  //   return transaction.type === "expense" ? (
  //     <ExpenseCell> {transaction.amount} </ExpenseCell>
  //   ) : (
  //     <IncomeCell> {transaction.amount} </IncomeCell>
  //   );
  // };

  return (
    <div className='layout'>
      <NavBar />
      <Table>
        <thead>
          <tr>
            <HeadCell>Date</HeadCell>
            <HeadCell>Name</HeadCell>
            <HeadCell>Category</HeadCell>
            <HeadCell>Amount</HeadCell>
            <HeadCell>Actions</HeadCell>
          </tr>
        </thead>
        <tbody>
          {data.map((transaction) => {
            /* console.log("transaction", transaction); */
            return (
              <tr key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.name}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>
                  <Amount type={transaction.type}>{transaction.amount}</Amount>
                </TableCell>

                {/* {amountCell(transaction)} */}

                <TableCell>Edit/Delete</TableCell>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
