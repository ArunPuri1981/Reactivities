import { useEffect, useState } from 'react'
import axios from 'axios';
import { List, ListItem } from 'semantic-ui-react';
import { IActivity } from '../models/IActivity'
import MenuExamplePointing from './Navbar';



function App() {
  const [activities,setActivities]=useState<IActivity[]>([]); 

  useEffect(()=>{
    axios.get<IActivity[]>('http://localhost:5000/api/activities')
    .then(response=>{
      console.log(response);
      setActivities(response.data)
    })
  },[])

  return (
    <div>
    {/* <Header as ='h2' icon='users' block content='Reactivities'/> */}
    <MenuExamplePointing/> 
    
    <List>
      {activities.map(activity=>(
        <ListItem key={activity.id}>
          {activity.title}
        </ListItem>
      ))}

    </List>
    
    </div>
  )
}

export default App
