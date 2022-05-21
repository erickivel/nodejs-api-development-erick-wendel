const { readFile, writeFile } = require('fs');

const { promisify } = require('util');

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

// Another way to get json data:
// const jsonData = require('./heroes.json');

class Database {
  constructor() {
    this.FILE_NAME = 'heroes.json'
  }

  async getFileData() {
    const file = await readFileAsync(this.FILE_NAME, 'utf8');
    return JSON.parse(file.toString());
  }

  async writeFile(data) {
    await writeFileAsync(this.FILE_NAME, JSON.stringify(data))
    return true;
  }

  async register(hero) {
    const data = await this.getFileData();
    const id = hero.id <= 2 ? hero.id : Date.now();

    const heroWithId = {
      id,
      ...hero,
    };

    const finalData = [
      ...data,
      heroWithId,
    ]
    const result = await this.writeFile(finalData);
    return result;
  }

  async list(id) {
    const data = await this.getFileData();
    const filteredData = data.filter(item => (id ? (item.id === id) : true));

    return filteredData;
  };

  async remove(id) {
    if (!id) {
      return await this.writeFile([]);
    }

    const data = await this.getFileData();
    const index = data.findIndex(item => item.id === parseInt(id));

    if (index === -1) {
      throw Error("The hero provided doesn't exist");
    }

    data.splice(index, 1);
    return await this.writeFile(data);
  }

  async update(id, modifications) {
    const data = await this.getFileData();
    const index = data.findIndex(item => item.id === parseInt(id));

    if (index === -1) {
      throw Error("The hero provided doesn't exist");
    }

    const actual = data[index];
    const updatedObject = {
      ...actual,
      ...modifications
    }

    data.splice(index, 1);

    return await this.writeFile([
      ...data,
      updatedObject
    ]);
  }
}

module.exports = new Database();