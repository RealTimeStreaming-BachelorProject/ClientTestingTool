const { v4: uuidv4 } = require("uuid");
const fetch = require("node-fetch");

const LOGINSERVICE_URL =
  process.env["LOGINSERVICE_URL"] ?? "http://192.168.50.65:5005";
const LOGINSERVICE_LOGIN_ROUTE = LOGINSERVICE_URL + "/authentication/login";
const LOGINSERVICE_REGISTER_ROUTE =
  LOGINSERVICE_URL + "/authentication/register";
const routename = process.env.ROUTENAME ?? "route1";

module.exports = { setupData, login, getCoordinate };

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

async function login(userContext, events, done) {
  const body = { username: makeid(16), password: "RandomPassword1." };

  let response = await fetch(LOGINSERVICE_LOGIN_ROUTE, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());

  if (response.statusCode !== 200) {
    // Try to register
    const registerResponse = await fetch(LOGINSERVICE_REGISTER_ROUTE, {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());

    if (registerResponse.statusCode !== 201) {
      throw new Error("ERROR - Could not create a new user");
    }
    response = await fetch(LOGINSERVICE_LOGIN_ROUTE, {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());

    if (response.statusCode !== 200) {
      throw new Error("ERROR - Could still not login after user registering");
    }
  }

  userContext.vars.token = response.token;
  done();
}

const routes = require("./routes.json");



function setupData(userContext, events, done) {
  // packages
  const packages = [];
  // Create package uuids which in the real world would be generated somewhere else
  for (var i = 0; i < 100; i++) {
    packages.push(uuidv4());
  }

  userContext.vars.packages = packages;
  userContext.vars.namespaceTest = "/localhost:5002/drivers";

  return done();
}

const routeCoordinates = routes[routename]["coordinates"];
let routeCounter = 0;

function getCoordinate(userContext, events, done) {
  if (routeCounter >= routeCoordinates.length) {
    routeCounter = 0; // reset back to start of route
  }
  let coordinate = routeCoordinates[routeCounter++];

  userContext.vars.coordinate = coordinate;

  return done();
}
