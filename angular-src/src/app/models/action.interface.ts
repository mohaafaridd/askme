export interface Action {
  label: string;
  authorized: boolean;
  data: any;
}

export interface Options {
  primary: SubAction;
  secondary: SubAction;
}

interface SubAction {
  access: boolean;
  icon: string;
  functionality: string;
}
