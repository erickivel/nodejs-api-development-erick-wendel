# (-p) the first port is the container port and the second one is your pc port

docker run \
  --name erick-wendel-postgres \
  -e POSTGRES_USER=erickivel \
  -e POSTGRES_PASSWORD=supersecret \
  -e POSTGRES_DB=heroes \
  -p 5432:5432 \
  -d \
  postgres

# Show your containers
docker ps

docker exec -it erick-wendel-postgres bin/bash

docker run \
  --name erick-wendel-adminer \
  -p 8080:8080 \
  --link erick-wendel-postgres:erick-wendel-postgres
  -d \
  postgres