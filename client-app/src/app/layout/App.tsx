import { Fragment, useEffect, useState } from 'react'
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { IActivity } from '../models/IActivity'
import MenuExamplePointing from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';



function App() {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const[selectedActivity,setSelectedActivity]=useState<IActivity |undefined> (undefined);
  const[editMode,setEditMode]=useState(false);

  useEffect(() => {
    axios.get<IActivity[]>('http://localhost:5000/api/activities')
      .then(response => {
        console.log(response);
        setActivities(response.data)
      })
  }, [])

  function handleSelectActivity(id:string)
  {
    setSelectedActivity(activities.find(act=> act.id=== id));
  }

  function handleCancelSelectedActivity()
  {
    setSelectedActivity(undefined);
  }

  function handelFormOpen(id?:string){
    id? handleSelectActivity(id):handleCancelSelectedActivity();
    setEditMode(true);
  }

  function handelFormClosed(){
    setEditMode(false);
  }

  function handelDeleteActivity(id:string)
  {
    setActivities([...activities.filter(x=>x.id!==id)]);
  }

function handelCreateOrEditActivity(activity:IActivity){
  activity.id? setActivities([...activities.filter(x=>x.id!==activity.id),activity])
    :setActivities([...activities,{...activity,id:uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity);
}
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
        />
      </Container>
    </Fragment>
  )
}

export default App
