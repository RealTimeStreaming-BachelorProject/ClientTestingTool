module.exports = { generateRandomUsername };

/*
  Used to make a random string with a given length with only characters. No numbers
*/
function generateRandomUsername(userContext, events, done) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var charactersLength = characters.length;
  for (var i = 0; i < 12; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  userContext.vars.username = result
  return done();
}
