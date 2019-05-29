FROM python:3.6-alpine

ARG requirements=requirements/production.txt

ENV DJANGO_SETTINGS_MODULE=backend.settings.production

WORKDIR /backend

COPY . ./

RUN \
 apk add --no-cache --virtual .build-deps \
 build-base python-dev py-pip jpeg-dev zlib-dev \
 postgresql-libs postgresql-dev gcc musl-dev \
 && pip install -r $requirements --no-cache-dir \
 && find /usr/local \
        \( -type d -a -name test -o -name tests \) \
        -o \( -type f -a -name '*.pyc' -o -name '*.pyo' \) \
        -exec rm -rf '{}' + \
 && runDeps="$( \
        scanelf --needed --nobanner --recursive /usr/local \
                | awk '{ gsub(/,/, "\nso:", $2); print "so:" $2 }' \
                | sort -u \
                | xargs -r apk info --installed \
                | sort -u \
    )" \
 && apk add --virtual .rundeps $runDeps \
 && apk del .build-deps

RUN \
 python manage.py collectstatic --noinput \
 && chmod -R 755 /backend/backend/static \
 && chmod 755 /backend/docker-entrypoint.sh

EXPOSE 8001

ENTRYPOINT ["/backend/docker-entrypoint.sh"]
CMD ["python", "manage.py", "runserver", "0.0.0.0:8001"]
