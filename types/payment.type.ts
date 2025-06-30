export interface GenerateQrPlayloadInterface {
  selectPackage: string;
  phoneNumber: string;
  callbackData: any;
  callbackUrl: string;
}

export interface OdersInterface {
  id?: string;
  total?: number;
  status?: string;
  code?: string;
  createdAt?: Date;
  orders?: Order[];
}

export interface Order {
  product?: string;
  package?: string;
  payload?: string[];
}
