/*
0 - Get a user
1 - Get user's phone number by their id
2 - Get user's address by their id
*/
// Import a internal nodejs module
const util = require('util');
// To use promisify the function must follow the callback pattern -> first argument is error and second argument is data itself.
const getAddressAsync = util.promisify(getAddress);

function getUser() {
  // when something goes wrong -> reject
  // success -> resolve  
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(() => {
      // return reject(new Error('Something really bad happened'));

      return resolve({
        id: 1,
        name: 'John',
        birthDate: new Date(),
      });
    }, 1000);
  })
};

// Callbacks for convention is the last argument
function getPhoneNumber(userId) {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        phoneNumber: '123456789',
        ddd: 41
      })
    }, 2000);
  })
}

function getAddress(userId, callback) {
  setTimeout(() => {
    return callback(null, {
      street: 'dos bobos',
      number: 0,
    });
  }, 2000)
}

// First step add async word before the function -> It'll return a promise function 
main()
async function main() {
  try {
    console.time('promise-measure');
    const user = await getUser();
    // const phoneNumber = await getPhoneNumber(user.id);
    // const address = await getAddressAsync(user.id);

    // More performative
    const result = await Promise.all([
      getPhoneNumber(user.id),
      getAddressAsync(user.id)
    ]);
    const address = result[1];
    const phoneNumber = result[0];

    console.log(`
      Name: ${user.name}
      PhoneNumber: (${phoneNumber.ddd}) ${phoneNumber.phoneNumber}
      Address: ${address.street}, ${address.number}
    `);
    console.timeEnd('promise-measure');
  } catch (error) {
    console.error("Something went wrong", error);
  }
}

// const userPromise = getUser()
// // To manipulate the success we use .then
// // To manipulate the error we use .catch
// // User -> phoneNumber -> phoneNumber
// userPromise
//   .then(function (user) {
//     return getPhoneNumber(user.id)
//       .then(function resolvePhoneNumber(result) {
//         return {
//           user: {
//             name: user.name,
//             id: user.id,
//           },
//           phoneNumber: result,
//         }
//       })
//   })
//   .then(function (result) {
//     const address = getAddressAsync(result.user.id);
//     return address.then(function resolveAddress(address) {
//       return {
//         user: result.user,
//         phoneNumber: result.phoneNumber,
//         address: address
//       }
//     })
//   })
//   .then(function (result) {
//     console.log(`
//       Name: ${result.user.name}
//       Address: ${result.address.street}, ${result.address.number}
//       Phone: (${result.phoneNumber.ddd}) ${result.phoneNumber.phoneNumber}
//     `);
//   })
//   .catch(function (error) {
//     console.error("Something went wrong", error);
//   });


