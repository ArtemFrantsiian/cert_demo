import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import cn from "classnames";
import { Avatar, Dropdown, Icon, Menu, message } from 'antd';

import "./style.scss";
import { logout } from "../../actions";

//----------------------------------------------------------------------------------------------------------------------

class NavBar extends Component {
  menu = (
    <Menu>
      <Menu.Item key="1"><Link to="/revoke">Revoke</Link></Menu.Item>
      <Menu.Item key="2"><span onClick={() => this.props.logout()}>Logout</span></Menu.Item>
    </Menu>
  );

  guestLink = (
    <Fragment>
      <li><Link className="link" to="/register">Register</Link></li>
      <li><Link className="link" to="/login">Login</Link></li>
    </Fragment>
  );

  render() {
    const { isLoggedIn, name } = this.props;
    const userLink = (
      <Fragment>
        <li className="avatar"><Avatar icon="user" /></li>
        <li>
          <Dropdown overlay={this.menu} trigger={['click']}>
            <span className="name">{name}<Icon type="down" /></span>
          </Dropdown>
        </li>
      </Fragment>
    );

    return (
      <div className="nav">
        <div className="nav__holder holder">
          <Link to="/" className="nav__logo">Site</Link>
          <ul className={cn("nav__items", { "in_center": isLoggedIn })}>
            {isLoggedIn ? userLink : this.guestLink}
          </ul>
        </div>
      </div>
    )
  }
}

//----------------------------------------------------------------------------------------------------------------------

NavBar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

//----------------------------------------------------------------------------------------------------------------------

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  userId: state.auth.userId,
  name: state.auth.name
});

//----------------------------------------------------------------------------------------------------------------------

export default connect(mapStateToProps, { logout })(NavBar)