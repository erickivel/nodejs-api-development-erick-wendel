// npm install sequelize pg-hstore pg
const { Sequelize, DataTypes } = require('sequelize');

const driver = new Sequelize(
  'heroes',
  'erickivel',
  'mysecretpass',
  {
    host: 'localhost',
    dialect: 'postgres',
    quoteIdentifiers: false,
    operatorsAliases: false,
  }
)

async function main() {
  const Heroes = driver.define('heroes', {
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
  })

  await Heroes.sync()
  const result = await Heroes.findAll({ raw: true });

  console.log(result);
}

main();