import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';

class List extends React.Component {
  render() {
    return (
      <div className="submission-list table-responsive-sm">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Problem</th>
              <th scope="col">Status</th>
              <th scope="col">Time cost</th>
              <th scope="col">Memory cost</th>
            </tr>
          </thead>
          <tbody>
            {this.props.submissions.map(s => (
              <ListItem key={s.id} submission={s} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

List.propTypes = {
  submissions: PropTypes.array,
};

List.defaultProps = {
  submissions: [],
};

export default List;

