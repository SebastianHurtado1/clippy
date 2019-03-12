import React, { Component, Fragment } from 'react';
import { clipboard } from 'electron';
import ChevronArrowDown from './chevron-arrow-down';

const copyItemToClipboard = item => {
  clipboard.writeText(item);
};

const ItemContainer = ({ item }) => {
  return item.length > 60 ? (
    <TruncatedItem item={item} />
  ) : (
    <Item item={item} />
  );
};

class TruncatedItem extends Component {
  constructor(props) {
    super(props);

    this.state = { showExpandedItem: false };
  }

  toggleItem() {
    this.setState(prevState => ({
      showExpandedItem: !prevState.showExpandedItem
    }));
  }

  render() {
    const { item } = this.props;
    const truncatedItem = this.state.showExpandedItem
      ? item
      : item.slice(0, 45) + '...';

    return (
      <div className="item__container">
        <Item item={truncatedItem} />
        <ChevronArrowDown showExpandedItem={() => this.toggleItem()} />
      </div>
    );
  }
}

const Item = ({ item }) => {
  return (
    <h1 className="item" onClick={() => copyItemToClipboard(item)}>
      {item}
    </h1>
  );
};

export default ItemContainer;
