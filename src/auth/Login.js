import React, { Component } from "react";
import axios from "axios"
import swal from "sweetalert";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            password_column: "password"
        }
    }
    
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        console.log("bruh")
        axios.post('http://localhost:4000/auth/login', {username: this.state.username, password: this.state.password})
            .then(response => {
                const status = response.data;
                this.setState({
                    password: ''
                })
                if (status == "User Not Found"){
                    swal("User Not Found", "Try Again", {
                        icon: "error",
                    });
                } else if (status == "Password Wrong"){
                    swal("Incorrect Password", "Try Again", {
                        icon: "error",
                    });
                } else {
                    sessionStorage.setItem("logged-in", "true")
                    this.props.history.push("/list")
                }
            })
            .catch(function (error){
                console.log(error);
            })
    }

    handleChangeChk(e) {
        const current = this.state.password_column;
        if ((current === "text")) {
            this.setState({
                password_column: "password"
            })
        } else {
            this.setState({
                password_column: "text"
            })
        }
    }

    render() {
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                <form>
                    <h3>Sign In</h3>

                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" placeholder="Enter username" onChange={this.onChangeUsername.bind(this)} />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type={this.state.password_column} className="form-control" placeholder="Enter password" value={this.state.password} onChange={this.onChangePassword.bind(this)} />
                    </div>

                    <input type="checkbox" onChange={this.handleChangeChk.bind(this)} /> Show Password

                    <br />
                    <br />

                    <button type="submit" className="btn btn-primary btn-block" onClick={this.onSubmit.bind(this)}>Log In</button>
                </form>
            </div>
        </div>
        );
    }
}