import Id from './Id'

export default class Ledger implements Id {
  id: number;
  name: string;
  parentLedgerID: number;
  budgetID: number;
}