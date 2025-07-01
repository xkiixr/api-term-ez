export interface TransactionPlayLoad {
  selectPackage: string;
  game?: { pack?: string; name?: string; price?: number };
  amount: number;
  payload: Payload[];
}

interface Payload {
  ref: string;
  value: string;
}
