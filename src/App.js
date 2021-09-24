import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { MDBContainer } from "mdbreact";

import StudentsList from "./students/StudentsList.js";
import ViewStudent from "./students/ViewStudent.js"
import EditStudent from "./students/EditStudent.js";
import AddStudent from "./students/AddStudent.js";
import ReturnHome from "./students/ReturnHome.js";
import DeleteStudent from "./students/DeleteStudent.js";
import ErrorNotFound from "./error404.js"
import EditComments from "./students/EditComments.js"

import LoginPage from "./auth/Login.js"

import logo from "/Users/kshitij/Documents/Code/counsellor-website/src/School Logo_ Vector.png";

class App extends Component {

  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <img src={logo} width="30" height="30" alt=""/> &nbsp; &nbsp;
              <Link to="/" className="navbar-brand">Students Of Determination @ OOW</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav ml-auto">
                <li className="navbar-item">
                  <Link to="/list" className="nav-link">Students</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/add" className="nav-link">Add Student</Link>
                </li>
                <li className="navbar-item test-right">
                  <Link to="/login" className="nav-link">Login</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Switch>
            <Route path="/list" exact component={StudentsList} />
            <Route path="/edit/:id" component={EditStudent} />
            <Route path="/editcomments/:id" component={EditComments} />
            <Route path="/view/:id" component={ViewStudent} />
            <Route path="/add" component={AddStudent} onEnter={this.isAuth}/>
            <Route path="/success" component={ReturnHome} />
            <Route path="/delete/:id" component={DeleteStudent} />
            <Route path="/" component={LoginPage} />
            <Route path="*" component={ErrorNotFound} />
          </Switch>
        </div>
        <div className="footer-copyright text-center py-3">
            <MDBContainer fluid>
              Made by Kshitij Sharma for OOW &copy; {new Date().getFullYear()} 
            </MDBContainer>
          </div>
      </Router>
    );
  }
}

export default App;