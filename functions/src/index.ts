import { firestore } from "firebase-admin";
import * as functions from "firebase-functions";
import admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello accountables!!");
});

interface INotifcation {
  content:string,
  user:string,
  time:firestore.Timestamp
};

const createNotification = (notification:INotifcation) => {
  return admin.firestore().collection('notifications')
    .add(notification)
    .then(doc => console.log('notification added', doc));
};

exports.projectCreated = functions.firestore
  .document('projects/{projectId}')
  .onCreate(doc=>{
  const project = doc.data();
  const notification = {
    content: 'Added a new project',
    user: `${project.authorFirstName} ${project.authorLastName}`,
    time: admin.firestore.FieldValue.serverTimestamp()
  } as INotifcation

  return createNotification(notification);
});

exports.userJoined = functions.auth.user()
  .onCreate(user => {
    return admin.firestore().collection('users')
      .doc(user.uid)
      .get().then(doc => {
        const newUser = doc.data();
        const notification = {
          content: 'Joined the party',
          user: `${newUser?.firstName} ${newUser?.lastName}`,
          time: admin.firestore.FieldValue.serverTimestamp()
        } as INotifcation
        return createNotification(notification);
      })
})





