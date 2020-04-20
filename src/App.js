import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Login from './pages/Login';
import TrainerReg from './pages/TrainerRegistration';
import BranchReg from './pages/BranchRegistration';
import BranchIndex from './pages/BranchIndex';
import RequestForReplacement from './pages/RequestForReplacement'
import AdminParameters from './pages/AdminParameres';
import BranchParameters from './pages/BranchParameter';
import AA from './pages/BranchRegistration copy';


import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AdminParameres from './pages/AdminParameres';

function App() {
  return (<Router>

    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/TrainerReg" component={TrainerReg} />
            <Route path="/BranchReg" component={AA} />
            <Route path="/RequestForReplacement" component={RequestForReplacement} />
            <Route path="/BranchIndex" component={BranchIndex} />
            <Route path="/BranchParameters" component={BranchParameters} />
            
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;