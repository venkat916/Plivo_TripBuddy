// import axios from "axios";
// import { useState, useEffect } from "react";

// const Profile = (props) => {
//   const [details, setDetails] = useState([]);
//   useEffect(() => {
//     axios
//       .get("http://localhost:4000/profile") // unimplemented
//       .then((response) => {
//         setDetails(response.data);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }, []);
//   return <div></div>;
// };

// export default Profile;
import React, { useState, useEffect } from 'react';
import { Button, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TripList = () => {
  const [trips, setTrips] = useState([
    {
      "tripName": "Summer Vacation",
      "schedule": [
        {
          "event": "Visit Beach",
          "date": "2023-07-10T12:00:00Z",
        },
        {
          "event": "Explore City",
          "date": "2023-07-15T10:30:00Z",
        },
      ],
    },
  ]);
  const [newEvent, setNewEvent] = useState('');


  return (
    <div>
      <h2>Trips</h2>
      <div style={{border:"1px solid black",width:"300px",marginLeft:"4%",paddingLeft:"5%",float:"left"}}>
      <h2>Summer Vacation</h2>
      <List style={{marginTop:"0px"}}>
      {trips[0].schedule.map((event) => (
                <ListItem key={event._id}>
                  <ListItemText primary={event.event} secondary={new Date(event.date).toLocaleString()} />
                  {/* <ListItemSecondaryAction>
                    <IconButton edge="end" >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction> */}
                </ListItem>
              ))}
      </List>
      </div>
      <div style={{border:"1px solid black",width:"300px",marginLeft:"8%",paddingLeft:"5%",float:"left"}}>
      <h2>Bussiness Trip</h2>
      <List style={{marginTop:"0px"}}>
                <ListItem key={0}>
                  <ListItemText primary={"Client Meeting"} secondary={new Date().toLocaleString()} />
                  {/* <ListItemSecondaryAction>
                    <IconButton edge="end" >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction> */}
                </ListItem>

      </List>
      <List style={{marginTop:"0px"}}>
                <ListItem key={0}>
                  <ListItemText primary={"Bussiness Deal"} secondary={new Date().toLocaleString()} />
                  {/* <ListItemSecondaryAction>
                    <IconButton edge="end" >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction> */}
                </ListItem>

      </List>
      </div>
      
      {/* <List>
        {trips.map((trip) => (
          <ListItem key={trip._id}>
            <h1>Summer Vacation</h1>
            <Button
              variant="contained"
              // onClick={() => handleAddEvent(trip._id)}
              style={{marginTop:"100px",float:"left"}}
            >
              Add Event
            </Button>
            <List>
              {trip.schedule.map((event) => (
                <ListItem key={event._id}>
                  <ListItemText primary={event.event} secondary={new Date(event.date).toLocaleString()} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </ListItem>
        ))}
      </List> */}
    </div>
  );
};

export default TripList;

