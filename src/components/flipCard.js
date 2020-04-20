import React from 'react';
import ReactCardFlip from 'react-card-flip';
import FormOne from '../pages/Login';


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
            {this.props.front}
            <button onClick={this.handleClick}>{this.props.buttonFront}</button>
          </div>
   
          <div>
            {this.props.back}
            <button onClick={this.handleClick}>{this.props.buttonBack}</button>
          </div>
        </ReactCardFlip>
      )
    }
  }