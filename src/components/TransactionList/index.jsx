import React, { useState, useContext } from "react";
import styled from "styled-components";

import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import TransactionDrawer from "../Drawer";
import { TrackexContext } from "../../contexts/trackexContext";

import data from "./data";

const Table = styled.table`
  width: 100%;
  padding: 16px 0;
  text-align: left;
`;

const HeadCell = styled.th`
  padding: 16px 0;
  width: 20%;
`;

const TableCell = styled.td`
  padding: 8px 0;
  width: 23%;
  &(:last-of-type) {
    display: flex;
    justify-content: flex-end;
    width: 8%;
  }
`;

const Amount = styled.p`
  color: ${(props) => (props.type === "expense" ? "#FF7661" : "#00E4C6")};
`;

const Grid = styled.div`
  width: 100%;
  padding: 64px;
`;
const AddButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TransactionList = () => {
  const AVAILABLE_MODES = {
    add: "add",
    edit: "edit",
  };

  const DEFAULT_MODE = "add";

  const [open, setOpen] = useState(false);
  const [transactions, setTransactions] = useState(data);
  const [transaction, setTransaction] = useState({});
  const [mode, setMode] = useState(DEFAULT_MODE);
  const [openDialog, setOpenDialog] = useState(false);

  const { categories } = useContext(TrackexContext);
  const addTransaction = (transaction) => {
    //add new transaction to state
    console.log("addTransaction values", transaction);
    // const _transactions = [...transactions];
    // _transactions.push(transaction);
    // setTransactions(_transactions);

    setTransactions([...transactions, { ...transaction }]);
  };

  const handleDelete = (id) => {
    console.log("delete", id);
    setTransaction({ id });
    setOpenDialog(true);
  };
  const deleteTransaction = () => {
    const { id } = transaction;
    console.log("deleteTransaction id", id);
    const _transactions = transactions.filter(
      (transaction) => transaction.id !== id
    );

    // console.log("_transactions", _transactions);
    setTransactions(_transactions);
    setOpenDialog(false);
    setTransaction({});
  };

  const handleEdit = (id) => {
    // Activate Edit mode
    setMode(AVAILABLE_MODES.edit);
    // Search for our transaction
    const transaction = transactions.find(
      (transaction) => transaction.id === id
    );
    setTransaction(transaction);
    // Open the drawer
    setOpen(true);

    // Update state with the updated transaction
  };

  const editTransaction = (data) => {
    const _transactionIndex = transactions.findIndex(
      (transaction) => transaction.id === data.id
    );
    const _transactions = [...transactions];
    _transactions[_transactionIndex] = data;

    setTransactions(_transactions);
    setMode(DEFAULT_MODE);
    setTransaction({});
  };

  const handleClose = () => {
    setTransaction({});
    setOpenDialog(false);
  };
  return (
    <Grid>
      <AddButtonWrapper>
        <Button
          onClick={() => {
            console.log("Abrir formulario");
            setOpen(true);
          }}
          color='primary'
          variant='contained'
        >
          + Add Transaction
        </Button>
      </AddButtonWrapper>
      <Table>
        <thead>
          <tr>
            <HeadCell>Date</HeadCell>
            <HeadCell>Name</HeadCell>
            <HeadCell>Category</HeadCell>
            <HeadCell>Amount</HeadCell>
            <HeadCell></HeadCell>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => {
            /* console.log("transaction", transaction); */
            return (
              <tr key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.name}</TableCell>
                <TableCell>{categories[transaction.category]}</TableCell>
                <TableCell>
                  <Amount type={transaction.type}>{transaction.amount}</Amount>
                </TableCell>

                <TableCell>
                  <EditIcon
                    style={{ marginRight: "16px" }}
                    onClick={() => {
                      console.log("editar transacción");
                      handleEdit(transaction.id);
                    }}
                  />

                  <DeleteForeverIcon
                    style={{ color: "#F94144" }}
                    onClick={() => {
                      console.log("borrar transacción");
                      handleDelete(transaction.id);
                    }}
                  />
                </TableCell>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <TransactionDrawer
        open={open}
        onClose={() => {
          console.log("close");
          setOpen(false);
        }}
        mode={mode}
        data={transaction}
        addTransaction={addTransaction}
        editTransaction={editTransaction}
        setMode={setMode}
      />
      {openDialog && (
        <Dialog open={openDialog} onClose={handleClose}>
          <DialogTitle>
            Are you sure you want to delete this transaction?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              If you delete it you won't be able to recover it.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Cancel
            </Button>
            <Button
              onClick={deleteTransaction}
              color='primary'
              variant='contained'
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Grid>
  );
};

export { TransactionList };
