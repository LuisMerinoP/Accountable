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

// function getFromCatched(): IFirebaseProject[] { //TODO: use service worker
//   const projectList: IFirebaseProject[] = [];
//   for (let i = 0; i < localStorage.length; i++) {
//     const key = localStorage.key(i);
//     if (key) {
//       const item = localStorage.getItem(key);
//       if (item){
//         const project = JSON.parse(item) as IFirebaseProject;
//         project.createdAt = new firebase.firestore.Timestamp(
//           project.createdAt.seconds,
//           project.createdAt.nanoseconds
//         );
//         projectList.push(project);
//       }
//     }
//   } 
//   return projectList;
// }

const useProjectList = (setProjectsCallback:React.Dispatch<React.SetStateAction<IFirebaseProject[] | undefined>>): IFirebaseProject[] | undefined => {
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
        const projects = [...data]
        setProjects(projects);//set projects state
        setProjectsCallback(projects);
        localStorage.clear();
        projects.forEach(project => {
          localStorage.setItem(project.id, JSON.stringify(project));
        });
      });

    return () => {
      unsubscribe();
    }
  }, [setProjectsCallback]);

  return projects;
}

export default useProjectList;
