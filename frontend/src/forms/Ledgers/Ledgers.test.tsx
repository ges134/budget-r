import React from 'react';
import { Ledgers } from './Ledgers';
import BaseCase from '../../lib/Tests/BaseCase';

const getComponent = (withLedgers?: boolean) => {
  if (withLedgers) {
    return (
      <Ledgers
        budgetID={1}
        ledgers={[
          {
            id: 0,
            name: 'ledger',
            budgetID: 1,
            depth: 1
          }
        ]}
      />
    );
  }

  return <Ledgers budgetID={1} />;
};

describe('Budget form', () => {
  it('should pass basic test cases when no ledgers are specified', () => {
    BaseCase.run(getComponent());
  });

  it('should pass basic test cases when ledgers are given', () => {
    BaseCase.run(getComponent(true));
  });
});
