import React, { useContext } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { Formik, Form } from 'formik'
import * as Yup from 'yup'
// import { Debug } from '../../../aux/Debug'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import firebase from '../../../contexts/AuthContext/firebaseConfig'
import { AuthContext } from '../../../contexts/AuthContext'
import { authAPI } from '../../../services/auth'

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: 64px;
  background-color: #252f3d;
  height: 100vh;
`

const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
`

const Signup = () => {
  const userSchema = Yup.object().shape({
    email: Yup.string().required('Required field'),
    password: Yup.string().required('Required field'),
  })

  const navigate = useNavigate()
  const { setAuth } = useContext(AuthContext)
  const handleSubmit = async values => {
    console.log('values', values)
    try {
      const { status, data } = await authAPI.signup(values)
      console.log('data', data)
      if (status === 200) {
        setAuth(data)
        navigate('/transactions')
      } else {
        console.log(data)
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <Container>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={userSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid, values, handleChange, touched, errors }) => {
          return (
            <>
              <Form>
                <FieldsWrapper>
                  <TextField
                    fullWidth
                    id='email'
                    name='email'
                    label='Email'
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    fullWidth
                    type='password'
                    id='password'
                    name='password'
                    label='Password'
                    value={values.password}
                    onChange={handleChange}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </FieldsWrapper>
                <Button
                  fullWidth
                  variant='contained'
                  color='primary'
                  type='submit'
                  disabled={!isValid || isSubmitting}
                >
                  Create account
                </Button>
              </Form>
              {/* <Debug /> */}
            </>
          )
        }}
      </Formik>
    </Container>
  )
}

export { Signup }
