import { useState } from 'react';
import firebase from 'firebase/app';

interface IAppointment {
  appointment: firebase.firestore.Timestamp,
  description: string,
  uid: string
}

async function getAppointments() {
  const userId = firebase.auth().currentUser?.uid;
  const appointments:any = null;
  const db = firebase.firestore();
  const query = db.collection("patients");
  query.get().then((querySnapshot) => {
    querySnapshot.docs.forEach((document) => {
      console.log(document);
      const areEqual = document.id.replace(/\s+/g, '') === userId
      if (areEqual) {
        document.ref.collection("appointment").get().then((querySnapshot) => {
          querySnapshot.docs.forEach(appointment => {
            const data  = appointment.data();
            const timeStamp = new firebase.firestore.Timestamp(data.dateTime.seconds, data.dateTime.nanoseconds);
            console.log(timeStamp.toDate());
          });
        });
      }
    });
  });

  // query.doc(userId).get().then(found => console.log(found))








  // await fbDoc.get().then(function(doc) {
  //   if (doc.exists) {
  //     console.log("Exists!!");
  //     console.log(doc.data)
  //   }
  // }).catch(function(error) {
  //   console.log('Error');
  // });

  // await firebase
  //   .firestore()
  //   .collection("patients")
  //   .doc(userId)
  //   // .collection('appointment')
  //   // .orderBy("dateTime", "asc")
  //   .get()
  //   .then(doc => {
  //     // console.log('log1:');
  //     // const data = { ...resp.data }
  //     // console.log(resp);
  //     if (doc.exists) {
  //       console.log("Exists!!");
  //     }
  // });
  return appointments;
}

const AppointmentHandler = () => {
  const [appointments, setAppointMents] = useState([] as IAppointment[]);
  const appointments1 = getAppointments();
  console.log('log2:');
  console.log(appointments);
  return (
    <div>
      Whatever
    </div>
  );

}


export default AppointmentHandler;