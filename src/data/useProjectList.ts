import { IFirebaseProject } from '../store/types/projectTypes';
import { useEffect, useState } from 'react';
import firebase from 'firebase/app';

function fillFbDataIn(snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>, data:IFirebaseProject[] ) {
  let changes = snapshot.docChanges();
  changes.forEach(change => {
    if (change.type === "added") {
      data.push({
        id: change.doc.id,
        ...change.doc.data()
      } as IFirebaseProject);
    } else if (change.type === "removed") {
      const removeIndex = data.map(function(project) { return project.id; }).indexOf(change.doc.id);
      data.splice(removeIndex,1);
    }
  });

  //last created first
  data.sort(function(elema, elemb) { 
    return elemb.createdAt.toDate().getTime() - elema.createdAt.toDate().getTime()
  });
}

const useProjectList = (): IFirebaseProject[] | undefined => {
  const [projects, setProjects] = useState<IFirebaseProject[] | undefined>();
  useEffect(() => {
    let data:IFirebaseProject[] = [];
    const unsubscribe = firebase
      .firestore()
      .collection('projects')
      //.orderBy('createdAt')
      // .limitToLast(1)
      .onSnapshot((snapshot) => {
        fillFbDataIn(snapshot, data);
        setProjects([...data]);//set projects state
      });

    return () => {
      unsubscribe();
    }

  }, []);

  return projects;
}


export default useProjectList;
