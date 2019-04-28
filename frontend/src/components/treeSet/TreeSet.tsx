import React, { Component } from 'react';
import { ListGroup } from 'reactstrap';
import { ITreeSetItemBase } from '../../lib';

interface ICollapsibleTreeSetItem extends ITreeSetItemBase {
  isCollapsed: boolean;
}

interface IProps {
  items: ITreeSetItemBase[];
}

interface IState {
  items: ICollapsibleTreeSetItem[];
}

export class TreeSet extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    const itemsForState = props.items.map(item => ({
      ...item,
      isCollapsed: false
    }));

    this.state = {
      items: itemsForState
    };
  }

  public render() {
    return <ListGroup flush />;
  }
}
