export interface User {
  _id;
  id: number;
  firstName: string;
  middleName: string;
  username: string;
  createdAt: string;
}

export interface Question {
  id?: number;
  content: string;
  questioner: number;
  asked: string;
  createdAt?: string;
}

export interface Reply {
  id?: number;
  content: string;
  question: number;
  by?: {
    _id?: string,
    firstName?: string,
    middleName?: string,
    username?: string,
  };
  createdAt?: string;
}

export interface CustomResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
  question?: Question;
  questions?: Array<Question>;
  reply?: Reply;
  replies?: Array<Reply>;
}

export interface CustomError {
  success: boolean;
  message: string;
  cause?: string;
}

export interface Cookies {
  token?: string;
  user?: string;
}
