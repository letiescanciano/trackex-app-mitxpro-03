import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";

import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import FormControl from "@material-ui/core/FormControl";

import TransactionDrawer from "../Drawer";
import { Filters } from "../Filters";
import { TrackexContext } from "../../contexts/trackexContext";

import { transactionsAPI } from "../../services/transactions";

const Table = styled.table`
  width: 80%;
  padding: 16px 0;
  text-align: left;
`;

const Main = styled.div`
  width: 100%;
  display: flex;
  padding-top: 32px;
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
const ActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TransactionList = () => {
  const AVAILABLE_MODES = {
    add: "add",
    edit: "edit",
  };

  const DEFAULT_MODE = "add";

  const [open, setOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [transaction, setTransaction] = useState({});
  const [mode, setMode] = useState(DEFAULT_MODE);
  const [openDialog, setOpenDialog] = useState(false);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const [search, setSearch] = useState("");

  const { categories } = useContext(TrackexContext);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const { data, status } = await transactionsAPI.all()

        if (status === 200) {
          setTransactions(data)
        }
      } catch (e) {
        console.log(e)
      }
    }
    getTransactions()
  }, [])

  const addTransaction = async transaction => {
    //add new transaction to state
    console.log('addTransaction values', transaction)

    try {
      const { data, status } = await transactionsAPI.create(transaction)
      console.log(data)
      if (status === 201) {
        setTransactions([...transactions, { ...data }])
      }
    } catch (err) {
      console.log(err)
    }
  }

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

  const filterByName = () => {
    console.log("filterByName search", search);

    const _filteredTransactions = transactions.filter((transaction) => {
      return transaction.name.toLowerCase().includes(search.toLowerCase());
    });
    console.log("Filtered transactions", _filteredTransactions);
    setFilteredTransactions(_filteredTransactions);
  };

  const filterByCategory = (categoriesFilter) => {
    console.log("filterByCategory");
    const checked = Object.keys(categoriesFilter).filter(
      (category) => categoriesFilter[category].checked
    );

    // if no checkbox selected --> transactions = original array
    if (checked.length === 0) {
      setFilteredTransactions(transactions);
    } else {
      // if some checkbox is selected --> filterTransactions
      const _filteredTransactions = transactions.filter((transaction) => {
        return categoriesFilter[transaction.category].checked;
      });
      setFilteredTransactions(_filteredTransactions);
    }
  };

  const filterByType = (typesFilter) => {
    const checked = Object.keys(typesFilter).filter(
      (type) => typesFilter[type].checked
    );

    if (checked.length === 0) {
      setFilteredTransactions(transactions);
    } else {
      const _filteredTransactions = transactions.filter((transaction) => {
        return typesFilter[transaction.type].checked;
      });
      setFilteredTransactions(_filteredTransactions);
    }
  };

  useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);

  useEffect(() => {
    filterByName();
  }, [search]);

  return (
    <Grid>
      <ActionsWrapper>
        <FormControl style={{ width: "65%" }}>
          <Input
            placeholder='Search'
            id='search'
            startAdornment={
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            }
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </FormControl>
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
      </ActionsWrapper>
      <Main>
        <Filters
          filterByCategory={filterByCategory}
          filterByType={filterByType}
        />
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
            {filteredTransactions.map((transaction) => {
              /* console.log("transaction", transaction); */
              return (
                <tr key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.name}</TableCell>
                  <TableCell>{categories[transaction.category]}</TableCell>
                  <TableCell>
                    <Amount type={transaction.type}>
                      {transaction.amount}
                    </Amount>
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
      </Main>
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
