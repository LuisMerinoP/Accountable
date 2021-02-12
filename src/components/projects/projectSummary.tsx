import { IFirebaseProject } from "../../store/types/projectTypes";
import moment from 'moment';

const ProjectSummary = ( prop : { project: IFirebaseProject } ) => {
  return (
    <div className="card z-depth-0 project-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title ">{prop.project.title}</span>
        <p>Posted by The Net Ninja</p>
        <p className="grey-text">{moment(prop.project.createdAt.toDate()).calendar()}</p>
      </div>
    </div>
  )
}

export default ProjectSummary;