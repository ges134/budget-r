import React from 'react';
import { NeedsAuthentication } from '../../components/needsAuthenticaton/NeedsAuthentication';

export const Budgets = () => (
  <NeedsAuthentication>
    <div>
      Welcome to budget-R! the app is still being built and so is this page.
    </div>
    <p>You're now on the soon to be budgets page.</p>
    <p>You shouldn't be on this page if you didn't login oupsies</p>
  </NeedsAuthentication>
);
