import { BlockScrollStrategy } from '@angular/cdk/overlay';

export interface User {
  id: number;
  firstName: string;
  middleName: string;
  username: string;
  createdAt: string;
}

export interface Question {
  id: number;
  question: string;
  asker: number;
  createdAt: string;
}

export interface Reply {
  id: number;
  reply: string;
  question: number;
  replier: number;
  createdAt: string;
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
  cause: string;
}
