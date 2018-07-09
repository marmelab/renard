# Dockerfile Templates

Note that `${UID}` and `${GID}` refers to [correct user permissions within Docker container](https://github.com/marmelab/renard/blob/master/docker/Usage.md#share-current-user-permissions-in-the-container).

## PostgreSQL

```
# General configuration
db:
    image: postgres:10
    volumes:
        - "/etc/passwd:/etc/passwd:ro"
    expose:
        - "5432"
    user: "${UID}:${GID}"

# Environment related configuration
db:
    volumes:
        - "./var/data:/var/lib/postgresql/data/"
    environment:
        - POSTGRES_USER=admin
        - POSTGRES_PASSWORD=password
        - POSTGRES_DB=admin
```

### Waiting for Up Database

Postgre container would be considered as up by Docker even before the database is correctly initialized. To circumvent the issue, we need to monitor when the database port is opened. It can be done easily via the [wait-for-it.sh](https://github.com/vishnubob/wait-for-it) script:

```
$(DOCKER_COMPOSE) "/app/var/wait-for-it.sh -h db -p 5432 -t 30 && echo 'OK'"
```

It is especially useful for migration purposes.
