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
    <div className="col s12">
      <div className="project-list">
        { projects && projects.map( project => {
          const path = '/project/' + project.id;
          return (
            <div>
              <Link to={{
                pathname:path 
                }} key={project.id}>
                <ProjectSummary key={project.id} project={project} deleteCallback={projectDelete}/>
              </Link>
            </div>
          )
        })}  
      </div>
    </div>
  )
}

export default ProjectList;