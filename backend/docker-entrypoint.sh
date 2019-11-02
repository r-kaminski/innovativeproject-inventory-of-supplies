#!/bin/sh
set -e

if [[ ! "${DJANGO_SETTINGS_MODULE}" =~ "testing" ]]; then
    echo "Waiting for $DB_HOST"
    while ! nc -z $DB_HOST $DB_PORT; do
        sleep 0.1
    done
    echo "$DB_HOST ready"

    python manage.py makemigrations
    python manage.py migrate
    python manage.py shell < create-superuser.py
fi

exec "$@"
