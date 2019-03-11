import React, { Component, Fragment } from 'react';
import { clipboard } from 'electron';

class Clippy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      searchItems: [],
      inputVal: ''
    };
  }

  componentDidMount() {
    this.checkNewCopiedItems = setInterval(() => this.updateClipboard(), 500);
  }

  componentWillUnmount() {
    clearInterval(this.checkNewCopiedItems);
  }

  updateClipboard() {
    const { items } = this.state;
    const currentItem = clipboard.readText();

    // Only copy a new item onto clipboard if it is new
    if (currentItem !== items[0]) {
      this.setState(prevState => {
        const newItems = prevState.items.filter(item => item !== currentItem);
        return { items: [currentItem, ...newItems] };
      });
    }
  }

  updateInputVal(event) {
    this.setState({ inputVal: event.target.value }, () =>
      this.filterSearchItems()
    );
  }

  filterSearchItems() {
    const searchValue = this.state.inputVal;
    const filteredItems = this.state.items.filter(item =>
      item.toLowerCase().includes(searchValue.toLowerCase())
    );

    this.setState({ searchItems: filteredItems });
  }

  copyItemToClipboard(item) {
    clipboard.writeText(item);
  }

  /**
   * Creates elements from the clipboard. This will also truncate and place an ellipis on an element if:
   * * element's length > 40
   * @param {Array} items | the items that are copied onto the clipboard or the items that match the search
   */
  createItems(items) {
    return items.map((item, i) => (
      <h1
        key={i + item}
        className="item"
        onClick={() => this.copyItemToClipboard(item)}
      >
        {item.length > 20 ? item.slice(0, 45) + '...' : item}
      </h1>
    ));
  }

  render() {
    const items = this.state.inputVal
      ? this.createItems(this.state.searchItems)
      : this.createItems(this.state.items);
    return (
      <Fragment>
        <input
          type="search"
          onChange={e => this.updateInputVal(e)}
          value={this.state.inputVal}
          className="search"
          placeholder="Search for items..."
        />
        {items}
      </Fragment>
    );
  }
}

export default Clippy;
