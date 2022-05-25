const Mongoose = require('mongoose');

Mongoose.connect('mongodb://erickivel:mysecretpass@localhost:27017/heroes', {}
  , (error) => {
    if (!error) return;

    console.log('Connection Failed!', error);
  });

const connection = Mongoose.connection;

connection.once("open", () => {
  console.log('Mongodb is running...');
})

// const state = connection.readyState;
// console.log('state', state);

const heroSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  power: {
    type: String,
    required: true,
  },
  insertedAt: {
    type: Date,
    default: new Date(),
  }
});

const model = Mongoose.model('hero', heroSchema);

async function main() {
  const resultRegister = await model.create({
    name: 'Batman',
    power: 'Money'
  });

  console.log('result register', resultRegister)

  const listItems = await model.find();
  console.log('items', listItems);
}

main();