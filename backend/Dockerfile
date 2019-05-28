FROM python:3.6-alpine

### Build-time variables

# Set default requirements production
ARG requirements=requirements/production.txt


### Run-time variables

# Set default settings production
ENV DJANGO_SETTINGS_MODULE=backend.settings.production

WORKDIR /backend

COPY . ./

RUN \
 apk add --no-cache build-base python-dev py-pip jpeg-dev zlib-dev && \
 apk add --no-cache postgresql-libs postgresql-dev && \
 apk add --no-cache --virtual .build-deps gcc musl-dev && \
 pip install -r $requirements --no-cache-dir && \
 apk --purge del .build-deps

RUN python manage.py collectstatic --noinput

RUN chmod -R 755 /backend/backend/static
RUN chmod 755 /backend/docker-entrypoint.sh

EXPOSE 8001

ENTRYPOINT ["/backend/docker-entrypoint.sh"]
CMD ["python", "manage.py", "runserver", "0.0.0.0:8001"]
