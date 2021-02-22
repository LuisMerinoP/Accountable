import { BrowserRouter, Switch } from 'react-router-dom';
import { Route } from 'react-router';
import NavBar from './components/layout/navbar';
import Dashboard from './components/dashboard/dashboard';
import ProjectDetails from './components/projects/projectDetails';
import SignIn from './components/auth/signIn';
import SignUp from './components/auth/signUp';
import CreateProject from './components/projects/createProject';
import { IFirebaseProject } from './store/types/projectTypes';
import { Location } from 'history';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path='/' component={Dashboard}/>
          <Route
            path='/project/:id'
            render={({ location }: {location: Location<{project: IFirebaseProject}>})  => {
                const { state } = location;
                return <ProjectDetails project={state.project} />
            }}
          />
          <Route path='/signin' component={SignIn}/>
          <Route path='/signup' component={SignUp}/>
          <Route path='/create' component={CreateProject}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
