# airtribe_news

News aggregator app for subscribers and users

Installation

- Clone the repository: git clone https://github.com/mushtaque87/airtribe_taskmanager.git
- Install the dependencies: npm install or yarn install
- Start the server: npm server or yarn server
- The news service is used from https://newsapi.org/

## API Endpoints

### POST /register

_Signup to create an account_

### POST /login

_SignIn and get JWT token_

### GET /news/:userId

_Retrieve news based on a random saved preference_

### GET /search/:keyword

\_Retrieve news based on a search keyword

### POST /:userId/read

_Mark a news as read._

### GET /:userId/read

_Retrieve all the news marked as read._

### POST /:userId/preferences

_Save a preference._

### GET /:userId/preferences

_Retrieve all preferences._

**Postman collection Included in the project repo**
https://pyypl-automation.postman.co/workspace/Team-Workspace~7c9314e6-3447-4b31-8377-c1c5e4bfe632/folder/29807680-7f907699-1980-414e-9c49-b315c52b8f39?action=share&creator=29807680&ctx=documentation

![Postman Collection]
(/assets/request_collection.png)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
