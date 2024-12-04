const admin = require("firebase-admin");
const { Storage } = require('@google-cloud/storage');

// Path to your service account key (use the correct file path)
const serviceAccount = require("C:/Users/skand/Downloads/drdoapplicationverification-firebase-adminsdk-gpk87-21f6d1194b.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Initialize Google Cloud Storage Client
const storage = new Storage();
const bucket = storage.bucket("id_proofbucket_1");  // Your Cloud Storage bucket

module.exports = { db, bucket };
