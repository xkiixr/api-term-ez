export interface TransactionPlayLoad {
  selectPackage: string;
  amount: number;
  payload: Payload[];
}

interface Payload {
  ref: string;
  value: string;
}
