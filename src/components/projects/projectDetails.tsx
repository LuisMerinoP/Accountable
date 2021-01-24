const ProjectDetails = (props:any) => {
  const id = props.match.params.id;
  return(
    <div className="container section project-details">
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">Project Title - {id}</span>
          <p>
            I am looking for help concerning a little Unity3D problem I am facing. I am quite new to Unity, so there might be concepts I am ignorant of. I am running 2020.2.1f1.
            If have a player character with a non-kinematic rigidbody that is being moved by pushing it along a lat ground with RigidBody.AddRelativeForce(). In the rigidbody's constraints section, I froze the X and Z rotation to keep it from falling over. This movement seems to work pretty well.
          </p>
        </div>
        <div className="card-action grey lighten-4">
          <div>Posted by Luis Metino</div>
          <div>2n sept 2AM</div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails;