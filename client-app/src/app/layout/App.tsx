import { Fragment, useEffect, useState } from 'react'
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { IActivity } from '../models/IActivity'
import MenuExamplePointing from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponents from './LoadingComponents';



function App() {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    //axios.get<IActivity[]>('http://localhost:5000/api/activities')
    agent.Activities.list().then(response => {
      //console.log(response);
      //setActivities(response.data)
      let activities: IActivity[] = [];
      response.forEach(activity => {
        activity.date = activity.date.split("T")[0];
        activities.push(activity);
      })
      setActivities(activities);
      setLoading(false);

      //setActivities(response);
    })
  }, [])

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(act => act.id === id));
  }

  function handleCancelSelectedActivity() {
    setSelectedActivity(undefined);
  }

  function handelFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectedActivity();
    setEditMode(true);
  }

  function handelFormClosed() {
    setEditMode(false);
  }

  function handelDeleteActivity(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)]);
      setSubmitting(false);
    })    
  }

  function handelCreateOrEditActivity(activity: IActivity) {
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity])
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }

  }
  if (loading) return <LoadingComponents content='Loading app' />

  return (
    <Fragment>
      {/* <Header as ='h2' icon='users' block content='Reactivities'/> */}
      <MenuExamplePointing openForm={handelFormOpen} />
      <Container style={{ marginTop: '2em' }}>
        <ActivityDashboard activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectedActivity}
          editMode={editMode}
          openForm={handelFormOpen}
          closeForm={handelFormClosed}
          createOrEdit={handelCreateOrEditActivity}
          deleteActivity={handelDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </Fragment>
  )
}

export default App
