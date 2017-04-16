/**
 * Created by alexandermann on 2017-02-17.
 */
import React from 'react';
import { Grid } from 'semantic-ui-react';
import JoinShiftLaunchButtonContainer from '../components/LaunchPadButtons/JoinMyShift/JoinShiftLaunchButtonContainer';
import FirestarterLaunchButtonContainer from '../components/LaunchPadButtons/FireStarter/FireStarterLaunchButtonContainer';
import RequestConnectionButtonContainer from '../components/LaunchPadButtons/RequestConnection/RequestConnectionLaunchButtonContainer';
import ReflectionLaunchButtonContainer from '../components/LaunchPadButtons/Reflect/ReflectionLaunchButtonContainer';
import MyProfileLaunchButtonContainer from '../components/LaunchPadButtons/MyProfile/MyProfileLaunchButtonContainer';
import AvailabilityLaunchButtonContainer from '../components/LaunchPadButtons/AvailabilityLaunchButtonContainer';
import CountdownToConversation from '../components/CountdownToConversation/CountdownToConversation';


class LaunchPad extends React.Component {

  render() {
    return (
      <Grid container verticalAlign="middle" columns={3}>
        <Grid.Row>
          <Grid.Column>
            <JoinShiftLaunchButtonContainer />
          </Grid.Column>
          <Grid.Column>
            <FirestarterLaunchButtonContainer />
          </Grid.Column>
          <Grid.Column>
            <AvailabilityLaunchButtonContainer/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <RequestConnectionButtonContainer />
          </Grid.Column>
          <Grid.Column>
            <ReflectionLaunchButtonContainer />
          </Grid.Column>
          <Grid.Column>
            <MyProfileLaunchButtonContainer />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default LaunchPad;