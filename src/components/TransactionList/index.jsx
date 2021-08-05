import React, { useState } from "react";
import styled from "styled-components";

import { Formik, Form } from "formik";

import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import TextField from "@material-ui/core/TextField";

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

const Container = styled.div`
  padding: 16px;
  width: 380px;
  height: 100vh;
  background-color: #252f3d;
  color: white;
`;

const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TransactionList = () => {
  const [open, setOpen] = useState(false);

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

                <TableCell>
                  <EditIcon
                    style={{ marginRight: "16px" }}
                    onClick={() => {
                      console.log("editar transacción");
                    }}
                  />

                  <DeleteForeverIcon
                    style={{ color: "#F94144" }}
                    onClick={() => {
                      console.log("borrar transacción");
                    }}
                  />
                </TableCell>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Drawer
        elevation={2}
        anchor='right'
        open={open}
        onClose={() => {
          console.log("close");
          setOpen(false);
        }}
      >
        <Container>
          <h2>New transaction</h2>
          <Formik
            initialValues={{
              name: "",
              amount: 0,
              date: "",
              category: "eating_out",
              type: "expense",
            }}
            onSubmit={(values, { setSubmitting }) => {
              console.log("values", values);
              setOpen(false);
            }}
          >
            {({ isSubmitting, values, handleChange, errors, touched }) => (
              <Form>
                <FieldsWrapper>
                  <TextField
                    fullWidth
                    id='name'
                    name='name'
                    label='Name'
                    value={values.name}
                    onChange={handleChange}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <TextField
                    fullWidth
                    id='amount'
                    name='amount'
                    label='Amount'
                    value={values.amount}
                    onChange={handleChange}
                    error={touched.amount && Boolean(errors.amount)}
                    helperText={touched.amount && errors.amount}
                  />
                  <TextField
                    fullWidth
                    id='date'
                    name='date'
                    label='Date'
                    value={values.date}
                    onChange={handleChange}
                    error={touched.date && Boolean(errors.date)}
                    helperText={touched.date && errors.date}
                  />
                  <ActionsWrapper>
                    <Button
                      onClick={() => setOpen(false)}
                      variant='outlined'
                      color='primary'
                    >
                      Cancel
                    </Button>
                    <Button
                      variant='contained'
                      color='primary'
                      type='submit'
                      disabled={isSubmitting}
                    >
                      Save
                    </Button>
                  </ActionsWrapper>
                </FieldsWrapper>
              </Form>
            )}
          </Formik>
        </Container>
      </Drawer>
    </Grid>
  );
};

export { TransactionList };
