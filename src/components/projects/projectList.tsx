import ProjectSummary from './projectSummary';
import { IFirebaseProject } from '../../store/types/projectTypes';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';

const ProjectList = ( { projects }: { projects: IFirebaseProject[] | undefined }) => {
  
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
    <div className="project-list">
      { projects && projects.map( project => {
        const path = '/project/' + project.id;
        return (
          <Link to={{
            pathname:path 
            }} key={project.id}>
            <ProjectSummary project={project} deleteCallback={projectDelete}/>
          </Link>
        )
      })}  
    </div>
  )
}

export default ProjectList;