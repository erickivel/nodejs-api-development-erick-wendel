import EventEmitter from 'events';

class MyEmitter extends EventEmitter {

}

const myEmitter = new MyEmitter();
const eventName = 'user:click';
myEmitter.on(eventName, function (click) {
  console.log('A user clicked', click);
});

// myEmitter.emit(eventName, 'in the scroll bar');
// myEmitter.emit(eventName, 'in the ok');

// let count = 0;
// setInterval(() => {
//   myEmitter.emit(eventName, 'in the ok' + count++);
// }, 1000);

const stdin = process.openStdin();
function main() {
  return new Promise((resolve, reject) => {
    stdin.addListener('data', (value) => {
      // console.log(`You typed: ${value.toString().trim()}`);
      return resolve(value);
    });
  });
}

main().then((result) => {
  console.log('result', result.toString());
})