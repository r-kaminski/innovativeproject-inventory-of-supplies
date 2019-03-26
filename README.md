Table of Contents
=================

<!--ts-->
   * [Table of contents](#table-of-contents)
   * [How to run](#how-to-run)
      * [Prerequisites](#prerequisites)
      * [Run](#run)
      * [Exit](#exit)
   * [Interaction](#interaction)
      * [API](#api)
      * [Browsable API documentation](#browsable-api-documentation)
      * [Backend](#backend)
      * [Frontend](#frontend)
      * [Database](#database)
   * [Mobile](#mobile)
   * [License](#license)
<!--te-->

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
curl -X POST -d "username=testuser&password1=testpassword&password2=testpassword&email=test@email.com&first_name=John&last_name=Doe" http://localhost/rest-auth/name-registration/

# Returns:
# {"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0LCJ1c2VybmFtZSI6InRlc3R1c2VyMjExIiwiZXhwIjoxNTUzMjAyMDk1LCJlbWFpbCI6InRlc3QzMkBlbWFpbC5jb20iLCJvcmlnX2lhdCI6MTU1MzE5ODQ5NX0.PI_csWibxJ13UfmF1ePRXmc_0tlCULJgbPSfo8f763o","user":{"pk":1,"username":"testuser","email":"test@email.com","first_name":"John","last_name":"Doe"}}
# token is just a example, yours will look different but will be in the same format
```

or login:
```bash
curl -X POST -d "username=testuser&password=testpassword" http://localhost/rest-auth/login/

# Returns:
# {"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6InRlc3R1c2VyIiwiZXhwIjoxNTUzMjAyMTgyLCJlbWFpbCI6InRlc3RAZW1haWwuY29tIiwib3JpZ19pYXQiOjE1NTMxOTg1ODJ9.zSd3NyP3rDcmP_CCZCwL8oqjctWMdVAO5w6OKTDUAJ0","user":{"pk":1,"username":"testuser","email":"test@email.com","first_name":"","last_name":""}}
```

Finally use the access token you authenticate your request:
```bash
curl -X GET http://localhost/api/users/1/ -H "Authorization: JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6InRlc3R1c2VyIiwiZXhwIjoxNTUzMjAyMTgyLCJlbWFpbCI6InRlc3RAZW1haWwuY29tIiwib3JpZ19pYXQiOjE1NTMxOTg1ODJ9.zSd3NyP3rDcmP_CCZCwL8oqjctWMdVAO5w6OKTDUAJ0"

# Returns:
# {"username":"testuser","email":"test@email.com","first_name":"","last_name":""}

```

### Browsable API documentation
Head to http://localhost/docs/. You will be able to view API endpoints and try them out. Keep in mind that permissions are applied and mocking a request to some of them will require authentication.

To authenticate, use the default admin account (username: admin, password: admin) that is created automatically for development.

First, go to obtain-token endpoint and press "Interact":  
<p align="center">
  <img src="https://github.com/nokia-wroclaw/innovativeproject-inventory-of-supplies/raw/master/docs/images/obtain-token-view.png" alt="Obtain token view"/>
</p>

Then, input the default admin's account credentials into form fields and press "Send request". A token in JSON format should be generated. Copy it's value.  
<p align="center">
  <img src="https://github.com/nokia-wroclaw/innovativeproject-inventory-of-supplies/raw/master/docs/images/obtain-token-login.png" alt="Obtain token login"/>
</p>

On the bottom-left of the page, press the "Authentication" tab to draw out the possible options and choose "token":  
<p align="center">
  <img src="https://github.com/nokia-wroclaw/innovativeproject-inventory-of-supplies/raw/master/docs/images/docs-auth.png" alt="Docs authentication"/>
</p>

Lastly, fill out the Token Authentication form:
```bash
Scheme: JWT
Token: <put your token here>
```
<p align="center">
  <img src="https://github.com/nokia-wroclaw/innovativeproject-inventory-of-supplies/raw/master/docs/images/docs-token.png" alt="Docs token"/>
</p>
Your browsable API docs session should be authenticated now. With admin privileges you should be able to test out all the endpoints with built-in mock feature.

### Backend

To run Django manage.py command, use instruction:

```bash
$ docker-compose exec backend python manage.py <command>
```

Create admin account (keep in mind that admin:admin account is created automatically):

```bash
$ docker-compose exec backend python manage.py createsuperuser
```

Due to docker-compose configuration, the Django server is reloaded automatically every time a change to the code is made. 

To interact with API through web browser, navigate to http://localhost/api or http://0.0.0.0/api

To execute tests run:

```bash
$ docker-compose exec backend python manage.py test
```

### Frontend

To open application frontend navigate to http://localhost/ or http://0.0.0.0/

To install new packages use:

```bash
$ docker-compose exec frontend npm i package-name --save
```

### Database
To interact with database run:

```bash
$ docker-compose exec db psql -h localhost -p 5432 -U postgres postgres
Password for user postgres: postgres
$ \dt # show tables
```

## Mobile

For development:

```cd mobile``` - change directory

```yarn``` - install dependencies

```yarn start``` or ```sudo yarn start``` - run app

For production:

```expo build:android``` or ```sudo expo build:android```

## License
[MIT](https://choosealicense.com/licenses/mit/)
