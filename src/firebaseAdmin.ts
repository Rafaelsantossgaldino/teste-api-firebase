import admin from 'firebase-admin';
import serviceAccount from './serviceKey.json';
require('dotenv').config();

const firebaseAdminApp = admin.apps.length === 0 ? admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: process.env.DATABASE_URL,
}) : admin.app();

export default firebaseAdminApp;