import { Example } from "./Example"
import React from 'react';

// Example();
const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props: {}) {
    super(props);
    this.state = { liked: false };
  }

  state: {liked: boolean};

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
  
}

const domContainer = document.querySelector('#like_button_container');
//@ts-ignore
const root = ReactDOM.createRoot(domContainer);
root.render(e(LikeButton));