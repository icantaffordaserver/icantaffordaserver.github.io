/**
 * Created by alexandermann on 2017-02-11.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import DashboardViewDetail from '../../Dashboard/DashboardViewDetail'
import ViewProfileContainer from '../containers/ViewProfileContainer'
import EditProfileContainer from '../EditProfileForm/containers/EditProfileFormContainer'

const propTypes = {
  history: PropTypes.object.isRequired,
}

class CurrentProfile extends React.Component {
  state = {
    editButtonText: 'Edit',
    isEditing: false,
  }

  setEditing = () => {
    const { isEditing } = this.state
    if (isEditing) {
      this.setState({ editButtonText: 'Edit', isEditing: false })
    } else {
      this.setState({ editButtonText: 'Done', isEditing: true })
    }
  }

  render() {
    const { editButtonText, isEditing } = this.state
    return (
      <DashboardViewDetail
        title="My Profile"
        leftLinkText="Return to Dashboard"
        leftLinkClick={() => this.props.history.push('/dashboard')}
        rightLinkText={editButtonText}
        rightLinkClick={this.setEditing}
      >
        {isEditing
          ? <EditProfileContainer doneEditing={this.setEditing} />
          : <ViewProfileContainer />}
      </DashboardViewDetail>
    )
  }
}

CurrentProfile.propTypes = propTypes

export default withRouter(CurrentProfile)
