import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Student = props => (
    <tr>
        <td> <Link to={"/view/"+props.student._id}>{props.student.student_name}</Link></td>
        <td>{props.student.student_grade}</td>
        <td>{props.student.student_section}</td>
        <td>{props.student.student_mainneed}</td>
        <td>{props.student.student_wave}</td>
        <td>
            <Link to={"/edit/"+props.student._id}><FontAwesomeIcon icon={faEdit} /></Link>
        </td>
        <td>
            <Link to={"/delete/"+props.student._id}><FontAwesomeIcon icon={faTrash} style={{ color: 'red'}}/></Link>
        </td>
    </tr>
)

export default class StudentsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inititalStudents: [], 
            students: []};
    }

    componentDidMount() { 
        const status = sessionStorage.getItem("logged-in")
        if (!status) {
            this.props.history.push("/")
        }
        axios.get('http://localhost:4000/students/')
            .then(response => {
                this.setState({ students: response.data, inititalStudents: response.data});
            })
            .catch(function (error){
                console.log(error);
            })
    }

    studentList() {
        const sortedArr = this.state.students.sort((a,b) => a.student_grade - b.student_grade)
        return sortedArr.map(function(currentStudent, i){
            return <Student student={currentStudent} key={i} />;
        })
    }

    filterList = (event) => {
        let items = this.state.inititalStudents;
        items = items.filter((item) => {
          return item.student_name.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
        });
        this.setState({students: items});
      }
  
    render() {
        return (
            <div>
                <h3>Students List</h3>
                <form class="float-right">
                    <input type="text" placeholder="Search" onChange={this.filterList}/>
                </form>
                <br></br>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Grade</th>
                            <th>Section</th>
                            <th>Main Need</th>
                            <th>Wave</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.studentList() }
                    </tbody>
                </table>
            </div>
        )
    }
}