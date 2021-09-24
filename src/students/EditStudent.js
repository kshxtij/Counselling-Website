import React, { Component } from 'react';
import axios from 'axios';

export default class EditStudent extends Component {
    constructor(props) {
        super(props);

        this.onChangeStudentName = this.onChangeStudentName.bind(this);
        this.onChangeStudentGrade = this.onChangeStudentGrade.bind(this);
        this.onChangeStudentSection = this.onChangeStudentSection.bind(this);
        this.onChangeStudentMainNeed = this.onChangeStudentMainNeed.bind(this);
        this.onChangeStudentWave = this.onChangeStudentWave.bind(this);
        this.onChangeEnglishTeacher = this.onChangeEnglishTeacher.bind(this);
        this.onChangeMathTeacher = this.onChangeMathTeacher.bind(this);
        this.onChangeScienceTeacher = this.onChangeScienceTeacher.bind(this);
        this.onChangeSSTTeacher = this.onChangeSSTTeacher.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            student_name: '',
            student_grade: '',
            student_section: '',
            student_mainneed: '',
            student_wave: '',
            english_teacher: '',
            math_teacher: '',
            science_teacher: '',
            sst_teacher: ''
        }
    }


    onChangeStudentName(e) {
        this.setState({
            student_name: e.target.value
        });
    }

    onChangeStudentGrade(e) {
        this.setState({
            student_grade: e.target.value
        });
    }

    onChangeStudentSection(e) {
        this.setState({
            student_section: e.target.value
        });
    }

    onChangeStudentMainNeed(e) {
        this.setState({
            student_mainneed: e.target.value
        });
    }

    onChangeStudentWave(e) {
        this.setState({
            student_wave: e.target.value
        });
    }

    onChangeEnglishTeacher(e) {
        this.setState({
            english_teacher: e.target.value
        });
    }

    onChangeMathTeacher(e) {
        this.setState({
            math_teacher: e.target.value
        });
    }
    onChangeScienceTeacher(e) {
        this.setState({
            science_teacher: e.target.value
        });
    }
    onChangeSSTTeacher(e) {
        this.setState({
            sst_teacher: e.target.value
        });
    }

    componentDidMount() {
        const status = sessionStorage.getItem("logged-in")
        if (!status) {
            this.props.history.push("/")
        }
        axios.get('http://localhost:4000/students/' + this.props.match.params.id)
            .then(response => {
                const teachers = JSON.parse(response.data.student_teachers)
                this.setState({
                    student_name: response.data.student_name,
                    student_grade: response.data.student_grade,
                    student_section: response.data.student_section,
                    student_mainneed: response.data.student_mainneed,
                    student_wave: response.data.student_wave,
                    english_teacher: teachers.english,
                    math_teacher: teachers.math,
                    science_teacher: teachers.science,
                    sst_teacher: teachers.sst
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onSubmit(e) {
        e.preventDefault();
        
        const obj = {
            student_name: this.state.student_name,
            student_grade: this.state.student_grade,
            student_section: this.state.student_section,
            student_mainneed: this.state.student_mainneed,
            student_wave: this.state.student_wave,
            student_teachers: {english: this.state.english_teacher, math: this.state.math_teacher, science: this.state.science_teacher, sst: this.state.sst_teacher}
        }

        console.log(obj);
        axios.post('http://localhost:4000/students/update/' + this.props.match.params.id, obj)
            .then(res => console.log(res.data));

            this.props.history.push('/success');
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Edit Student</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.student_name}
                                onChange={this.onChangeStudentName}
                                />
                    </div>
                    <div className="form-group">
                        <label>Grade: </label><br />
                        <select 
                                value={this.state.student_grade}
                                onChange={this.onChangeStudentGrade}
                                >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Section: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.student_section}
                                onChange={this.onChangeStudentSection}
                                />
                    </div>
                    <div className="form-group">
                        <label>Main Need: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.student_mainneed}
                                onChange={this.onChangeStudentMainNeed}
                                />
                    </div>
                    <div className="form-group">
                        <label>Wave: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                max="1"
                                value={this.state.student_wave}
                                onChange={this.onChangeStudentWave}
                                />
                    </div>
                    <div className="form-group"> 
                        <label>English: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.english_teacher}
                                onChange={this.onChangeEnglishTeacher}
                                />
                    </div>
                    <div className="form-group"> 
                        <label>Math: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.math_teacher}
                                onChange={this.onChangeMathTeacher}
                                />
                    </div>
                    <div className="form-group"> 
                        <label>Science: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.science_teacher}
                                onChange={this.onChangeScienceTeacher}
                                />
                    </div>
                    <div className="form-group"> 
                        <label>Social Studies: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.sst_teacher}
                                onChange={this.onChangeSSTTeacher}
                                />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update Student" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}