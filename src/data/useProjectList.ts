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
    } else if (change.type === "modified") {
      const updatedProjId = change.doc.id
      const index: number = data.findIndex(proj => proj.id === updatedProjId)
      data[index] = {...change.doc.data(), id: updatedProjId } as IFirebaseProject
    }
  });

  //last created first
  data.sort(function(elema, elemb) { 
    return elemb.createdAt.toDate().getTime() - elema.createdAt.toDate().getTime()
  });
}

const useProjectList = (setProjectsCallback:React.Dispatch<React.SetStateAction<IFirebaseProject[] | undefined>>, isUserAuthed: boolean): IFirebaseProject[] | undefined => {
  const [projects, setProjects] = useState<IFirebaseProject[] | undefined>();
  const userId = firebase.auth().currentUser?.uid;
  useEffect(() => {
    if (isUserAuthed) {
      let data:IFirebaseProject[] = [];
      const unsubscribe = firebase
        .firestore()
        .collection('projects')
        .where("authorId", "==", userId)
        .onSnapshot((snapshot) => {
          fillFbDataIn(snapshot, data);
          const projects = [...data]
          setProjects(projects);//set projects state
          setProjectsCallback(projects);
        });
      return () => {
        unsubscribe();
      }
    }
  }, [setProjectsCallback, isUserAuthed, userId]);

  return projects;
}

export default useProjectList;
