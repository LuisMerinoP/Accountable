import firebase from 'firebase/app';
import {useEffect, useState} from 'react';
import { IFirebaseProject } from '../store/types/projectTypes';

// async function getFbProject(id: string) {
//   const db = firebase.firestore();
//   const fbDoc = db.collection("projects").doc(id);
//   let project = {} as IFirebaseProject;
//   await fbDoc.get().then(function(doc) {
//       if (doc.exists) {
//           console.log("Document data:", doc.data());
//           project = {...doc.data()} as IFirebaseProject;
//       } else {
//           console.log(`Document does not exist ${id}`);
//       }
//   }).catch(function(error) {
//       console.log(`Error getting document: ${id}`, error);
//   });

//   return project;
// }

const useFirebaseProject = (id: string): IFirebaseProject | undefined => {
  const [project, setProject] = useState<IFirebaseProject | undefined>();

  useEffect(() => {
    const get = async () => {
      try {
        const db = firebase.firestore();  
        const fbDoc = await db.collection("projects").doc(id);
        fbDoc.get().then(function(doc) {
          if (doc.exists) {
              console.log("Document data:", doc.data());
              setProject({...doc.data()} as IFirebaseProject);
          } else {
              console.log(`Document does not exist ${id}`);
          }
        }).catch(function(error) {
            console.log(`Error getting document: ${id}`, error);
        });
      } catch (error) {
        console.log(error);
      }
    } 
    get();
  },[id]);

  return project
}

export default useFirebaseProject;