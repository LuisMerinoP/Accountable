import { BrowserRouter, Switch } from 'react-router-dom';
import { Route } from 'react-router';
import NavBar from './components/layout/navbar';
import Dashboard from './components/dashboard/dashboard';
import ProjectDetails from './components/projects/projectDetails';
import SignIn from './components/auth/signIn';
import SignUp from './components/auth/signUp';
import CreateProject from './components/projects/createProject';
import { IFirebaseProject } from './store/types/projectTypes';
import { useState } from 'react';
import useProjectList from './data/useProjectList';

function App() {
  const [projects, setProjects] = useState<IFirebaseProject[] | undefined>(undefined as IFirebaseProject[] | undefined);
  useProjectList(setProjects); //handle projects fetch/catch + listener setProjects

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path='/'
          render={() => (
            <Dashboard
            projects = {projects}
            />
          )}/>
          <Route 
            path='/project/:id' 
            render={(props) => {
              const { id } = props.match.params
              const foundProject = projects?.find((project) => project.id === id);
              return (
              <ProjectDetails
              project = {foundProject!}
              />
            )}}/>
          <Route path='/signin' component={SignIn}/>
          <Route path='/signup' component={SignUp}/>
          <Route path='/create' component={CreateProject}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
