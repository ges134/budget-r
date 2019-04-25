import React from 'react';
import { NeedsAuthentication } from '../../../components/needsAuthenticaton';
import { InProgress } from '../../../components/InProgress';
import { ProgressBar } from '../../../components';

export const Step1 = () => (
  <>
    <NeedsAuthentication>
      <div className="mt-2" />
      <InProgress />
      <ProgressBar value={0} stepText="Budget information" />
    </NeedsAuthentication>
  </>
);
