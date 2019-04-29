import React, { Component, ReactNode } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

import './TreeSet.scss';

export interface ITreeItem {
  key: number;
  display: string;
  depth: number;
}

interface IProps {
  items: ITreeItem[];
}

/**
 * Renders a tree view given an ordered list of items. The tree set can have multiple roots.
 * The items are ordered according to their depth. Here's the logic :
 *  - When going to the next item, if the depth is equals, that means it's a sibling.
 *  - When going to the next item, if the depth if higher, that means it's a children.
 *  - Children are there until we stumble upon an item that has a lower depth.
 * Let's see this with an example. We have a table of depths.
 * The key is the index and the display is the depth.
 * So on its simplest form, we have the following [1, 1, 2, 3, 1, 2, 2, 3, 3, 1, 2, 3, 3, 2]
 * The first item would be an empty root, since the following item is the same depth.
 * The second item would have children [2, 3], [2] has only one children, [3]. Then, we stop for both
 * since we stumble another one.
 * Ultimately, it would render something like this.
 * 1
 * 1 -> 2 -> 3
 * 1 -> 2
 *   -> 2 -> 3
 *        -> 3
 * 1 -> 2 -> 3
 *        -> 3
 *   -> 2
 */
export const TreeSet = (props: IProps) => (
  <ListGroup flush>
    {props.items.map(item => (
      <ListGroupItem className={`space-${item.depth}`} key={item.key}>
        {item.display}
      </ListGroupItem>
    ))}
  </ListGroup>
);
