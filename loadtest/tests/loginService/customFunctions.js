module.exports = {
  generateRandomUsername,
  getRegisteredUserDetails,
  saveUser,
  getUserDetails
};

var registeredUsers = [];

/*
  Used to make a random string with a given length with only characters. No numbers
*/
function generateRandomUsername(userContext, events, done) {
  var result = generateRandomString(12);
  userContext.vars.username = result;
  userContext.vars.password = "FakePassword1.";
  return done();
}

function generateRandomString(length) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

async function getUserDetails(userContext, events, done) {
  while (true) {
    const randomIndex = Math.floor(
      Math.random() * Math.floor(registeredUsers.length)
    );
    var user = registeredUsers[randomIndex];
    if (!user) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      continue;
    }
    
    userContext.vars.username = registeredUsers[randomIndex].username;
    userContext.vars.password = registeredUsers[randomIndex].password;

    return done();
  }
}

async function getRegisteredUserDetails(userContext, events, done) {
  while (true) {
    const randomIndex = Math.floor(
      Math.random() * Math.floor(registeredUsers.length)
    );
    var user = registeredUsers[randomIndex];
    if (!user) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      continue;
    }

    userContext.vars.username = registeredUsers[randomIndex].username;
    userContext.vars.newPassword = generateRandomString(4);

    return done();
  }
}

function saveUser(requestParams, response, context, ee, next) {
  registeredUsers.push({
    username: context.vars.username,
    password: "FakePassword1.",
  });
  next();
}
