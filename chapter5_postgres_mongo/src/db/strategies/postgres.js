const { Sequelize, DataTypes } = require('sequelize');

const ICrud = require('./interfaces/InterfaceCrud');

class Postgres extends ICrud {
  constructor() {
    super();
    this.driver = null;
    this._heroes = null;
  }

  async isConnected() {
    try {
      await this._driver.authenticate();
      return true;
    } catch (error) {
      console.log('Fail', error);
      return false;
    }
  }

  async defineModel() {
    this._heroes = this._driver.define('heroes', {
      id: {
        type: DataTypes.INTEGER,
        required: true,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        required: true,
      },
      power: {
        type: DataTypes.STRING,
        required: true,
      }
    }, {
      tableName: 'TB_HEROES',
      freezeTableName: false,
      timestamps: false,
    });

    await this._heroes.sync();
  }

  async connect() {
    this._driver = new Sequelize(
      'heroes',
      'erickivel',
      'supersecret',
      {
        host: 'localhost',
        dialect: 'postgres',
        quoteIdentifiers: false,
        operatorsAliases: false,
      }
    )
    await this.defineModel();
  }

  async create(item) {
    const { dataValues } = await this._heroes.create(item);
    return dataValues;
  }

  read(item = {}) {
    return this._heroes.findAll({
      where: item,
      raw: true,
    });
  }

  update(id, item) {
    return this._heroes.update(item, {
      where: { id }
    })
  }

  delete(id) {
    const query = id ? { id } : {};
    return this._heroes.destroy({ where: query });
  }
}

module.exports = Postgres;