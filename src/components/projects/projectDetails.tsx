import { IFirebaseProject } from '../../store/types/projectTypes';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import firebase from 'firebase/app';
import { useState } from 'react'; 

async function getFbProject(id: string) {
  const db = firebase.firestore();
  const fbDoc = db.collection("projects").doc(id);
  let project = {} as IFirebaseProject;
  await fbDoc.get().then(function(doc) {
      if (doc.exists) {
          console.log("Document data:", doc.data());
          project = { ...doc.data()} as IFirebaseProject;
      } else {
          console.log(`Document does not exist ${id}`);
      }
  }).catch(function(error) {
      console.log(`Error getting document: ${id}`, error);
  });

  return project;
}

function getProjectId():string {
  const pathStr = window.location.pathname.toString();
  const parts = pathStr.split("/");
  const projStrIndex = parts.indexOf('project');
  const projectId = parts[projStrIndex + 1];
  return projectId;
}

const ProjectDetails = ({ project }: { project: IFirebaseProject } | { project: undefined }) => {
  const [stateProject, setStateProject] = useState<IFirebaseProject | undefined>(project);
  if (!firebase.auth().currentUser) return <Redirect to='/'/>
  if (stateProject) {
    return(
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{stateProject.title}</span>
            <p>
              {stateProject.content}
            </p>
          </div>
          <div className="card-action grey lighten-4">
            <div>{stateProject.authorFirstName} {stateProject.authorLastName}</div>
            <div>{moment(stateProject.createdAt.toDate()).calendar()}</div>
          </div>
        </div>
      </div>
    )
  } else {
    //fetch project
    const projectId = getProjectId();
    getFbProject(projectId).then((project) => { 
      if (project) {
        setStateProject(project);
      }
    });

    return(
      <div>
        <p> Loading project... </p>
      </div>
    )
  }
}

export default ProjectDetails;