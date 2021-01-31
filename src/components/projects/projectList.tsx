import ProjectSummary from './projectSummary';
import { IProjectState } from '../../store/reducers/projectReducer';
import { Link } from 'react-router-dom';

const ProjectList = (props: IProjectState) => {
  return(
    <div className="project-list section">
      { props.projects && props.projects.map(project => {
        return (
          <div key={project.id}>
            <Link to={'/project/' + project.id}>
              <ProjectSummary project={project} />
            </Link>
          </div>
        )
      })}  
    </div>
  )
}

export default ProjectList;