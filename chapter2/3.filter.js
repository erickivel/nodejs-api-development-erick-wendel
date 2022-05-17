const { getPeople } = require('./service');

/*
  const item = {
    name: "Eic",
    age: 12
  }

  const { name } = item;

  console.log(name);
*/

Array.prototype.myFilter = function (callback) {
  const list = [];
  for (index in this) {
    const item = this[index];
    const result = callback(item, index, this);
    if (!result) continue;
    list.push(item);
  }

  return list;
};

async function main() {
  try {
    const { results } = await getPeople('a');
    // const familyLars = results.filter((item) => {
    //   // needs to return a boolean 
    //   // false -> removes from results
    //   // true -> return item

    //   // doesn't find = -1
    //   // find = array position
    //   const result = item.name.toLowerCase().indexOf(`lars`) !== -1;
    //   return result;
    // });
    const familyLars = results.myFilter((item, index, list) => {
      console.log(`index: ${index}`, list.length);
      return item.name.toLowerCase().indexOf('lars') !== -1
    })

    const names = familyLars.map(person => person.name);
    console.log(names);

  } catch (error) {
    console.error("Something went wrong", error);
  }
}

main();