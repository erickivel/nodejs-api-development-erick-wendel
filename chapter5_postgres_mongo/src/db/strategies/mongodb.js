const ICrud = require('./interfaces/InterfaceCrud');

class MongoDB extends ICrud {
  constructor() {
    super();
  }

  create(item) {
    console.log('The item was saved on MongoDB');
  }
}

module.exports = MongoDB;