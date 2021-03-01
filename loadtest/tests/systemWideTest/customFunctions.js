const fetch = require("node-fetch");

const LOGINSERVICE_URL =
process.env["LOGINSERVICE_URL"] ?? "http://localhost:5005";
const LOGINSERVICE_REGISTER_ROUTE =
LOGINSERVICE_URL + "/authentication/register";

function login(userContext, events, done) {
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

const packageServiceEndpoint = "http://localhost:9001/packages";

async function createFakePackage(userContext, events, done) {
    // packages
    const packages = [];
    const fakePackageBody = {
      receiverAddress: "Odense Banegård",
      receiverName: "Nicolai Oliver Rasmussen",
      receiverEmail: "fakeEmail@gmail.com",
      fakeScenario: true,
      senderAddress: "Høgevej 25, 8210 Aarhus",
      senderName: "KARL FASHION",
      weightKg: 2,
    };
  
    // Create a package for test purposes. This is not a package service test, so we don't want to load test it by creating a large amount of packages
    const response = await fetch(packageServiceEndpoint + "/inroute", {
      method: "post",
      body: JSON.stringify(fakePackageBody),
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());
  
    const packageID = response.packageID;
  
    await fetch(packageServiceEndpoint, {
      method: "post",
      body: JSON.stringify({
        packageIDs: [
          packageID
        ],
        driverID: userContext.vars.driverID,
        fakeScenario: true
      }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());
  
    subscripablePackages.push(packageID);
  
    return done();
  }