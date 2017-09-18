import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect, withRouter } from "react-router-dom";
import { graphql, compose, withApollo } from "react-apollo";

import isVerified from "../../../shared/HoCs/isVerified";
import isAuthenticated from "../../../shared/HoCs/isAuthenticated";
import ProfileComponent from "../components/ProfileComponent";

import currentUserQuery from "../../../shared/graphql/queries/currentUserQuery";
import updateUserMutation from "../../../shared/graphql/mutations/updateUserMutation";

class ProfileContainer extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  state = {
    loading: false,
    success: false,
    error: false
  };

  componentWillReceiveProps = nextProps => {
    if (!nextProps.data.loading) {
      //this.handleEditProfile(nextProps.data.user);
    }
  };

  handleEditProfile = userData => {
    //TODO: Figure out how to edit user email and password
    this.setState({ loading: true });
    this.props
      .updateUser({
        variables: {
          id: userData.id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          bio: userData.bio,
          location: userData.location,
          profilePhotoId: userData.profilePhoto
        },
        refetchQueries: [{ query: currentUserQuery }]
      })
      .then(response => {
        this.setState({ loading: false, success: true });
      })
      .catch(err => {
        console.error(err);
        this.setState({ loading: false, error: true });
        this.props.client.resetStore();
      });
  };

  render() {
    if (this.props.data.loading) return null;

    return (
      <ProfileComponent
        onSettingChange={this.handleEditProfile}
        user={this.props.data.user}
        error={this.state.error}
        loading={this.state.loading}
        success={this.state.success}
      />
    );
  }
}

export default compose(
  graphql(currentUserQuery),
  graphql(updateUserMutation, { name: "updateUser" }),
  withApollo,
  withRouter
)(isVerified(isAuthenticated(ProfileContainer)));
