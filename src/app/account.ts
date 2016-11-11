export enum BurndownType {
  Year,
  Month,
  Paycheck
}
export class Account {
  id: string;
  item: string;
  user: string;
  type: string;
  subtype: string;
  institution_type: string;
  burndown: BurndownType;
}
