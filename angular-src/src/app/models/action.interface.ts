import { Question } from './models';

export interface Action {
  label: string;
  authorized: boolean;
  state: boolean;
  message: string;
  data: Array<Question>;
  options: {
    primary: SubAction;
    seconadry: SubAction;
  };
}

interface SubAction {
  access: boolean;
  icon: string;
  functionality: string;
}