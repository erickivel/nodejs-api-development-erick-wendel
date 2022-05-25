// Mongo Commands

//Update User (must be logged with admin user)
db.updateUser("erickivel", {
  roles: [
    { role: "dbOwner", db: "heroes" }
  ]
})

//  Show databases
show dbs

//  Use a specific database
use heroes

//  Show Collections
show collections

db.heroes.find()
db.heroes.find().pretty()

for (let i = 0; i <= 10000; i++) {
  db.heroes.insert({
    name: `Clone-${i}`,
    power: 'velocity',
    birthDate: '1998-01-08'
  })
}

db.heroes.count()
db.heroes.findOne()
db.heroes.find().limit(100).sort({ name: -1 })
db.heroes.find(), { power: 1, _id: 0 }

// Create
db.heroes.insert({
  name: 'Flash',
  power: 'velocity',
  birthDate: '1998-01-08'
})

// read
db.heroes.find()

// update
db.heroes.update({ _id: ObjectId("628d071a1fa5bd5a4c8d9f8f") }, {
  name: 'Wonder Woman'
})
db.heroes.update({ _id: ObjectId("628d07b01fa5bd5a4c8da377") },
  { $set: { name: 'Green Lantern' } })

// delete
// All items
db.heroes.remove({});
// specific items
db.heroes.remove({ name: 'Flash' });