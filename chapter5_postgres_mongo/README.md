# (-p) the first port is the container port and the second one is your pc port

POSTGRES

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
  --link erick-wendel-postgres:erick-wendel-postgres \
  -d \
  adminer


MongoDB

docker run \
  --name erick-wendel-mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=supersecret \
  -d \
  mongo:4

docker run \
  --name mongoclient-erick-wendel \
  -p 3000:3000 \
  --link erick-wendel-mongodb:erick-wendel-mongodb \
  -d \
  mongoclient/mongoclient

docker exec -it erick-wendel-mongodb \
  mongo --host localhost -u admin -p supersecret --authenticationDatabase admin \
  --eval "db.getSiblingDB('heroes').createUser({user: 'erickivel', pwd: 'mysecretpass', roles: [{role: 'readWrite', db: 'heroes'}]})"

docker exec -it erick-wendel-mongodb \
  mongo -u erickivel -p mysecretpass --authenticationDatabase heroes


