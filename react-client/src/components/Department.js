import React, { Component } from "react";
import {  Table, Button, ButtonToolbar  } from 'react-bootstrap';
import { AddDepModalS } from "./AddDepModalS";
import { EditDepModal } from "./EditDepModal";

export class Department extends Component {

    constructor(props) {
        super(props);
        this.state = {
            deps: [],
            addModalShow: false,
            editModalShow: false
        }
    }

    refreshList() {
        fetch(process.env.REACT_APP_API + 'department/')
        .then(response => response.json())
        .then(data => {
            this.setState({deps: data});
        });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate(prevProps) {
        if (this.props.deps !== prevProps.deps) {
            this.refreshList();
        }
        
    }

    deleteDep(depid) {
        if (window.confirm('Are you sure?')) {
            fetch(process.env.REACT_APP_API + 'department/' + depid, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }
            });
        }
    }

    render() {
        const {deps, depid, depname} = this.state;
        const addModalClose = () => this.setState({addModalShow: false});
        const editModalClose = () => this.setState({editModalShow: false});


        return (
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Department Id</th>
                            <th>Department Name</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            deps.map(dep => (
                                <tr key={dep.DepartmentId}>
                                    <td>{dep.DepartmentId}</td>
                                    <td>{dep.DepartmentName}</td>
                                    <td>
                                        <ButtonToolbar>
                                            <Button 
                                                className="mr-2" 
                                                style={{width: '100px'}}
                                                variant="success"
                                                onClick={() => this.setState({
                                                    editModalShow: true,
                                                    depid: dep.DepartmentId,
                                                    depname: dep.DepartmentName
                                                })}
                                            >
                                                Edit
                                            </Button>
                                            &nbsp;
                                            <Button 
                                                className="mr-2" 
                                                style={{width: '100px'}}
                                                variant="danger"
                                                onClick={() => this.deleteDep(dep.DepartmentId)}
                                            >
                                                Delete
                                            </Button>
                                            <EditDepModal
                                                show={this.state.editModalShow}
                                                onHide={editModalClose}
                                                depid={depid}
                                                depname={depname}
                                            />
                                        </ButtonToolbar>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                <br/>
                <ButtonToolbar>

                    <Button variant="primary" onClick={() => this.setState({addModalShow: true})}>
                        Add department
                    </Button>
                    <AddDepModalS
                    show={this.state.addModalShow}
                    onHide={addModalClose}
                    />

                </ButtonToolbar>
            </div>

        );
    }
}