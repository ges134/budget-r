import React from 'react';
import { NeedsAuthentication } from './NeedsAuthentication';
import { shallow } from 'enzyme';
import { cookieName } from '../../lib/constants';
import Cookies from 'js-cookie';

const getComponent = () => (
  <NeedsAuthentication>
    <div>page</div>
  </NeedsAuthentication>
);

describe('Needs authentication', () => {
  it('should display a redirect if the token is non-existant', () => {
    // Act
    const rendered = shallow(getComponent());

    // Assert
    expect(rendered.find('Redirect').length).toBe(1);
  });

  it('should display the page if the token is existing', () => {
    // Arrange
    Cookies.set(cookieName, 'token');

    // Act
    const rendered = shallow(getComponent());

    expect(rendered.find('div').length).toBe(1);
  });
});
