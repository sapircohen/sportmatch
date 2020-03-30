import React from 'react';
import ReactCardFlip from 'react-card-flip';
import FormOne from './FormOne';


export default class FlipC extends React.Component {
    constructor() {
      super();
        this.state = {
        isFlipped: false
      };
      this.handleClick = this.handleClick.bind(this);
    }
   
    handleClick(e) {
      e.preventDefault();
      this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    }
   
    render() {
      return (
        <ReactCardFlip containerStyle={{direction:'rtl',textAlign:'right'}} isFlipped={this.state.isFlipped} flipDirection="vertical">
          <div>
            This is the front of the card.
            <button onClick={this.handleClick}>הכשרה</button>
          </div>
   
          <div>
            <FormOne/>
            <button onClick={this.handleClick}>Click to flip</button>
          </div>
        </ReactCardFlip>
      )
    }
  }