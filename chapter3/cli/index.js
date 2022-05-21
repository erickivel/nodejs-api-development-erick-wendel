const { program } = require('commander');
const Database = require('./database');
const Hero = require('./hero');

async function main() {
  program
    .version('v1')
    .option('-n, --name [value]', "Hero Name")
    .option('-p, --power [value]', "Hero Power")
    .option('-i, --id [value]', "Hero id")

    .option('-r, --register', "Register a hero")
    .option('-l, --list', "List all heroes")
    .option('-e, --remove', "Remove a hero by id")
    .option('-u, --update [value]', "Update a hero by id")
    .parse(process.argv)

  program.parse();
  const options = program.opts();

  const hero = new Hero(options);

  try {
    if (options.register) {
      delete hero.id;

      const result = await Database.register(hero);
      if (!result) {
        console.error('Hero was not registered!');
        return;
      }
      console.log('Hero was successfully registered!');
    }

    if (options.list) {
      const result = await Database.list();
      console.log(result);
      return;
    }

    if (options.remove) {
      const result = await Database.remove(hero.id);
      if (!result) {
        console.error('It was not possible to remove the hero');
        return;
      }

      console.log('Hero was successfully removed!');
      return;
    }

    if (options.update) {
      const idToUpdate = parseInt(options.update);
      // Remove all keys that are undefined
      const data = JSON.stringify(hero);
      const heroUpdate = JSON.parse(data);
      const result = await Database.update(idToUpdate, heroUpdate);

      if (!result) {
        console.error('It was not possible to update hero');
        return;
      }
      console.log("Hero updated successfully");
      return;
    }
  } catch (error) {
    console.error("Something went wrong", error);
  }
}

main();