const ICrud = require('./interfaces/InterfaceCrud');

class Postgres extends ICrud {
  constructor() {
    super();
  }

  create(item) {
    console.log('The item was saved on Postgres');
  }
}

module.exports = Postgres;