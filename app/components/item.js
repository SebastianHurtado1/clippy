import React, { Component, Fragment } from 'react';
import { clipboard } from 'electron';
import ChevronArrowDown from './chevron-arrow-down';

const copyItemToClipboard = item => {
  clipboard.writeText(item);
};

const ItemContainer = ({ item }) => {
  return item.length > 60 ? (
    <TruncatedItem
      item={item}
      copyItemToClipboard={() => copyItemToClipboard(item)}
    />
  ) : (
    <Item item={item} copyItemToClipboard={() => copyItemToClipboard(item)} />
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
    const { item, copyItemToClipboard } = this.props;
    const truncatedItem = this.state.showExpandedItem
      ? item
      : item.slice(0, 45) + '...';

    return (
      <div className="item__container">
        <Item item={truncatedItem} copyItemToClipboard={copyItemToClipboard} />
        <div className="item__chevron-container">
          <ChevronArrowDown showExpandedItem={() => this.toggleItem()} />
        </div>
      </div>
    );
  }
}

const Item = ({ item, copyItemToClipboard }) => {
  return (
    <h1 className="item" onClick={copyItemToClipboard}>
      {item}
    </h1>
  );
};

export default ItemContainer;
