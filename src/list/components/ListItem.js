import React from 'react';
import { getStatusConfig } from '../../shared/utils/submission';

export default class ListItem extends React.Component {
  render() {
    const { picture, title, description, status } = this.props.problem;
    const { text, color } = getStatusConfig(status);
    return (
      <div className="problem-list-item">
        <div className="picture" style={{ backgroundImage: `url("${picture}")` }} />
        <div className="text">
          <h3 className="title">{title}</h3>
          <div className="description">
            {description}
          </div>
        </div>
        <div className={`status text-${color}`}>
          <span>{text}</span>
        </div>
      </div>
    );
  }
}
