import React, { useState } from "react";
import styled from "styled-components";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";

import Drawer from "@material-ui/core/Drawer";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import { Debug } from "../../etc/Debug";

const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RadioOptionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Container = styled.div`
  padding: 16px;
  width: 380px;
  height: 100vh;
  background-color: #252f3d;
  overflow: scroll;
  color: white;
`;

const TransactionDrawer = ({
  open,
  onClose,
  mode,
  data,
  addTransaction,
  editTransaction,
  setMode,
}) => {
  // const {open} = props
  const transactionSchema = Yup.object().shape({
    name: Yup.string().min(3).required("Required"),
    date: Yup.string().min(10).required("Fecha Required"),
    amount: Yup.number().required("Required"),
  });

  const AVAILABLE_MODES = {
    add: "add",
    edit: "edit",
  };
  const DEFAULT_MODE = "add";

  const emptyInitialValues = {
    name: "",
    amount: 0,
    date: "",
    category: "",
    type: "",
  };

  const categories = [
    { value: "eating_out", label: "Eating out" },
    { value: "clothes", label: "Clothes" },
    { value: "electronics", label: "Electronics" },
    { value: "groceries", label: "Groceries" },
    { value: "other", label: "Other" },
  ];

  const types = [
    { value: "expense", label: "Expense" },
    { value: "income", label: "Income" },
  ];
  return (
    <Drawer elevation={2} anchor='right' open={open} onClose={onClose}>
      <Container>
        <h2>{mode === AVAILABLE_MODES.add ? "New" : "Edit"} transaction</h2>
        <Formik
          initialValues={
            mode === AVAILABLE_MODES.add ? emptyInitialValues : data
          }
          validationSchema={transactionSchema}
          onSubmit={(values, { setSubmitting }) => {
            mode === AVAILABLE_MODES.add
              ? addTransaction({
                  id: uuidv4(),
                  ...values,
                })
              : editTransaction(values);
            onClose();
          }}
        >
          {({ isSubmitting, values, handleChange, errors, touched }) => (
            <>
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
                    type='number'
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
                  <RadioOptionsWrapper>
                    <FormControl component='fieldset'>
                      <FormLabel component='legend'>Category</FormLabel>
                      <RadioGroup
                        aria-label='category'
                        name='category'
                        value={values.category}
                        onChange={handleChange}
                      >
                        {categories.map((category) => {
                          return (
                            <FormControlLabel
                              control={<Radio color='primary' />}
                              value={category.value}
                              label={category.label}
                            />
                          );
                        })}
                      </RadioGroup>
                    </FormControl>
                    <FormControl component='fieldset'>
                      <FormLabel component='legend'>Type</FormLabel>
                      <RadioGroup
                        aria-label='type'
                        name='type'
                        value={values.type}
                        onChange={handleChange}
                      >
                        {types.map((type) => {
                          return (
                            <FormControlLabel
                              control={<Radio color='primary' />}
                              value={type.value}
                              label={type.label}
                            />
                          );
                        })}
                      </RadioGroup>
                    </FormControl>
                  </RadioOptionsWrapper>
                  <ActionsWrapper>
                    <Button
                      onClick={() => {
                        onClose();
                        if (mode === AVAILABLE_MODES.edit) {
                          onClose();
                          setMode(DEFAULT_MODE);
                        }
                      }}
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
              <Debug />
            </>
          )}
        </Formik>
      </Container>
    </Drawer>
  );
};
export default TransactionDrawer;
