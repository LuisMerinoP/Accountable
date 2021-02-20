import ProjectSummary from './projectSummary';
import { IFirebaseProject } from '../../store/types/projectTypes';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import firebase from 'firebase/app';

const ProjectList = () => {
  const [projects, setProjects] = useState<IFirebaseProject[]>([] as IFirebaseProject[]);

  useEffect(() => {
    let data:IFirebaseProject[] = [];
    console.log(data);
    const unsubscribe = firebase
      .firestore()
      .collection("projects")
      .onSnapshot((snapshot) => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
          if (change.type === "added") {
            data.push({
              id: change.doc.id,
              ...change.doc.data()
            } as IFirebaseProject);
            console.log('ADDED', {...change.doc.data()});
          } else if (change.type === "removed") {
            // const removeIndex = projects.map(function(project) { return project.id; }).indexOf(change.doc.id);
            // projects.splice(removeIndex, 1);
            const removeIndex = data.map(function(project) { return project.id; }).indexOf(change.doc.id);
            data.splice(removeIndex,1)
            console.log('REMOVED')
          }
        });
        // const fbProjects = changes.map((change) => ({
        //   id: change.doc.id,
        //   ...change.doc.data()
        // }) as IFirebaseProject);
        //fbProjects.forEach( fbProject => data.push(fbProject))

      setProjects([...data]);
      console.log('projects set');  
    });

    return () => {
      unsubscribe();
    }

  }, []);

  const projectDelete = (project: IFirebaseProject ) => {
    //delete from local status
    // const removeIndex = projects.map(function(project) { return project.id; }).indexOf(project.id);
    // projects.splice(removeIndex, 1);
    //delete from firebase
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