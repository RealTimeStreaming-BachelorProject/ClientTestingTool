const { v4: uuid } = require("uuid");
module.exports = { savePackageID, getPackageID, emulateDriverID };

const packageIDs = [];

function savePackageID(requestParams, response, context, ee, next) {
  packageIDs.push(response.body.packageID);
  next();
}

async function getPackageID(userContext, events, done) {
  let packageID;
  while (true) {
    // a random package chosen from subscripablePackages which the client will use to subscribe to a driver
    // A random number from 0 to and including length - 1
    const randomIndex = Math.floor(
      Math.random() * Math.floor(packageIDs.length)
    );
    packageID = packageIDs[randomIndex];
    if (!packageID) {
      // Sleep 1 second
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } else {
      userContext.vars.packageID = [packageID];
      return done();
    }
  }
}

function emulateDriverID(userContext, events, done) {
  userContext.vars.driverID = uuid();
  return done();
}
