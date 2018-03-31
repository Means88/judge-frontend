import React from 'react';

export default class ListItem extends React.Component {
  render() {
    return (
      <div className="problem-list-item">
        <div className="picture"></div>
        <div className="text">
          <h3 className="title">A+B Problem</h3>
          <div className="description">
            Write a function that add two numbers A and B.
          </div>
        </div>
        <div className="status">
          <span>Accepted</span>
        </div>
      </div>
    );
  }
}
