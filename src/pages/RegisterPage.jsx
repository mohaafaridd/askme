import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { RegistrationMessages } from '../messages/registerMessages';

const regexValues = {
  names: new RegExp(/^[a-zA-Z]+$/),
  username: new RegExp(/^\w([-.]?\w)+\w$/)
};

const SignupSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, RegistrationMessages.minLength(2))
    .max(15, RegistrationMessages.maxLength(15))
    .matches(regexValues.names, RegistrationMessages.caseMatch('firstname'))
    .required('First name is required'),

  lastname: Yup.string()
    .min(2, RegistrationMessages.minLength(2))
    .max(15, RegistrationMessages.maxLength(15))
    .matches(regexValues.names, RegistrationMessages.caseMatch('lastname'))
    .required('Last name is required'),

  username: Yup.string()
    .min(2, RegistrationMessages.minLength(2))
    .max(15, RegistrationMessages.maxLength(15))
    .matches(regexValues.username, RegistrationMessages.caseMatch('username'))
    .required('Username is required'),

  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),

  password: Yup.string()
    .min(2, RegistrationMessages.minLength(6))
    .max(15, RegistrationMessages.maxLength(100))
    .required('Password is required')
});

export default class RegisterPage extends Component {
  initialValues = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: ''
  };

  onSubmit(values, { setSubmitting }) {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/users/register`, {
        user: { ...values }
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  }

  render() {
    return (
      <div>
        <h1>Signup</h1>
        <Formik
          initialValues={this.initialValues}
          validationSchema={SignupSchema}
          onSubmit={this.onSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Field name="firstname" placeholder="first name" />
              {errors.firstname && touched.firstname ? (
                <div>{errors.firstname}</div>
              ) : null}
              <Field name="lastname" placeholder="last name" />
              {errors.lastname && touched.lastname ? (
                <div>{errors.lastname}</div>
              ) : null}
              <Field name="username" placeholder="username" />
              {errors.username && touched.username ? (
                <div>{errors.username}</div>
              ) : null}
              <Field name="email" type="email" placeholder="email" />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}

              <Field name="password" type="password" placeholder="password" />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}

              {/* <p>Form status {SignupSchema.isValid().then(valid => valid)}</p> */}

              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}
