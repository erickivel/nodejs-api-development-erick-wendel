const { getPeople } = require('./service');

Array.prototype.myReduce = function (callback, initialValue) {
  let finalValue = typeof initialValue !== undefined ? initialValue : this[0];
  for (let index = 0; index < this.length; index++) {
    finalValue = callback(finalValue, this[index], this);
  }
  return finalValue;
}

async function main() {
  try {
    const { results } = await getPeople('a');
    const heights = results.map(item => parseInt(item.height));
    // [20.2, 123.6, 34.6] = 0
    console.log("heights: " + heights);
    // const total = heights.reduce((before, next) => {
    //   return before + next;
    // }, 0);

    const myList = [
      ['Eric', 'Kivel'],
      ['NodeBr', 'React']
    ];
    const total = myList.myReduce((before, next) => {
      return before.concat(next);
    }, []).join(', ')

    console.log("Total", total);

  } catch (error) {
    console.error("Something went wrong", error)
  }
}

main();

