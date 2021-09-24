import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

export default class StudentsList extends Component {

    render() {
        return (
            <div>
                <h3 class="text-center">Operation Successful</h3>
                <div class="form-row text-center">
                    <div class="col-12">
                    <Link to="/list"><btn type="button" class="btn btn-outline-success btn-lg text-center" value="Return Home">Return Home</btn></Link>
                    </div>
                </div>
            </div>
        )
    }
}