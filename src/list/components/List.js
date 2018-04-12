import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';

class List extends React.Component {
  render() {
    return (
      <div className="problem-list">
        {this.props.problems.map(problem => (
          <ListItem key={problem.id} problem={problem} />
        ))}
      </div>
    );
  }
}

List.propTypes = {
  problems: PropTypes.array,
};

List.defaultProps = {
  problems: [],
};

export default List;

