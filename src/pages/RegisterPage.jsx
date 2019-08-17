import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
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

class RegisterPage extends Component {
  state = {
    redirect: false
  };

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  initialValues = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: ''
  };

  async onSubmit(values, { setSubmitting }) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/users/register`,
        { user: { ...values } }
      );

      const { token, user } = response.data;
      const { cookies } = this.props;

      cookies.set('token', token, {
        path: '/',
        maxAge: process.env.REACT_APP_EXP_DATE
      });
      cookies.set('user', user, {
        path: '/',
        maxAge: process.env.REACT_APP_EXP_DATE
      });
      this.setRedirect();
      console.log('Account Registered!');
    } catch (error) {
      console.error('Registration Failed!');
      console.log(error.response.data || error);
    }
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
  };

  render() {
    return (
      <div>
        {this.renderRedirect()}

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

              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    state: state,
    cookies: ownProps.cookies
  };
};

export default connect(mapStateToProps)(RegisterPage);
