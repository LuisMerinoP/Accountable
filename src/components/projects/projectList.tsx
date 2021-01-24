import ProjectSummary from './projectSummary';
import { IProjectState } from '../../store/reducers/projectReducer';

const ProjectList = (props: IProjectState) => {
  return(
    <div className="project-list section">
      { props.projects && props.projects.map(project => {
        return (
          <ProjectSummary project={project} key={project.id} />
        )
      })}  
    </div>
  )
}

export default ProjectList;