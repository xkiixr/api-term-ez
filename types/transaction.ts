export interface TransactionPlayLoad {
  selectPackage: string;
  game?: { pack?: string; name?: string; price?: number };
  amount: number;
  payload: Payload[];
}

export interface Payload {
  ref: string;
  value: string;
}
