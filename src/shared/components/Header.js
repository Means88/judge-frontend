import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import reactLogo from '../assets/react.svg';
import '../styles/Header.less';

export default class Header extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
  };

  static defaultProps = {
    className: '',
    style: {},
  };

  render() {
    const { className, style } = this.props;

    return (
      <header className={`header clearfix ${className}`} style={style}>
        <div className="container">
          <div className="header-logo">
            <Link to='/'>
              <img src={reactLogo} alt="React" width={48} />
              <span className="header-logo-text">Judge</span>
            </Link>
          </div>
        </div>
      </header>
    );
  }
}
