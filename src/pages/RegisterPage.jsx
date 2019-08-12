import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { RegistrationMessages } from '../messages/registerMessages';

const regexValues = {
  names: new RegExp(/^[a-zA-Z]+$/),
  username: new RegExp(/^\w([-.]?\w)+\w$/)
};

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, RegistrationMessages.minLength(2))
    .max(15, RegistrationMessages.maxLength(15))
    .matches(regexValues.names, RegistrationMessages.caseMatch('firstname'))
    .required('First name is required'),

  lastName: Yup.string()
    .min(2, RegistrationMessages.minLength(2))
    .max(15, RegistrationMessages.maxLength(15))
    .matches(regexValues.names, RegistrationMessages.caseMatch('lastName'))
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
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: ''
  };

  onSubmit(values, { setSubmitting }) {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
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
              <Field name="firstName" placeholder="first name" />
              {errors.firstName && touched.firstName ? (
                <div>{errors.firstName}</div>
              ) : null}
              <Field name="lastName" placeholder="last name" />
              {errors.lastName && touched.lastName ? (
                <div>{errors.lastName}</div>
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

              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
      // <div>
      //   <h1>Register Page</h1>
      //   <Formik
      //     initialValues={this.initialValues}
      //     validate={values => {
      //       let errors = {};

      //       if (!values.firstname) return errors;
      //     }}
      //     onSubmit={this.onSubmit}
      //   >
      //     {({
      //       values,
      //       errors,
      //       touched,
      //       handleChange,
      //       handleBlur,
      //       handleSubmit,
      //       isSubmitting
      //     }) => (
      //       <form onSubmit={handleSubmit}>
      //         <input
      //           type="text"
      //           autoFocus
      //           name="firstname"
      //           placeholder="first name"
      //           onChange={handleChange}
      //           onBlur={handleBlur}
      //           value={values.firstname}
      //         />
      //         {errors.firstname && touched.firstname && errors.firstname}

      //         <input
      //           type="text"
      //           autoFocus
      //           name="lastname"
      //           placeholder="last name"
      //           onChange={handleChange}
      //           onBlur={handleBlur}
      //           value={values.lastname}
      //         />
      //         {errors.lastname && touched.lastname && errors.lastname}

      //         <input
      //           type="text"
      //           autoFocus
      //           name="username"
      //           placeholder="username"
      //           onChange={handleChange}
      //           onBlur={handleBlur}
      //           value={values.username}
      //         />
      //         {errors.username && touched.username && errors.username}

      //         <input
      //           type="email"
      //           autoFocus
      //           name="email"
      //           placeholder="email"
      //           onChange={handleChange}
      //           onBlur={handleBlur}
      //           value={values.email}
      //         />
      //         {errors.email && touched.email && errors.email}

      //         <input
      //           type="password"
      //           autoFocus
      //           name="password"
      //           placeholder="password"
      //           onChange={handleChange}
      //           onBlur={handleBlur}
      //           value={values.password}
      //         />
      //         {errors.password && touched.password && errors.password}

      //         <p>Form status: {isSubmitting.toString()}</p>

      //         <button type="submit" disabled={isSubmitting}>
      //           Submit
      //         </button>
      //       </form>
      //     )}
      //   </Formik>
      // </div>
    );
  }
}
