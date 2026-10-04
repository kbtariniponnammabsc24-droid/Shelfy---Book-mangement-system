import React from "react";

// CLASS COMPONENT: this component is written as a class (extends React.Component)
// to demonstrate the class-component requirement of the assignment.
// It receives the text to show through this.props.
class LoadingMessage extends React.Component {
  render() {
    return <p className="message">{this.props.text || "Loading books..."}</p>;
  }
}

export default LoadingMessage;
