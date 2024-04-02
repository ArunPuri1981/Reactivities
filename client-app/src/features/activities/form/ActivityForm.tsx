import { ChangeEvent, useState } from "react";
import { Button, Form, FormField, Label, Segment, TextArea } from "semantic-ui-react";
import { IActivity } from "../../../app/models/IActivity";

interface Props{
    activity:IActivity|undefined;
    closeForm:()=>void;
    createOrEdit:(activity:IActivity)=>void;
    submitting:boolean;
}

export default function ActivityForm({activity:selectedActivity,
        closeForm,createOrEdit,submitting}:Props) {

    const initialState=selectedActivity ?? {
        id:'',
        title:'',
        description:'',
        date:'',
        category:'',
        city:'',
        venue:'',
    }

    const [activity,setActivity]=useState(initialState);

    function handelSubmit(){
        //console.log(activity);
        createOrEdit(activity);
    }

    function handelInputChange(event:ChangeEvent<HTMLInputElement| HTMLTextAreaElement>)
    {
        const{name,value}=event.target;
        setActivity({...activity,[name]:value});
    }
    return (
        <Segment clearing>
            <Form onSubmit={handelSubmit} autoComplete='off'>
                <h2>Add /Edit an Activity</h2>
                <FormField>
                    <Label>Title</Label>
                    <input placeholder="Title" value={activity.title} name="title" onChange={handelInputChange}/>
                </FormField>
                <FormField>
                    <Label>Description</Label>
                    <TextArea placeholder="Description" value={activity.description} name="description" onChange={handelInputChange}/>
                </FormField>
                <FormField>
                    <Label>Date</Label>
                    <input type="date" placeholder="Date" value={activity.date} name="date" onChange={handelInputChange}/>
                </FormField>
                <FormField>
                    <Label>Category</Label>
                    <input placeholder="Category" value={activity.category} name="category" onChange={handelInputChange}/>
                </FormField>
                <FormField>
                    <Label>City</Label>
                    <input placeholder="City" value={activity.city} name="city" onChange={handelInputChange}/>
                </FormField>
                <FormField>
                    <Label>Venue</Label>
                    <input placeholder="Venue" value={activity.venue} name="venue" onChange={handelInputChange}/>
                </FormField>
                <Button loading={submitting} floated="right" positive type="submit" content="Submit" />
                <Button onClick={closeForm} floated="right" type="button" content="Cancel" />
            </Form>


        </Segment>
    )
}