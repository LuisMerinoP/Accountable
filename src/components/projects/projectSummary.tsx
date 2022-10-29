import { IFirebaseProject } from "../../store/types/projectTypes";
import moment from 'moment';
import DeleteConfirm from './deleteProjectConfirmModal';
import { Link } from 'react-router-dom';
import Toggle from '../toggle/toggle';
import {  useState } from 'react'; 

const ProjectSummary = ( props : { project: IFirebaseProject, deleteCallback: (project: IFirebaseProject) => void }) => {
  const [active, setActive] = useState(false);
  let projectActiveString = 'Working on it: ' + active.toString().toUpperCase();
  // fixme: better vertical center alignment based on toggle and label size
  const centerDivStyle = { 
    top: '50%', 
    left: '75%', 
    transform: 'translate(-50%, -50%)', 
    position: 'absolute'
  } as React.CSSProperties
  return (
    <div className="card z-depth-0 project-summary">
      <div className="card-content grey-text text-darken-3">
        <div className="row">
          <div className="col s12"/>
          <div className="col s6">
          <span className="card-title ">{props.project.title}</span>
          <p>Posted by The Net Ninja</p>
          <p className="grey-text">{moment(props.project.createdAt.toDate()).calendar()}</p>
          <div className="center">
            <Link to={{
              pathname:'/create',
              state: props.project
            }} key={props.project.id}  >
            <button className="material-icons right" type="button">settings</button>
            </Link>
            {/* <NavLink className="material-icons right" to='/create'>settings</NavLink> */}
            <DeleteConfirm project={props.project} deleteCallback={props.deleteCallback}/>
          </div>
          </div>
            <div className="col s6">
              <div style={centerDivStyle}>
                <div>
                  <Toggle id={props.project.id} checked={active} onChange={setActive}/>
                </div>
                <div>
                  <label> {projectActiveString} </label>
                </div>
              </div>
          </div>
        </div>
        <br></br>
      </div>
    </div>
  )
}

export default ProjectSummary;