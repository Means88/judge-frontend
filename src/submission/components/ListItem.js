import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { getStatusConfig } from "../../shared/utils/submission";

@withRouter
export default class ListItem extends React.Component {
  static propTypes = {
    submission: PropTypes.object.isRequired,
  };

  renderMemoryCost() {
    let cost = this.props.submission.memory_cost;
    let unit = 'B';
    if (cost > 1000) {
      cost /= 1024;
      unit = 'KB';
    }
    if (cost > 1000) {
      cost /= 1024;
      unit = 'MB';
    }
    return `${cost} ${unit}`;
  }

  render() {
    const { id, user, problem, status, time_cost: timeCost } = this.props.submission;
    const config = getStatusConfig(status);

    return (
      <tr key={id}>
        <th scope="row">{id}</th>
        <td className="problem-title">
          <Link to={`/problem/${problem.id}/`}>{problem.title}</Link>
        </td>
        <td>
          <span className={`text-${config.color}`}>{config.abbr}</span>
        </td>
        <td>{timeCost} ms</td>
        <td>{this.renderMemoryCost()}</td>
      </tr>
    );
  }
}
