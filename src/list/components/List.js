import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';

class List extends React.Component {
  render() {
    return (
      <div className="problem-list">
        {this.props.problems.map(problem => (
          <ListItem
            key={problem.id}
            problem={problem}
            loading={problem.id === this.props.loadingId}
            onClick={this.props.onItemClick}
          />
        ))}
      </div>
    );
  }
}

List.propTypes = {
  problems: PropTypes.array,
  loadingId: PropTypes.number,
  onItemClick: PropTypes.func,
};

List.defaultProps = {
  problems: [],
  loadingId: null,
  onItemClick: undefined,
};

export default List;

