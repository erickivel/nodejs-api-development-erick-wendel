const Mongoose = require('mongoose');
const ICrud = require('./interfaces/InterfaceCrud');

const STATUS = {
  0: 'Disconnected',
  1: 'Connected',
  2: 'Connecting',
  3: 'Disconnecting'
}

class MongoDB extends ICrud {
  constructor() {
    super();
    this._heroes = null;
    this._driver = null;
  }

  async isConnected() {
    const state = STATUS[this._driver.readyState];
    if (state === 'Connected') return true;

    if (state !== 'Connecting') return state;

    await new Promise(resolve => setTimeout(resolve, 1000));

    return STATUS[this._driver.readyState];
  }

  connect() {
    Mongoose.connect('mongodb://erickivel:mysecretpass@localhost:27017/heroes', {}
      , (error) => {
        if (!error) return;

        console.log('Connection Failed!', error);
      });

    const connection = Mongoose.connection;
    this._driver = connection;

    connection.once("open", () => {
      console.log('Mongodb is running...');
    })

    this.defineModel();

  }

  defineModel() {
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

    this._heroes = Mongoose.model('heroes', heroSchema);
  }

  create(item) {
    return this._heroes.create(item);
  }

  read(item, skip = 0, limit = 10) {
    return this._heroes.find(item).skip(skip).limit(limit);
  }
}

module.exports = MongoDB;