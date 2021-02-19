const { v4: uuidv4 } = require("uuid");
const fetch = require("node-fetch");

const LOGINSERVICE_URL =
  process.env["LOGINSERVICE_URL"] ?? "http://localhost:5005";
const LOGINSERVICE_LOGIN_ROUTE = LOGINSERVICE_URL + "/authentication/login";
const LOGINSERVICE_REGISTER_ROUTE =
  LOGINSERVICE_URL + "/authentication/register";
const routename = process.env.ROUTENAME ?? "route1";

module.exports = { setupData, login, getCoordinate, getPackageID };

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
/*
  Used to login as a driver and get a JWT for authorization
  If the driver does not have a user yet they are registered
*/
async function login(userContext, events, done) {
  const body = { username: makeid(16), password: "RandomPassword1." };
  try {
    let response = await fetch(LOGINSERVICE_LOGIN_ROUTE, {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());

    if (response.statusCode !== 200) {
      // Try to register
      response = await fetch(LOGINSERVICE_REGISTER_ROUTE, {
        method: "post",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());

      if (response.statusCode !== 201) {
        throw new Error("ERROR - Could not create a new user");
      }
    }

    userContext.vars.token = response.token;
    done();
  } catch (error) {
    console.log(error);
  }
}

const routes = require("../routes.json");

/*
  Used to create an array of packages which the driver will simulate 
  delivering during the route
*/
function setupData(userContext, events, done) {
  // packages
  const packages = [];
  // Create package uuids which in the real world would be generated somewhere else
  for (var i = 0; i < 100; i++) {
    packages.push(uuidv4());
  }

  userContext.vars.packages = packages;

  // User can subscribe to one package for each driver. No more is needed for a realistic test scenario
  subscripablePackages.push(packages[0]);

  return done();
}

const routeCoordinates = routes[routename]["coordinates"];
let routeCounter = 0;

/*
  Used to get the next coordinate in the drivers route
  If the driver is done with the route, the route just starts over
*/
function getCoordinate(userContext, events, done) {
  if (routeCounter >= routeCoordinates.length) {
    routeCounter = 0; // reset back to start of route
  }
  let coordinate = routeCoordinates[routeCounter++];

  userContext.vars.coordinate = coordinate;

  return done();
}

// Will fill up with package ids (uuid), one package for each driver registered
const subscripablePackages = [];

/*
  Used to subscribe to a drivers location for a realistic user scenario
*/
async function getPackageID(userContext, events, done) {
  try {
    let packageID;
    while (true) {
      // a random package chosen from subscripablePackages which the client will use to subscribe to a driver
      // A random number from 0 to and including length - 1
      const randomIndex = Math.floor(
        Math.random() * Math.floor(subscripablePackages.length)
      );
      packageID = subscripablePackages[randomIndex];
      if (!packageID) {
        // Sleep 1 second
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } else {
        userContext.vars.packageID = packageID;
        return done();
      }
    }
  } catch (error) {
    console.log(error)
  }
}

// getPackageID(null, null, null)
