import React from 'react';
import { IndexLink, Link } from 'react-router';
import { connect } from 'react-redux';
import { Menu, Dropdown, Image } from 'semantic-ui-react';
import { logout } from '../redux/auth/actions';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(event) {
    event.preventDefault();
    this.props.dispatch(logout());
  }

  render() {
    const active = { borderBottomColor: '#3f51b5' };
    const trigger = this.props.user && (
      <div>
        <Image avatar src={this.props.user.picture || this.props.user.gravatar} />
        {this.props.user.email}
      </div>
    );
    return (
      <Menu pointing secondary size="large">
        <Menu.Item header>{this.props.user && this.props.user.admin ? 'Shift Admin' : 'Shift'}</Menu.Item>
        <Menu.Item as={IndexLink} to="/" activeStyle={active}>Home</Menu.Item>
        {this.props.user && this.props.user.admin && (
          <Menu.Menu>
            <Menu.Item as={Link} name="Dashboard" to="/admin/dashboard" activeStyle={active} />
            <Menu.Item
              as={Link}
              name="User Matching"
              to="/admin/matching"
              activeStyle={active}
            />
            <Menu.Item as={Link} name="Pipeline" to="/admin/pipeline" activeStyle={active} />
          </Menu.Menu>
          )
        }
        {
          this.props.user && !this.props.user.admin && (
            <Menu.Menu>
              <Menu.Item as={Link} name="Dashboard" to="/dashboard" activeStyle={active} />
              <Menu.Item as={Link} name="Connection Panel" to="/connection" activeStyle={active} />
            </Menu.Menu>
          )
        }

        <Menu.Item as={Link} name="Contact" to="/contact" activeStyle={active} />

        {this.props.token ?
          (
            <Menu.Menu position="right">
              <Dropdown item trigger={trigger} pointing="top left">
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/account">My Account</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    as={Link}
                    onClick={this.handleLogout}
                  >
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Menu>
          ) : (
            <Menu.Menu position="right">
              <Menu.Item as={Link} to="/login" activeStyle={active}>Log in</Menu.Item>
              <Menu.Item as={Link} to="/signup" activeStyle={active}>Sign up</Menu.Item>
            </Menu.Menu>
          )}
      </Menu>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  user: state.auth.user,
});

export default connect(mapStateToProps)(Header);
