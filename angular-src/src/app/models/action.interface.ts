export interface Action {
  label: string;
  authorized: boolean;
  data: any;
  options: {
    primary: SubAction;
    secondary: SubAction;
  };
}

interface SubAction {
  access: boolean;
  icon: string;
  functionality: string;
}