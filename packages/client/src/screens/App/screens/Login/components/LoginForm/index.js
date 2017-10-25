import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Message } from 'semantic-ui-react'
import { LoginWrapper, LoginFormWrapper, LoginImageContainer } from './styles'
import {
  Content,
  Title,
  Subheading,
  Form,
  Button,
  FormGroup,
  Input,
  Label,
} from '../../../../styles'

import { validateLogin } from './helpers'

class LoginForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
  }

  static defaultProps = {
    error: '',
  }

  state = {
    email: '',
    password: '',
    error: '',
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = (event, data) => {
    event.preventDefault() // prevent page reload
    this.setState({ error: '' }) // clear any old errors
    const { email, password } = this.state
    const loginErrors = validateLogin(email, password)
    if (typeof loginErrors === 'string') {
      // if validate login returns string we have an error
      this.setState({ error: loginErrors })
      console.log('error')
      return
    }
    this.props.onSubmit(email, password)
  }

  renderErrors = () => {
    if (this.state.error !== '') {
      return <Message error header={this.state.error} />
    }
    if (this.props.error !== '') {
      return <Message error header={this.props.error} />
    }
    return null
  }

  render() {
    const error = this.state.error !== '' || this.props.error !== ''

    return (
      <LoginWrapper>
        <LoginImageContainer>
          <Title huge>PLUTO</Title>
          <Subheading medium>Join the community.</Subheading>
        </LoginImageContainer>
        <LoginFormWrapper>
          <Title large>Sign In</Title>
          {this.renderErrors()}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label>Email</Label>
              <Input name="email" onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                onChange={this.handleChange}
              />
            </FormGroup>
            <Button loading={this.props.loading}> Login </Button>
          </Form>
        </LoginFormWrapper>
      </LoginWrapper>
    )
  }
}

export default LoginForm
