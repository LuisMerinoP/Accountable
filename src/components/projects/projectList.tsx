import ProjectSummary from './projectSummary';
import { IFirebaseProject } from '../../store/types/projectTypes';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import firebase from 'firebase/app';

const ProjectList = () => {
  const [projects, setProjects] = useState<IFirebaseProject[]>();
  useEffect(() => {
    let data:IFirebaseProject[] = [];
    firebase
      .firestore()
      .collection("projects")
      .onSnapshot((snapshot) => {
        let changes = snapshot.docChanges();
        // changes.forEach(change => {console.log(change.doc.data())})
        const fbProjects = changes.map((change) => ({
          id: change.doc.id,
          ...change.doc.data()
        }) as IFirebaseProject);
        fbProjects.forEach( fbProject => data.push(fbProject))
        setProjects([...data]);
      });
  }, []);

  return(
    <div className="project-list section">
      { projects && projects.map( project => {
        return (
          <Link to={'/project/' + project.id} key={project.id}>
            <ProjectSummary project={project} />
          </Link>
        )
      })}  
    </div>
  )
}

export default ProjectList;