import { LOGIN, LOGOUT } from './types';
import axios from 'axios';
import * as _ from 'lodash';

export const login = (userInfo, cookies) => async dispach => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/users/login`,
      {
        user: userInfo
      }
    );
    const { token, user } = response.data;
    const pickedProperties = ['_id', 'firstname', 'lastname', 'username', 'id'];
    const pickedUser = _.pick(user, pickedProperties);
    const stringifiedUser = JSON.stringify(pickedUser);

    // const { cookies } = this.props;
    // //setting a cookie
    cookies.set('token', token, {
      path: '/',
      maxAge: process.env.REACT_APP_EXP_DATE
    });
    cookies.set('user', stringifiedUser, {
      path: '/',
      maxAge: process.env.REACT_APP_EXP_DATE
    });

    dispach({
      type: LOGIN,
      payload: true
    });
  } catch (error) {
    console.log(error);
    dispach({
      type: LOGIN,
      payload: false
    });
  }
};

export const logout = cookies => async dispach => {
  try {
    const token = cookies.get('token');
    const user = cookies.get('user');
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/users/logout`,
      {
        token,
        user
      }
    );

    cookies.remove('token');
    cookies.remove('user');
    dispach({
      type: LOGOUT,
      payload: false
    });
  } catch (error) {
    console.log(error);
    dispach({
      type: LOGOUT,
      payload: false
    });
  }
};
