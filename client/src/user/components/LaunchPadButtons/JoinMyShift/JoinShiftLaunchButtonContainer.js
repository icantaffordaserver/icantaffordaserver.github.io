/**
 * Created by alexandermann on 2017-03-12.
 */
import React from 'react'
import { compose, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import LaunchPadItem from '../LaunchPadItem'
import computer from './105_Reading.png'
import CurrentUserQuery from '../../../../graphql/user/currentUserQuery'
import isConnectionSet from '../../../isConnectionSet'
import CountdownToConversation from '../../CountdownToConversation/CountdownToConversation'

class JoinShiftLaunchButtonContainer extends React.Component {
  static propTypes = {
    history: React.PropTypes.object.isRequired,
    data: React.PropTypes.object.isRequired,
  }

  handleClick = () => {
    if (this.isDisabled()) return
    this.props.history.push('/chat')
  }

  isDisabled = () => {
    const { connectionTime, status } = this.props.data.viewer.user.connections.edges[0].node
    if (status === 'matched' || status === 'scheduled') return false
    return true
  }

  renderLabel = () => {
    // get the most recent connection
    const { connectionTime } = this.props.data.viewer.user.connections.edges[0].node
    if (isConnectionSet(connectionTime)) {
      return {
        labelMessage: `Your Shift is scheduled for ${moment(connectionTime).format('MMM DD h:mm A')}`,
        labelPosition: 'top left',
        labelColor: 'blue',
      }
    }
  }

  render() {
    if (this.props.data.loading) return null

    const { connectionTime } = this.props.data.viewer.user.connections.edges[0].node
    return (
      <CountdownToConversation timeToCountdownTo={connectionTime}>
        <LaunchPadItem
          {...this.renderLabel()}
          imgSrc={computer}
          header="Join my Shift"
          onClick={this.handleClick}
          disabled={this.isDisabled()}
        />
      </CountdownToConversation>
    )
  }
}

export default compose(withRouter, graphql(CurrentUserQuery))(JoinShiftLaunchButtonContainer)
