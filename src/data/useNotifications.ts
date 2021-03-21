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

const useNotifications = ():INotification[] | undefined => {
  const [notifications, setNotifications] = useState<INotification[] | undefined>();
  useEffect(() => {
    let data:INotification[] = [];
    const unsubscribe = firebase
      .firestore()
      .collection('notifications')
      .orderBy('time')
      .limitToLast(3)
      .onSnapshot((snapshot) => {
        fillNotifsIn(snapshot, data);
        const notifications = [...data]
        setNotifications(notifications);//set projects state
      });

    return () => {
      unsubscribe();
    }
  }, []);

  return notifications;

}

export default useNotifications;