import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { INotification } from './../../functions/src/index';

//TODO: notif autoclean in database from determined point in time on

function fillNotifsIn(snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>, data:INotification[]) {
  let changes = snapshot.docChanges();
  changes.forEach(change => {
    if (change.type === "added") {
      data.push({
        ...change.doc.data()
      } as INotification);
    } 
  });

  //last created first
  data.sort(function(elema, elemb) { 
    return elemb.time.toDate().getTime() - elema.time.toDate().getTime()
  });
}

async function checkForNotifClean(docsToKeep:firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) {
  const db = firebase.firestore();
  const notifCollection = db.collection('notifications')
  const allData = await notifCollection.get();
  allData.docs.forEach(doc => {
    const filtered = docsToKeep.docs.filter(entry => entry.id === doc.id); 
    const needsErase = filtered.length === 0;
    if (needsErase) {
      const id = doc.id; 
      notifCollection.doc(id).delete();
    }
  })
}

const useNotifications = ():INotification[] | undefined => {
  const [notifications, setNotifications] = useState<INotification[] | undefined>();
  useEffect(() => {
    let data:INotification[] = [];
    const unsubscribe = firebase
      .firestore()
      .collection('notifications')
      .orderBy('time')
      .limitToLast(6)
      .onSnapshot((snapshot) => {
        fillNotifsIn(snapshot, data);
        const notifications = [...data]
        setNotifications(notifications);//set projects state
        checkForNotifClean(snapshot);
      });

    return () => {
      unsubscribe();
    }
  }, []);

  return notifications;

}

export default useNotifications;