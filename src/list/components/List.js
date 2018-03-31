import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';

class List extends React.Component {
  render() {
    return (
      <div className="problem-list">
        <ListItem />
      </div>
    );
  }
}

List.propTypes = {

};

List.defaultProps = {

};

export default List;

