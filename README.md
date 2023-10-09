# Project Overview
 - The Trip Buddy application is designed to assist users in organizing and managing their travel plans seamlessly. It provides a user-friendly platform where individuals can create, update, and view details about their trips. Users can set trip names, add schedule events, and optionally receive notifications for upcoming events. The application aims to enhance the travel planning experience by offering a centralized and intuitive tool for users to keep track of their itineraries.

# workflow
 - Workflow for Trip Buddy Application:
 1. User Creates a Trip:
    - The user interacts with the frontend application, creates a new trip by providing a trip name and schedule information.
    - The user submits the form, triggering a POST request to the backend endpoint, e.g., /trips.
2. Backend Processes the Trip Creation:
    - The backend server's /trips endpoint handles the incoming POST request.
    - The server validates the input data and saves the new trip details in the database.
3. User Retrieves Trip List:
    - The user can view their list of trips by navigating to the relevant section of the frontend application.
    - The frontend sends a GET request to the backend endpoint, e.g., /trips, to retrieve the list of trips for the user.
4. Backend Sends Trip Data to Frontend:
    - The backend processes the GET request, retrieves the list of trips associated with the user from the database, and sends the data back to the frontend.
5. User Views Trip Details:
    - The user can view the details of a specific trip by selecting it from the list.
    - The frontend displays the trip details, including the trip name and schedule.
6. User Adds Schedule Event to a Trip:
    - The user can add a new schedule event to an existing trip by interacting with the frontend.
    - The frontend sends a POST request to the backend endpoint, e.g., /trips/:tripId/add.
7. Backend Processes Schedule Addition:
    - The backend handles the POST request, validates the input, and adds the new schedule event to the specified trip in the database.

8. Backend Processes Deletion:
    - The backend processes the DELETE request, removes the specified trip or schedule event from the database.


# Tech Stacks Used
 - Frontend: ReactJs
 - Backend: NodeJs
 - Data Base: Mongo Atlas
 - External APIs: Plivo Messaging API

# Running Instructions

1) Add Auth_key and Auth_password in 
```
backend/routes/trips.js
backend/routes/Users.js
```


* Run Express Backend:
```
cd backend/
npm install
npm start
```

* Run React Frontend:
```
cd frontend
npm install/
npm start
```
# Improvements and Future Work for the Trip Buddy Application:
- Some of the notable improvements that can be made in future are:
    -> User Authentication and Authorization Enhancements, Mobile Application Development, Integration with Maps and Location Services, Collaborative Trip Planning.


Navigate to [http://localhost:3000/](http://localhost:3000/) in your browser.

# Plivo_TripBuddy
