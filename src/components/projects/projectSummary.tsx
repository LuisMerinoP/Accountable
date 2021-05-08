import { IFirebaseProject } from "../../store/types/projectTypes";
import moment from 'moment';
import DeleteConfirm from './deleteProjectConfirmModal';

const ProjectSummary = ( props : { project: IFirebaseProject, deleteCallback: (project: IFirebaseProject) => void }) => {
  return (
    <div className="card z-depth-0 project-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title ">{props.project.title}</span>
        <p>Posted by The Net Ninja</p>
        <p className="grey-text">{moment(props.project.createdAt.toDate()).calendar()}</p>
        <div className="row">
          <button className="material-icons right" onClick={(e) => {
            e.preventDefault();
            //route to the project config form
          }}>settings</button>
          <DeleteConfirm project={props.project} deleteCallback={props.deleteCallback}/>
        </div>
        <br></br>
      </div>
    </div>
  )
}

export default ProjectSummary;