import ProjectSummary from './projectSummary';
import { IFirebaseProject } from '../../store/types/projectTypes';
import { Link } from 'react-router-dom';
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
      // console.log('ADDED', {...change.doc.data()});
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

const ProjectList = () => {
  const [projects, setProjects] = useState<IFirebaseProject[]>([] as IFirebaseProject[]);
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

  const projectDelete = (project: IFirebaseProject ) => {
    const db = firebase.firestore();
    db.collection('projects')
      .doc(project.id)
      .delete().then(() => {
        console.log('DELETED')
      }).catch((err) => {
        console.log("Error deleting project from remote database")
    });
  }

  return(
    <div className="project-list section">
      { projects && projects.map( project => {
        return (
          <Link to={'/project/' + project.id} key={project.id}>
            <ProjectSummary project={project} deleteCallback={projectDelete}/>
          </Link>
        )
      })}  
    </div>
  )
}

export default ProjectList;