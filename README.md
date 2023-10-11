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

_Body_
```
{
    "firstName": "Mushtaque",
    "lastName": "Ahmed",
    "email": "mushtaque@airtribe.com",
    "password": "password",
    "role": "USER"
}
```

### POST /login

_SignIn and get JWT token_

_Body_
```
{
    "email" : "mushtaque@airtribe.com",
    "password": "password"

}
```
_Response_
```
{
    "user": {
        "userid": "769311fd-4a65-4668-b1c0-e797d1518a15",
        "id": "6523c4bb2235bbb8c5974dfa",
        "email": "mushtaque@airtribe.com",
        "fullName": "Mushtaque Ahmed"
    },
    "message": "Login Successful",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjNjNGJiMjIzNWJiYjhjNTk3NGRmYSIsImlhdCI6MTY5Njk0NjcyMiwiZXhwIjoxNjk3MDMzMTIyfQ.zMYrbAiUJN_5hqEWNmu77kav9k9fMIyvWvfFU6hVvpA"
}
```

### GET /search/:keyword

_Retrieve news based on a search keyword

```
 axios.get(
        `https://newsapi.org/v2/everything?q=${keyword}&from=2023-10-06&sortBy=publishedAt&apiKey=${process.env.APIKEY}`,
      ) .then(
        (response: any) => {
          log.info(response.data);
          res.status(200).json(response.data.articles);
        },
        error => {
          console.log(error);
        },
      );
```
Call the newsapi.org with desired keyword and API Keys to get the response and show only the first news ( for ease of understanding) and mark that `read : true` 
```
{
        "title": "Nach Hamas-Angriff ",
        "description": "Das dicht besiedelte",
        "url": "https://www.tagesspiegel.de/internationales/nach-hamas-angriff-mit-uber-700-opfern-israel-ordnet-komplette-abriegelung-des-gaza-streifens-an-10594450.html",
        "urlToImage": "https://www.tagesspiegel.de/images/sea-water-splash-following-h-following-israeli-strikes-in-gaza.jpeg",
        "publishedAt": "2023-10-09T14:45:00Z",
        "read" : true
}
```

### GET /news/:userId

_Retrieve news based on a random saved preference_

Same as above. Fetch the a random saved preference and call the newsapi.org endpoint and show the first news.

_Response_

```
{
        "title": "Nach Hamas-Angriff ",
        "description": "Das dicht besiedelte",
        "url": "https://www.tagesspiegel.de/internationales/nach-hamas-angriff-mit-uber-700-opfern-israel-ordnet-komplette-abriegelung-des-gaza-streifens-an-10594450.html",
        "urlToImage": "https://www.tagesspiegel.de/images/sea-water-splash-following-h-following-israeli-strikes-in-gaza.jpeg",
        "publishedAt": "2023-10-09T14:45:00Z",
}

```


### POST /:userId/read

_Body_
```
{
        "newsId":"c038acda35623e7cf3ab0a8062352c9c",
        "userId":"769311fd-4a65-4668-b1c0-e797d1518a15",
        "title": "Nach Hamas-Angriff ",
        "description": "Das dicht besiedelte",
        "url": "https://www.tagesspiegel.de/internationales/nach-hamas-angriff-mit-uber-700-opfern-israel-ordnet-komplette-abriegelung-des-gaza-streifens-an-10594450.html",
        "urlToImage": "https://www.tagesspiegel.de/images/sea-water-splash-following-h-following-israeli-strikes-in-gaza.jpeg",
        "publishedAt": "2023-10-09T14:45:00Z",
}

```

Since the third part news agreegator app was not providing any newsId to store the news. I used _crypto_ library to generate a 16 digit hex number to provide a newsId to the payload to be stored in MongoDB

_Mark a news as read._

### GET /:userId/read

_Retrieve all the news marked as read._

### POST /:userId/preferences

_Save a preference._

_Body_
```
{
    "userId": "769311fd-4a65-4668-b1c0-e797d1518a15",
    "preference": "war",
}
```

### GET /:userId/preferences

_Retrieve all preferences._

_Response_
```
[
war,
cricket
]
```

### POST /:userId/favorites

_Mark a news as favorite._

```
{
    "newsId": "6036a2d4e15ef24b6601a8ea26b6111d"
}

```
### GET /:userId/favorites

_Retrieve all favorite news._

```
[ {
        "_id": "652578bf4d9446ab62e2b65c",
        "newsId": "6036a2d4e15ef24b6601a8ea26b6111d",
        "userId": "769311fd-4a65-4668-b1c0-e797d1518a15",
        "title": "Landtagswahlen in Hessen und Bayern: Ferndiagnose aus der Hauptstadt",
        "description": "Berlins Parteispitzen äußern sich zu den Wahlergebnissen vom Sonntag. Gerade bei den Grünen sieht es in der Hauptstadt deutlich besser aus.",
        "read": true,
        "createdAt": "2023-10-10T16:15:59.369Z",
        "updatedAt": "2023-10-10T16:48:04.288Z",
        "favorite": true
    }]
```

**Postman collection Included in the project repo**
https://pyypl-automation.postman.co/workspace/Team-Workspace~7c9314e6-3447-4b31-8377-c1c5e4bfe632/folder/29807680-7f907699-1980-414e-9c49-b315c52b8f39?action=share&creator=29807680&ctx=documentation

![Postman Collection]
(/assets/request_collection.png)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
