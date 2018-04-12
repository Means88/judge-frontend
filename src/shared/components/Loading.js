import React from 'react';
import PropTypes from 'prop-types';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';
import Icon from '@fortawesome/react-fontawesome';

class Loading extends React.Component {
  render() {
    return (
      <div className={`text-center ${this.props.className}`} style={this.props.style}>
        <Icon icon={faSpinner} size="2x" spin />
      </div>
    );
  }
}

Loading.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
};

Loading.defaultProps = {
  className: '',
  style: {},
};

export default Loading;

