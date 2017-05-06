/**
 * Created by alexandermann on 2017-03-01.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { graphql, compose, withApollo } from 'react-apollo'
import LoginComponent from './LoginForm'
import CurrentUserQuery from '../../../graphql/user/currentUserQuery'
import SignInMutation from './graphql/loginMutation'

class LoginContainer extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }
  state = {
    loading: false,
    error: '',
  }

  handleLogin = async (email, password) => {
    event.preventDefault()
    try {
      this.setState({ loading: true })
      const response = await this.props.mutate({
        variables: {
          email,
          password,
        },
      })
      window.localStorage.setItem('scaphold_user_token', response.data.loginUser.token) // save token

      // reset the store after the user has been authenticated, then direct to dashboard
      this.props.client.resetStore()
      this.props.history.push('/dashboard')
    } catch (error) {
      if (error.message.includes('Could not find a user with that username')) {
        this.setState({ loading: false, error: 'User does not exist' })
      } else if (error.message.includes('Invalid password')) {
        this.setState({ loading: false, error: 'Invalid password' })
      }
    }
  }

  render() {
    if (this.props.data.loading) return null

    // if the user is already logged in, redirect to dashboard
    if (this.props.data.viewer && this.props.data.viewer.user) return <Redirect to="/dashboard" />

    const { loading, error } = this.state
    return <LoginComponent onSubmit={this.handleLogin} loading={loading} error={error} />
  }
}

// wrap the component with withApollo so we can expose the client prop
export default withApollo(
  compose(graphql(CurrentUserQuery), graphql(SignInMutation))(LoginContainer),
)
