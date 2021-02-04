import ProjectSummary from './projectSummary';
import { IProjectState } from '../../store/types/projectTypes';
import { Link } from 'react-router-dom';

const ProjectList = (props: IProjectState) => {
  return(
    <div className="project-list section">
      { props.projects && props.projects.map(project => {
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