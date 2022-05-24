const { Sequelize } = require('sequelize');

const ICrud = require('./interfaces/InterfaceCrud');

class Postgres extends ICrud {
  constructor() {
    super();
    this.driver = null;
    this._heroes = null;
    this._connect();
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
    this._heroes = driver.define('heroes', {
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

    await Heroes.sync();
  }

  create(item) {

    console.log('The item was saved on Postgres');
  }

  _connect() {
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
  }
}

module.exports = Postgres;