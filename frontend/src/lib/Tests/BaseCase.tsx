import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

export default class BaseCase {
  public static run(componenent : ReactElement) : void {
    const div = document.createElement('div');
    ReactDOM.render(componenent, div);
    ReactDOM.unmountComponentAtNode(div);
  }
}