import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {ButtonGroup, ToggleButton} from 'react-bootstrap';

export default class StudentsList extends Component {

    constructor(props){
        super(props)

        this.state ={
            subject: '',
            cycle: ''
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

    render() {
        const isEnabled = this.state.subject > 0
        return (
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
            <h5 style={{visibility: this.state.cycle > 0 ? "visible" : "hidden"}}>{this.state.subject == 1 ? "English" : this.state.subject == 2 ? "Math" : this.state.subject == 3 ? "Science" : "Social Science"} : Cycle {this.state.cycle}</h5>
        </div>
        )
    }
}