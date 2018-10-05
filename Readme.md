# The Game List

The game list is a simple list that allows users to add, edit, and delete from a list of games.
The app currently supports three required fields (Game Name, Description, & Rating).

## Installation

```sh
cd client && npm i && npm start
```
Once running locally you should be directed to your [localhost:3000](http://localhost:3000/) to access a
local instance of the application.

Alternatively, everything is hosted on AWS so you can directly access the app by visiting [game-list.rwdavisx.com](http://game-list.rwdavisx.com/)

## Technologies
### Serverless
The backend is ran using the [Serverless Framework](https://serverless.com/) and [Amazon Web Services](https://aws.amazon.com/)
* AWS Api Gateway hosts the REST endpoints
* AWS Lambda functions are configured to run for each endpoint
* A DynamoDB table is used to store the captured data

### React
The front-end is running on create-react-app and uses the material-ui component library
* React allows a seamless single-page app
* Material UI provides multiple components for quickly building out apps
* React and ES6 integrate well and offer simple ways to solve problems