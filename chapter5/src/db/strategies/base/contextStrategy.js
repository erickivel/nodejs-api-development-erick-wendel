const ICrud = require('./../interfaces/InterfaceCrud');

class ContextStrategy extends ICrud {
  constructor(strategy) {
    // Parent class constructor
    super();
    this._database = strategy;
  }

  create(item) {
    return this._database.create(item);
  };

  read(query) {
    return this._database.read(query);
  }

  update(id, item) {
    return this._database.update(id, item);
  }

  delete(id) {
    return this._database.delete(id);
  }

  isConnected() {
    return this._database.isConnected();
  }
}

module.exports = ContextStrategy;