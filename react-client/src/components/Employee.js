import React, { Component } from "react";
import { Table, Button, ButtonToolbar } from "react-bootstrap";
import { AddEmplModal } from "./AddEmplModal";
import { EditEmplModal } from "./EditEmpShow";


export class Employee extends Component {

    
        
    constructor(props) {
        super(props);
        this.output = this.output.bind(this)
            this.state = {
            employees: [],
            deps: [],
            addModalEmpShow: false,
            editModalEmpShow: false,
            
        }
    };

    output = (bol) => {
        console.log('RUN output')
        // this.setState({editModalEmpShow: false})
        this.setState({editModalEmpShow: bol})
        this.setState({addModalEmpShow: bol})
        
        console.log('editModalEmpShow' + this.state.editModalEmpShow)
        this.refreshList();

    }

    refreshList() {
        fetch(process.env.REACT_APP_API + 'employee/')
        .then(response => response.json())
        .then(data => {
            this.setState({employees: data})
        });
        fetch(process.env.REACT_APP_API + 'department/')
        .then(response => response.json())
        .then(data => {
            this.setState({deps: data});
        });
    }

    componentDidMount() {
        this.refreshList();
    }



    // componentDidUpdate(prevProps, prevState){
        
    //     if (prevState.employees !== this.state.employees) {
    //         console.log('Status not =');
    //     }
    //     let a = this.props;
    //     let b = this.state;
    //     console.log("componentDidUpdate()");
    // }



    deleteEmp(empid){
        if (window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API + 'employee/' + empid,{
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }
            })
            .then(console.log('Delete Update'))
            .then(() => this.refreshList())
            
        }
        
        
    }

    render() {
        console.log('render')
        const {employees, empid, empname, empdep, empdate, empphoto} = this.state
        const addModalEmpClose = () => this.setState({addModalEmpShow: false});
        const editModalEmpClose = () => {
            this.setState({editModalEmpShow: false})
            this.refreshList();
            console.log('RUN editModalEmpClose')
            // let b = this.state;
        };


        return (
            <div className="mt-5 justify-content-center">
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>EmployeeId</th>
                            <th>EmployeeName</th>
                            <th>Department</th>
                            <th>DateOfJoining</th>
                            <th>PhotoFileName</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.map(empl => (
                                <tr key={empl.EmployeeId}>
                                    <td>{empl.EmployeeId}</td>
                                    <td>{empl.EmployeeName}</td>
                                    <td>{empl.Department}</td>
                                    <td>{empl.DateOfJoining}</td>                                   
                                    <td>{empl.PhotoFileName}</td>
                                    <td>
                                        <ButtonToolbar>
                                            <Button
                                            className="mr-2"
                                            style={{width: '80px'}}
                                            variant="success"
                                            onClick={() => this.setState({
                                                editModalEmpShow: true,
                                                empid: empl.EmployeeId,
                                                empname: empl.EmployeeName,
                                                empdep: empl.Department,
                                                empdate: empl.DateOfJoining,
                                                empphoto: empl.PhotoFileName
                                            })}
                                            >
                                                Edit
                                            </Button>
                                         &nbsp;
                                         <Button
                                            className="mr-2"
                                            style={{width: '80px'}}
                                            variant="danger"
                                            onClick={() => this.deleteEmp(empl.EmployeeId)}
                                         >
                                             Delete
                                             </Button>
                                         <EditEmplModal 
                                            show={this.state.editModalEmpShow}
                                            onHide={editModalEmpClose}
                                            empid={empid}
                                            empname={empname}
                                            empdep={empdep}
                                            empdate={empdate}
                                            empphoto={empphoto}
                                            cls_func={this.output}
                                            deps={this.state.deps}
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
                    <Button variant="info" onClick={() => this.setState({addModalEmpShow: true})}>
                        Add Employee
                    </Button>
                    <AddEmplModal
                    show={this.state.addModalEmpShow}
                    onHide={addModalEmpClose}
                    cls_func={this.output}
                    />
                </ButtonToolbar>
            </div>

        );
    }

}