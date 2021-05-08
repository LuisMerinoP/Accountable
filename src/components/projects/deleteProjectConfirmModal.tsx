import { BaseSyntheticEvent, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { IFirebaseProject } from './../../store/types/projectTypes'

const DeleteConfirm = ( props : { project: IFirebaseProject, deleteCallback: (project: IFirebaseProject) => void }) => {
  let modalRef = useRef(null);
  useEffect(() => {
    const modal = modalRef.current
    if (modal){
      M.Modal.init(modal);
    } 
  });

  const onDeleteConfirmation = (e:BaseSyntheticEvent) => {
    e.preventDefault();
    props.deleteCallback(props.project);
    console.log('project deleted');
  }

  return (
    <div>
      {/* <a className="btn-floating modal-trigger" href="#modal1"><i className="material-icons right">delete</i></a> */}
      <button className="material-icons right" onClick={(e) => {
        e.preventDefault(); 
        //props.deleteCallback(props.project);
        const modal = modalRef.current
        if (modal) M.Modal.getInstance(modal).open();
      }}>delete</button>
      <div id="modal1" className="modal" ref={modalRef}>
        <div className="modal-content">
          <h4>Delete confirmation</h4>
          <p>Are you sure you want to delete your project?</p>
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-close waves-effect waves-red btn-flat" onClick={onDeleteConfirmation}>OK</a>
          <Link to='/'>
            <a href="#!" className="modal-close waves-effect waves-green btn-flat">CANCEL</a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirm;