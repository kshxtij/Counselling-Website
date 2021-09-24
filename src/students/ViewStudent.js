import React, { Component } from 'react';
import axios from 'axios';
import {ButtonGroup, ToggleButton} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import StarRatingComponent from 'react-star-rating-component';

export default class ViewStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student_name: '',
            student_grade: '',
            student_section: '',
            student_mainneed: '',
            student_wave: '',
            subject: '',
            cycle: '',
            english_comments: [],
            science_comments: [],
            social_comments: [],
            math_comments: []
        }
    }

    onChooseSubject(event) {
        this.setState({
            subject: event.target.value
        });
      }
    
    onChooseCycle(event) {
        this.setState({
            cycle: event.target.value
        });
    }

    componentDidMount() {
        const status = sessionStorage.getItem("logged-in")
        if (!status) {
            this.props.history.push("/")
        }
        this.studentId = this.props.match.params.id
        axios.get('http://localhost:4000/students/' + this.props.match.params.id)
            .then(response => {
                const teachers = JSON.parse(response.data.student_teachers);
                this.setState({
                    student_name: response.data.student_name,
                    student_grade: response.data.student_grade,
                    student_section: response.data.student_section,
                    student_mainneed: response.data.student_mainneed,
                    student_wave: response.data.student_wave,
                    english_teacher: teachers.english,
                    math_teacher: teachers.math,
                    science_teacher: teachers.science,
                    sst_teacher: teachers.sst,
                    english_comments: response.data.english_comments,
                    science_comments: response.data.science_comments,
                    sst_comments: response.data.sst_comments,
                    math_comments: response.data.math_comments
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        const isEnabled = this.state.subject > 0
        return (
            <div style={{marginTop: 10}}>
                <h4>View Student <Link to={"/edit/"+this.studentId}><FontAwesomeIcon icon={faEdit} /></Link></h4>
                        <label>Name: &nbsp;&nbsp;&nbsp;</label>
                        {this.state.student_name} <br/>
                        <label>Grade: &nbsp;&nbsp;&nbsp;</label>
                        {this.state.student_grade}<br />
                        <label>Section: &nbsp;&nbsp;&nbsp;</label>
                        {this.state.student_section}<br />
                        <label>Main Need: &nbsp;&nbsp;&nbsp;</label>
                        {this.state.student_mainneed}<br />
                        <label>Wave: &nbsp;&nbsp;&nbsp;</label>
                        {this.state.student_wave}<br />
                <h5>Teachers: </h5>
                        <label>English: &nbsp;&nbsp;&nbsp;</label>
                        {this.state.english_teacher} <br/>
                        <label>Math: &nbsp;&nbsp;&nbsp;</label>
                        {this.state.math_teacher}<br />
                        <label>Science: &nbsp;&nbsp;&nbsp;</label>
                        {this.state.science_teacher}<br />
                        <label>Social Studies: &nbsp;&nbsp;&nbsp;</label>
                        {this.state.sst_teacher}<br />
                        <div className="d-flex flex-column">
                            <ButtonGroup toggle className="mt-4" onClick={this.onChooseSubject.bind(this)}>
                                <ToggleButton type="radio" name="radio" value="1">
                                    English
                                </ToggleButton>
                                <ToggleButton type="radio" name="radio" value="2">
                                    Math
                                </ToggleButton>
                                <ToggleButton type="radio" name="radio" value="3">
                                    Science
                                </ToggleButton>
                                <ToggleButton type="radio" name="radio" value="4">
                                    Social Studies
                                </ToggleButton>
                            </ButtonGroup>
                            <ButtonGroup toggle className="mt-4" onClick={this.onChooseCycle.bind(this)} style={{visibility: isEnabled ? "visible" : "hidden"}}>
                                <ToggleButton type="radio" name="radio" value="1">
                                    Cycle 1
                                </ToggleButton>
                                <ToggleButton type="radio" name="radio" value="2">
                                    Cycle 2
                                </ToggleButton>
                                <ToggleButton type="radio" name="radio" value="3">
                                    Cycle 3
                                </ToggleButton>
                            </ButtonGroup>
                            <br />
                            <div style={{visibility: this.state.cycle > 0 ? "visible" : "hidden"}}>
                                <h5>{this.state.subject == 1 ? "English" : this.state.subject == 2 ? "Math" : this.state.subject == 3 ? "Science" : "Social Science"} : Cycle {this.state.cycle}</h5>
                                <p>Strategies NE:&nbsp;&nbsp;&nbsp;{this.state.cycle ? this.state.english_comments[this.state.cycle - 1].strategiesNE : " "}</p>
                                <p>Strategies E:</p>
                                <p>Comments:</p>
                                <p>Intervention:</p>
                                <p>Rating:</p><StarRatingComponent value={2} editing={false} />
                            </div>
                        </div>
                </div>
        )
    }
}