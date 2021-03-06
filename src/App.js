import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Login from './pages/Login';
import TrainerReg from './pages/TrainerRegistration';
import BranchReg from './pages/BranchRegistration';
import BranchIndex from './pages/BranchIndex';
import RR from './pages/RequestForReplacementOld'
import AdminParameters from './pages/AdminParameres';
import BranchParameters from './pages/BranchParameter';
import AA from './pages/BranchRegistration copy';
import BranchMatches from './pages/BranchMatchesRequest';
import RequestForReplacement from './pages/RequestForReplacement'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AdminParameres from './pages/AdminParameres';
import Test from './pages/TrainerRegistration copy';

function App() {
  return (
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/TrainerReg" component={TrainerReg} />
            <Route path="/BranchReg" component={BranchReg} />
            <Route path="/RequestForReplacement" component={RequestForReplacement} />
            <Route path="/BranchIndex" component={BranchIndex} />
            <Route path="/BranchParameters" component={BranchParameters} />
            <Route path="/BranchMatches" component={BranchMatches} />
            <Route exact path='/' component={Login} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;