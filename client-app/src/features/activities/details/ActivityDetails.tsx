//import React from "react";
import { Button, Card, CardContent, CardDescription, CardHeader, CardMeta,  Image } from "semantic-ui-react";
import { IActivity } from "../../../app/models/IActivity";

interface Props{
    activity:IActivity;
    cancelSelectActivity:()=>void;
    openForm:(id:string)=>void;
    
    
}

export default function ActivityDetails({activity, cancelSelectActivity,openForm}:Props)
{
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`}/>
            <CardContent>
                <CardHeader>{activity.title}</CardHeader>
                <CardMeta>
                    <span className='date'>{activity.date}</span>
                </CardMeta>
                <CardDescription>
                    {activity.description}
                </CardDescription>
            </CardContent>
            <CardContent extra>
               <Button.Group widths='2'>
                <Button onClick={()=>openForm(activity.id)} basic color="blue" content='Edit'/>
                <Button onClick={cancelSelectActivity} basic color="grey" content="Cancel"/>
               </Button.Group>
            </CardContent>
        </Card>
    )
}