import React, { Component } from 'react';
import { Ledger, verbs, LedgerHelper } from '../../lib';
import { FormikFormWrapper } from '../../components/Forms';
import { CardWrapper } from '../../components/CardWrapper';
import { FormikInput } from '../../components/Input';
import { Ledger as Readonly } from '../../lib/models/presentations/readonly';

interface IProps {
  budgetID: number;
  ledgers?: Readonly[];
  onSuccess: (res: any) => void;
  initialLedger?: Ledger;
}

export class Ledgers extends Component<IProps> {
  public renderParentLedgerInput = () => {
    const ledgerHelperText =
      'You can specify a parent ledger in order to have a better understanding of your budgetting project and organize things better!';

    if (this.props.ledgers && this.props.ledgers.length) {
      const displays = LedgerHelper.parentLedgerOptions(this.props.ledgers);
      return (
        <FormikInput
          name="parentLedgerID"
          label="Is this ledger tied to another one?"
          helper={ledgerHelperText}
          type="select"
        >
          <option key={0} value={undefined}>
            No parent ledgers
          </option>
          {this.props.ledgers.map((ledger, index) => {
            return (
              <option key={ledger.id} value={ledger.id}>
                {displays[index]}
              </option>
            );
          })}
        </FormikInput>
      );
    } else {
      return (
        <p>Once you have ledgers, you'll be able to set a parent ledger.</p>
      );
    }
  };

  public render() {
    const ledger =
      this.props.initialLedger || new Ledger('', this.props.budgetID);

    return (
      <FormikFormWrapper
        initialValues={ledger}
        validationSchema={ledger.validationSchema}
        submitText="Create"
        submitUrl="/ledgers"
        verb={verbs.put}
        formIsReturnigId
        onSuccess={this.props.onSuccess}
      >
        <CardWrapper header="Let's add some ledgers">
          <p>
            Add some ledgers by completing the information below. It would then
            be shown on the right!
          </p>
          <FormikInput
            name="name"
            label="What should it be named"
            type="text"
          />
          {this.renderParentLedgerInput()}
          <FormikInput name="budgetID" label="" type="hidden" />
        </CardWrapper>
      </FormikFormWrapper>
    );
  }
}
