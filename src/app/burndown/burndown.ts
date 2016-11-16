export class Burndown {
  startDate: Date;
  endDate: Date;
  startBalance: number;
  targetBalance: number;
  endBalance: number;
  planTx: Transaction[];
  actualTx: Transaction[];
  forecastTx: Transaction[];
}

export class Transaction {
  amount: number;
  date: Date;
  name: string;
  meta: any;
  pending: boolean;
  type: any;
  category: string[];
}
