import React from 'react';
import { NeedsAuthentication } from '../../components/needsAuthenticaton/NeedsAuthentication';
import { InProgress } from '../../components/InProgress';

export const Budgets = () => (
  <NeedsAuthentication>
    <InProgress />
  </NeedsAuthentication>
);
