import { firestore } from "firebase-admin";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp(functions.config().firebase);
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello accountables!!");
});

export interface INotification {
  content:string,
  user:string,
  time:firestore.Timestamp
};

const createNotification = (notification:INotification) => {
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
  } as INotification

  return createNotification(notification);
});

const deleteNotification = (notification:INotification) => {
  return admin.firestore().collection('notifications')
    .add(notification)
    .then(doc => console.log('notification added', doc));
};

exports.projectDeleted = functions.firestore
  .document('projects/{projectId}')
  .onDelete(doc=>{
  const project = doc.data();
  const notification = {
    content: 'Project deleted',
    user: `${project.authorFirstName} ${project.authorLastName}`,
    time: admin.firestore.FieldValue.serverTimestamp()
  } as INotification

  return deleteNotification(notification);
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
        } as INotification
        return createNotification(notification);
      })
})
