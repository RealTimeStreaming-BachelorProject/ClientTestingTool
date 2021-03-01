const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

const routename = process.env.ROUTENAME ?? "route1";

module.exports = {
  emulateLogin,
  emulateCoordinate,
  getDriverID,
};

/*
  Used to make a random string with a given length with only characters. No numbers
*/
function makeid(length) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const JWT_KEY = "developmentjwtkey";
/*
  Simulates a driver logging in. Creating a fake username and a fake driverID and creating a token with the same key
  that driverservice expects
*/
function emulateLogin(userContext, events, done) {
  const username = makeid(16);
  const driverID = uuidv4();
  const token = jwt.sign({ username, driverID }, JWT_KEY);

  userContext.vars.token = token;
  subscripableDrivers.push(driverID);
  done();
}

const routes = require("./routes.json");

const routeCoordinates = routes[routename]["coordinates"];
let routeCounter = 0;

/*
  Used to get the next coordinate in the drivers route
  If the driver is done with the route, the route just starts over
*/
function emulateCoordinate(userContext, events, done) {
  if (routeCounter >= routeCoordinates.length) {
    routeCounter = 0; // reset back to start of route
  }
  let coordinate = routeCoordinates[routeCounter++];

  userContext.vars.coordinate = coordinate;

  return done();
}

// Will fill up with connected driver ids (uuid)
const subscripableDrivers = [];

/*
  Used to subscribe to a drivers location for a realistic user scenario
*/
async function getDriverID(userContext, events, done) {
  try {
    let driverID;
    while (true) {
      // a random package chosen from subscripablePackages which the client will use to subscribe to a driver
      // A random number from 0 to and including length - 1
      const randomIndex = Math.floor(
        Math.random() * Math.floor(subscripableDrivers.length)
      );
      driverID = subscripableDrivers[randomIndex];
      if (!driverID) {
        // Sleep 1 second
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } else {
        userContext.vars.driverID = driverID;
        return done();
      }
    }
  } catch (error) {
    console.log(error);
  }
}
