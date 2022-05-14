/*
0 - Get a user
1 - Get user's phone number by their id
2 - Get user's address by their id
*/


function getUser(callback) {
  setTimeout(() => {
    // The callback convention is error first then return the data
    return callback(null, {
      id: 1,
      name: 'John',
      birthDate: new Date(),
    });
  }, 1000);
};

// Callbacks for convention is the last argument
function getPhoneNumber(userId, callback) {
  setTimeout(() => {
    return callback(null, {
      phoneNumber: '123456789',
      ddd: 41
    })
  }, 2000);
}

function getAddress(userId, callback) {
  setTimeout(() => {
    return callback(null, {
      street: 'dos bobos',
      number: 0,
    });
  }, 2000)
}

function resolveUser(error, callback) {
  console.log('user', user);
}

getUser(function resolveUser(error, user) {
  // null || "" || 0 === false
  if (error) {
    console.error('Something went wrong in USER');
    return;
  }
  getPhoneNumber(user.id, function resolvePhoneNumber(error1, phoneNumber) {
    if (error1) {
      console.error('Something went wrong in PHONE_NUMBER');
      return;
    }

    getAddress(user.id, function resolveAddress(error2, address) {
      if (error2) {
        console.error('Something went wrong in PHONE_NUMBER');
        return;
      }

      console.log(`
        Name: ${user.name}
        Address: ${address.street}, ${address.number}
        PhoneNumber: (${phoneNumber.ddd}) ${phoneNumber.phoneNumber}
      `)
    })
  });
});

// const phoneNumber = getPhoneNumber(user.id);
// console.log('Phone Number', user);