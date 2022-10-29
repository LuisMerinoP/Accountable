import { IFirebaseProject } from "../../store/types/projectTypes";
import moment from 'moment';
import DeleteConfirm from './deleteProjectConfirmModal';
import { Link } from 'react-router-dom';
import Toggle from '../toggle/toggle';
import {  useState } from 'react'; 
import firebase from 'firebase/app';  

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

  const onToggleChange = (checked: boolean) => {
    // set checked/unchecked timestamps
    try {
      const db = firebase.firestore();
      if (checked) {
        db.collection('projectTimeStamps').add({
          projectId: props.project.id,
          startWork:firebase.firestore.FieldValue.serverTimestamp(), // fixme: use client timestamp if offline mode
          workstarted: true
          }).then(() => {
            console.log('timestamp recorded to db')
        }).catch((err:Error) => {
            console.log('timestamp record error', err );
        })
      } else {
        db.collection("projectTimeStamps").where("projectId", "==", props.project.id).where("workstarted", "==", true)
          .get()
          .then((snapshot: firebase.firestore.QuerySnapshot) => {
            if (snapshot.docs.length === 1) {
              snapshot.docs[0].ref.update({
                workstarted: false,
                endwork:  firebase.firestore.FieldValue.serverTimestamp() // fixme: use client timestamp if offline mode
              })
            }
          }).then(() => {
          console.log('work end recorded to db')
        });
      }
    } catch (error) {
      console.log(error)
    }
    
    setActive(checked)
  }
  
  return (
    <div className="card z-depth-0 project-summary">
      <div className="card-content grey-text text-darken-3">
        <div className="row">
          <div className="col s12"/>
          <div className="col s6">
          <span className="card-title ">{props.project.title}</span>
          <p>Posted by The Net Ninja</p>
          <p className="grey-text">{moment(props.project.createdAt.toDate()).calendar()}</p>
          <br />
          <br />
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
                  <Toggle id={props.project.id} checked={active} onChange={onToggleChange}/>
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