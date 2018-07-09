# Adding Postgre SQL Database

## Docker Container

We need to persist data from our container to a local volume to persist data through container restarts. This is done using the `volumes` directive.

```yaml
# docker-compose.yml
services:
    db:
        image: postgres:10
        volumes:
            - "/etc/passwd:/etc/passwd:ro"
        expose:
            - "5432"
        user: "${UID}:${GID}"

# docker-compose.dev.yml
services:
    db:
        volumes:
            - "./var/db:/var/lib/postgresql/data/"
        environment:
            - POSTGRES_DB=[myproject]
            - POSTGRES_USER=[myproject]
            - POSTGRES_PASSWORD=password

# docker-compose.staging.yml
services:
    db:
        volumes:
            - "/home/ubuntu/[myproject]/data:/var/lib/postgresql/data/"
        environment:
            - POSTGRES_DB=[myproject]
            - POSTGRES_USER=[myproject]
            - POSTGRES_PASSWORD
```

We fixed permissions via the `user` option. Our local UID doesn't necessarily match an existing PID in the container. But, PSQL initialization scripts require a valid user in order to boot up correctly. That's why we need to share the `/etc/passwd` file with our container (in read-only for security reasons).

## Setting Up Migrations

We use [db-migrate](https://github.com/db-migrate/node-db-migrate) to handle migrations.

```js
npm install --save db-migrate db-migrate-pg

yarn add db-migrate db-migrate-pg
```

### Configuration

First, we need to add all the DB related configuration parameters into our configuration manager:

```js
const config = convict({
  // ...
  db: {
    host: {
      format: String,
      default: "db",
      env: "POSTGRES_HOST"
    },
    user: {
      format: String,
      default: "[myproject]",
      env: "POSTGRES_USER"
    },
    password: {
      format: String,
      default: "",
      env: "POSTGRES_PASSWORD"
    },
    database: {
      format: String,
      default: "[myproject]",
      env: "POSTGRES_DATABASE"
    },
    schema: {
      format: String,
      default: "[myproject]",
      env: "POSTGRES_SCHEMA"
    }
  }
});
```

Then, use this configuration within a `database.js` file:

```js
const config = require("./config");

module.exports = {
  api: {
    driver: "pg",
    ...config.db
  }
};
```

### Using Migrations

Here are some useful migration `Makefile` targets to handle migrations:

```
DB_MIGRATE = $(DOCKER_COMPOSE) run --rm --no-deps api sh -c "./node_modules/.bin/db-migrate \
	--config=database.js \
	--migrations-dir=migrations \
	-e api

migration:
	$(DB_MIGRATE) up"

migration-new: ## make create-migration MIGRATION_TITLE=whatever-title
	$(DB_MIGRATE) create ${MIGRATION_TITLE}"

migration-down: ## make create-migration NB_MIGRATIONS=2
	$(DB_MIGRATE) down -c ${NB_MIGRATIONS}"
```

### Connecting to PSQL

Connecting on our PSQL server is quite straightforward if we add the following target to our `Makefile`:

```
psql:
	$(DOCKER_COMPOSE) exec db sh -c "psql --host=localhost --username=[myproject] [myproject]"
```
