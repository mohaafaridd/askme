import { Observable } from 'rxjs';

export interface Action {
  label: string;
  authorized: boolean;
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