## How to run

### Prerequisites
Install docker and docker-compose.

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

### Backend

To run Django manage.py command, use instruction:

```bash
$ docker-compose exec app python manage.py <command>
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
Keep in mind that if you want to see latest database structure, you might need to run Django migrations:

```bash
$ docker-compose exec app python manage.py makemigrations <app>
$ docker-compose exec app python manage.py migrate
```

## Production

To build project for production use 
```bash
$ docker-compose -f docker-compose.prod.yml up
```
It will serve backend at port 8080 and frontend at port 80.

## License
[MIT](https://choosealicense.com/licenses/mit/)
