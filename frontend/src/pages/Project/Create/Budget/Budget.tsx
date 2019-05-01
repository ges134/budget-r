import React from 'react';
import { NeedsAuthentication } from '../../../../components/needsAuthenticaton';
import { InProgress } from '../../../../components/InProgress';
import { ProgressBar } from '../../../../components';
import { Budget as Form } from '../../../../forms';

export const Budget = () => (
  <>
    <NeedsAuthentication>
      <div className="mt-2" />
      <InProgress />
      <ProgressBar value={0} stepText="Budget information" />
      <Form />
    </NeedsAuthentication>
  </>
);
