import ProjectSummary from './projectSummary';
import { IFirebaseProject } from '../../store/types/projectTypes';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import useProjectList from '../../data/useProjectList';

const ProjectList = () => {
  const projects = useProjectList();

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
        const path = '/project/' + project.id;
        return (
          <Link to={{
            pathname:path, 
            state: {
              project
            },
          }} key={project.id}>
            <ProjectSummary project={project} deleteCallback={projectDelete}/>
          </Link>
        )
      })}  
    </div>
  )
}

export default ProjectList;