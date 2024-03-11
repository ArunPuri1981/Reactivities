import { Fragment, useEffect, useState } from 'react'
import axios from 'axios';
import { Container, List, ListItem } from 'semantic-ui-react';
import { IActivity } from '../models/IActivity'
import MenuExamplePointing from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';



function App() {
  const [activities, setActivities] = useState<IActivity[]>([]);

  useEffect(() => {
    axios.get<IActivity[]>('http://localhost:5000/api/activities')
      .then(response => {
        console.log(response);
        setActivities(response.data)
      })
  }, [])

  return (
    <Fragment>
      {/* <Header as ='h2' icon='users' block content='Reactivities'/> */}
      <MenuExamplePointing />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard activities={activities} />
      </Container>
    </Fragment>
  )
}

export default App
