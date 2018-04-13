import React from 'react';
import { withRouter } from 'react-router-dom';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';
import Icon from '@fortawesome/react-fontawesome';
import { getStatusConfig } from '../../shared/utils/submission';

@withRouter
export default class ListItem extends React.Component {
  onClick = () => {
    const { id } = this.props.problem;
    this.props.onClick(id);
  };

  render() {
    const { picture, title, description, status } = this.props.problem;
    const { text, color } = getStatusConfig(status);
    return (
      <div className="problem-list-item" onClick={this.onClick}>
        <div className="picture" style={{ backgroundImage: `url("${picture}")` }} />
        <div className="text">
          <h3 className="title">
            {title} {this.props.loading && <Icon icon={faSpinner} spin />}
          </h3>
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
