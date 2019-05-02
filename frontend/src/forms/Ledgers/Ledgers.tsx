import React from 'react';
import { Ledger, verbs, LedgerHelper } from '../../lib';
import { FormikFormWrapper } from '../../components/Forms';
import { CardWrapper } from '../../components/CardWrapper';
import { FormikInput } from '../../components/Input';
import { Ledger as Readonly } from '../../lib/models/presentations/readonly';

interface IProps {
  budgetID: number;
  ledgers: Readonly[];
}

export const Ledgers = (props: IProps) => {
  const ledger = new Ledger('', props.budgetID, 0);
  const ledgerHelperText =
    'You can specify a parent ledger in order to have a better understanding of your budgetting project and organize things better!';
  const displays = LedgerHelper.parentLedgerOptions(props.ledgers);

  return (
    <FormikFormWrapper
      initialValues={ledger}
      validationSchema={ledger.validationSchema}
      submitText="Create"
      submitUrl="/ledgers"
      verb={verbs.put}
      formIsReturnigId
    >
      <CardWrapper header="Let's add some ledgers">
        <p>
          Add some ledgers by completing the information below. It would then be
          shown on the right!
        </p>
        <FormikInput name="name" label="What should it be named" type="text" />
        <FormikInput
          name="parentLedgerID"
          label="Is this ledger tied to another one?"
          helper={ledgerHelperText}
          type="select"
        >
          {displays.map((display, index) => {
            const id = props.ledgers[index].parentLedgerID;
            return (
              <option key={id} value={id}>
                {display}
              </option>
            );
          })}
        </FormikInput>
        <FormikInput name="budgetID" label="" type="hidden" />
      </CardWrapper>
    </FormikFormWrapper>
  );
};
