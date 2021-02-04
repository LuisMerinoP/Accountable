import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './store/reducers/rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import { createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
//import * as firebase from 'firebase'
import { reduxFirebase as rfConfig } from './config/fbConfig';
import firebase from 'firebase/app';

const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk),
  )
);

const rrfProps = {
  firebase,
  config: rfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}

firebase.auth().onAuthStateChanged((user) => {
  ReactDOM.render(
    <React.StrictMode>
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <App />
        </ReactReduxFirebaseProvider>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
});



// firebase.auth().onAuthStateChanged((user) => {
//   ReactDOM.render(
//     <Provider store={store}>
//       <ReactReduxFirebaseProvider {...rrfProps}>
//         <App />
//       </ReactReduxFirebaseProvider>
//     </Provider>, 
//     document.getElementById('root'));
//   }
// );



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
