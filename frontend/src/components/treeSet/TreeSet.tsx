import React, { Component, ReactNode } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

interface ITreeItem {
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
 * @example
 * [1, 2, 3, 1, 2, 2, 3, 3, 1, 2, 3, 3, 2]
 *
 */
export class TreeSet extends Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
  }

  public treeClass = (depth: number) => `offset-${depth + 1}`;

  public buildTree = (items: ITreeItem[], maxDepth: number): ReactNode => {
    const [current, ...rest] = items;

    const item = <ListGroupItem className={this.treeClass(current.depth)} />;

    if (current.depth === maxDepth) {
      return (
        <>
          {item}
          {this.buildTree(rest, maxDepth)}
        </>
      );
    } else {
      return (
        <>
          {item}
          <ListGroup className={this.treeClass(current.depth)}>
            {this.buildTree(rest, maxDepth)}
          </ListGroup>
        </>
      );
    }
  };

  public render() {
    const depths = this.props.items.map(item => item.depth);
    const maxDepth = Math.max(...depths);

    return (
      <ListGroup flush>{this.buildTree(this.props.items, maxDepth)}</ListGroup>
    );
  }
}
