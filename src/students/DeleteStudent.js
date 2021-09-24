import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import swal from "sweetalert";

export default class DeleteStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student_name: '',
            student_grade: '',
            student_section: '',
            student_mainneed: '',
            student_wave: ''
        }
    }

    componentDidMount() {
        const status = sessionStorage.getItem("logged-in")
        if (!status) {
            this.props.history.push("/")
        }
        axios.get('http://localhost:4000/students/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    student_name: response.data.student_name,
                    student_grade: response.data.student_grade,
                    student_section: response.data.student_section,
                    student_mainneed: response.data.student_mainneed,
                    student_wave: response.data.student_wave
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
    };

    onDelete(event) {
        swal({
            title: "Are you sure you want to delete?",
            text: "Once deleted, you will not be able to recover this data",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
        .then((willDelete) => {
            if (willDelete) {
                axios.post('http://localhost:4000/students/delete/' + this.props.match.params.id)
                .then(res => console.log(res.data));
                swal("The Student Has Been Deleted!", {
                icon: "success",
                });
                this.props.history.push('/success');
            } else {
                swal("Delete Aborted, Student File Intact");
            }
          });
    }

    render() {
        return (
            <div>
                <h1>Delete Student</h1>
                <br />
                <h3 class="text-center">Name: {this.state.student_name}</h3>
                <h3 class="text-center">Grade & Section: {this.state.student_grade + "  " + this.state.student_section}</h3>
                <Button variant="danger" size="lg" onClick={this.onDelete.bind(this)}>Delete</Button>
            </div>
        )
    }
}