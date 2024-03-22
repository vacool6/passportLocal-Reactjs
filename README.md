# Passport local

Session-Based Authentication:

How it works: When a user logs in, the server creates a session for that user and stores the session information (usually in memory or a database). 
A session ID is then sent to the client, typically stored in a cookie.

Usage: The client sends this session ID with each subsequent request, allowing the server to identify and authenticate the user.

Pros: Simple to implement, good for web applications with server-side rendering, session management handled by the server.

Cons: Requires server-side storage, scalability challenges with distributed systems, can be susceptible to session hijacking and CSRF attacks.

## Running the application

### Frontend setup
 1 . Create a react app.

 2 . Replace the App.js file with App.js from PassportLocal-React folder.

 3 . Run the app, frontend is now live at port.3000
 
  
  ### Backend setup
 1 . Logic is available in backend folder in PassportLocal-React folder.

 2 . `$ npm i` to install all the depencencies.

 3 . Setup your .env file (optional).

 ### Flow
 Frontend on X-port interacts with server on Y-port. You can register, login & log user out from React client.

### Note:
Need to have node installed
