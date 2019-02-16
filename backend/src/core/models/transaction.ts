import Id from './Id';

export default class Transaction implements Id {
  id: number;
  amount: number;
  effectiveDate: Date;
  description: string;
  accountID: number;
  ledgerID: number;
}