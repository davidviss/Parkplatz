const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.addFieldsToDatabase = functions.auth.user().onCreate(async (user) => {
  const { uid, displayName } = user;
  const db = admin.database();
  const userRef = db.ref(`users/${uid}`);
  const userValue = await userRef.once("value");

  if (!userValue.exists()) {
    // Add the desired fields to the user node in the database.
    await userRef.update({
      username: displayName,
      value: 1,
    });
  }
});
// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
