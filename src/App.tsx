import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './components/layout/navbar';
import Dashboard from './components/dashboard/dashboard';
import ProjectDetails from './components/projects/projectDetails';
import SignIn from './components/auth/signIn';
import SignUp from './components/auth/signUp';
import CreateProject from './components/projects/createProject';
//import firebase from 'firebase/app';
// import { RouteComponentProps } from 'react-router-dom';
import { IFirebaseProject } from './store/types/projectTypes';
import { Location } from 'history';
//import {match} from 'react-router';
//import { StaticContext } from 'react-router'
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   RouteComponentProps
// } from "react-router-dom";
//import { RouteProps } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path='/' component={Dashboard}/>
          <Route
            path='/project/:id'
            render={({ location }: { location: Location<{ project: IFirebaseProject }> }) => {
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
