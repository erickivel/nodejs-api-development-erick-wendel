const service = require('./service');

Array.prototype.myMap = function (callback) {
  const newMappedArray = [];
  for (let index = 0; index < this.length; index++) {
    const result = callback(this[index], index);
    newMappedArray.push(result);
  }

  return newMappedArray;
}

async function main() {
  try {
    const results = await service.getPeople(`a`);
    // const names = [];

    // results.results.forEach((item) => {
    //   names.push(item.name);
    // });
    // const names = results.results.map((person) => {
    //   return person.name;
    // });

    // const names = results.results.map(person => person.name);

    const names = results.results.myMap((person, index) => {
      return `[${index}] ${person.name}`;
    });

    console.log(names);
  } catch (error) {
    console.error("Something went wrong", error);
  }
}

main();