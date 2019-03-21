## How to run

### Prerequisites
Install docker and docker-compose.
Install yarn and expo.

### Run

Build docker images.
```bash
$ docker-compose build
```
Run docker-compose.

```bash
$ docker-compose up
```
Or run docker-compose in background.

```bash
$ docker-compose up -d
```

### Exit

Command below will kill all docker containers assigned to this docker-compose.

```bash
$ docker-compose stop
```

## Interaction

Below instructions assume that you've built and ran docker-compose using commands above.

### API

Authentication uses JSON Web Tokens. To authenticate your request, you will need to obtain access token.

This can be done by either registration:

```bash
curl -X POST -d "username=testuser&password1=testpassword&password2=testpassword&email=test@email.com&first_name=John&last_name=Doe" http://localhost:8080/rest-auth/name-registration/

# Returns:
# {"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0LCJ1c2VybmFtZSI6InRlc3R1c2VyMjExIiwiZXhwIjoxNTUzMjAyMDk1LCJlbWFpbCI6InRlc3QzMkBlbWFpbC5jb20iLCJvcmlnX2lhdCI6MTU1MzE5ODQ5NX0.PI_csWibxJ13UfmF1ePRXmc_0tlCULJgbPSfo8f763o","user":{"pk":1,"username":"testuser","email":"test@email.com","first_name":"John","last_name":"Doe"}}
# token is just a example, yours will look different but will be in the same format
```

or login:
```bash
curl -X POST -d "username=testuser&password=testpassword" http://localhost:8080/rest-auth/login/

# Returns:
# {"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6InRlc3R1c2VyIiwiZXhwIjoxNTUzMjAyMTgyLCJlbWFpbCI6InRlc3RAZW1haWwuY29tIiwib3JpZ19pYXQiOjE1NTMxOTg1ODJ9.zSd3NyP3rDcmP_CCZCwL8oqjctWMdVAO5w6OKTDUAJ0","user":{"pk":1,"username":"testuser","email":"test@email.com","first_name":"","last_name":""}}
```

Finally use the access token you authenticate your request:
```bash
curl -X GET http://localhost:8080/api/users/1/ -H "Authorization: JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6InRlc3R1c2VyIiwiZXhwIjoxNTUzMjAyMTgyLCJlbWFpbCI6InRlc3RAZW1haWwuY29tIiwib3JpZ19pYXQiOjE1NTMxOTg1ODJ9.zSd3NyP3rDcmP_CCZCwL8oqjctWMdVAO5w6OKTDUAJ0"

# Returns:
# {"username":"testuser","email":"test@email.com","first_name":"","last_name":""}

```


### Backend

To run Django manage.py command, use instruction:

```bash
$ docker-compose exec backend python manage.py <command>
```

Create admin account:

```bash
$ docker-compose exec backend python manage.py createsuperuser
```

Due to docker-compose configuration, the Django server is reloaded automatically every time a change to the code is made. 

To interact with API through web browser, navigate to http://localhost:8080/ or http://0.0.0.0:8080/


### Frontend

To open application frontend navigate to http://localhost:3000/ or http://0.0.0.0:3000/


### Database
To interact with database run:

```bash
$ psql -h localhost -p 5432 -U postgres postgres
Password for user postgres: postgres
$ \dt # show tables
```

## Production

To build project for production use 
```bash
$ docker-compose -f docker-compose.prod.yml up
```
It will serve backend at port 8080 and frontend at port 80.


## Mobile

For development:

```cd mobile``` - change directory

```yarn``` - install dependencies

```yarn start``` or ```sudo yarn start``` - run app

For production:

```expo build:android``` or ```sudo expo build:android```

## License
[MIT](https://choosealicense.com/licenses/mit/)
