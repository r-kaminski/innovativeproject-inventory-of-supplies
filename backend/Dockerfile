FROM python:3.6

### Build-time variables

# Set default requirements production
ARG requirements=requirements/production.txt


### Run-time variables

# Set default settings production
ENV DJANGO_SETTINGS_MODULE=backend.settings.production

WORKDIR /backend

COPY . ./

RUN pip install -r $requirements

RUN python manage.py collectstatic --noinput

RUN chmod -R 755 /backend/backend/static

EXPOSE 8001

CMD ["python", "manage.py", "runserver", "0.0.0.0:8001"]