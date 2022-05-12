import React, {Component} from "react";
import { Modal, Button, ButtonToolbar, Row, Col, Form, FormGroup } from "react-bootstrap";
import MySelect from "./UI/MySelect";


export class EditEmplModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            showModal: true,
			employees: this.props.employees,
			depSelect: ''
        }
    }



		handleSubmit(event){
            let emid = event.target.EmployeeId.value
            
            let b = this.state
            
            this.setState({
                showModal: false
            })
			
			event.preventDefault();
			fetch(process.env.REACT_APP_API + 'employee/' + emid, {
				method: 'PUT',
				headers: {
					'Accept': 'application/json',
                'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					EmployeeId: event.target.EmployeeId.value,
					EmployeeName: event.target.EmployeeName.value,
					// Department: event.target.Department.value,
					Department: this.state.depSelect,
					DateOfJoining: event.target.DateOfJoining.value,
					PhotoFileName: event.target.PhotoFileName.value
				})
			})
			.then(console.log(this.state.depSelect))
			.then(response => response.json())
			.then((result) => {
				alert(result);
			})
			.catch((error) => alert('Operation Failed -> ' + error))
			.then(() => this.props.cls_func(this.state.showModal));

		}


render () {
    // if (this.state.showModal){
	if (true){
    return (
        <div className="container">
            <Modal
            {...this.props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
							<Modal.Header closeButton>
								<Modal.Title id="contained-modal-title-vcenter">
									Edit Employee
								</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<Row>
									<Col sm={10}>
										<br/>
										<Form onSubmit={this.handleSubmit}>
                                        <Form.Group controlId="EmployeeId">
												<Form.Label>Employee Id</Form.Label>
												<Form.Control 
                                                type="text" 
                                                name="EmployeeId"
                                                placeholder="Employee Name"
                                                defaultValue={this.props.empid}
                                                disabled
                                                />
											</Form.Group>
											<br/>
                                            <Form.Group controlId="EmployeeName">
												<Form.Label>Employee Name</Form.Label>
												<Form.Control 
                                                type="text" 
                                                name="EmployeeName" 
                                                placeholder="Employee Name" 
                                                defaultValue={this.props.empname}
                                                required/>
											</Form.Group>
											<br/>
											<FormGroup controlId="mySelect">
											<Form.Label>Department:&nbsp; </Form.Label>
												<MySelect
												value={this.state.depSelect}
												defaultValue={this.props.empdep}
												options={this.props.deps}
												onChange={sort => {
													console.log(sort + ' sort')						
													this.setState({depSelect: sort})
												}
											}
													
												/>

											</FormGroup>

											{/* <Form.Group controlId="Department">
												<Form.Label>Department</Form.Label>
												<Form.Control 
                                                type="text" 
                                                name="Department" 
                                                placeholder="Department"
                                                defaultValue={this.props.empdep} 
                                                required/>
											</Form.Group> */}
											<br/>
											<Form.Group controlId="DateOfJoining">
												<Form.Label>Date Of Joining</Form.Label>
												<Form.Control 
                                                type="date" 
                                                name="DateOfJoining" 
                                                placeholder="Date Of Joining" 
                                                defaultValue={this.props.empdate}
                                                required/>
											</Form.Group>
											<br/>
											<Form.Group controlId="PhotoFileName">
												<Form.Label>Photo File Name</Form.Label>
												<Form.Control
                                                type="text" 
                                                name="PhotoFileName" 
                                                placeholder="Photo File Name"
                                                defaultValue={this.props.empphoto} 
                                                required/>
											</Form.Group>
											<br/>
											<Form.Group>
                                                <ButtonToolbar>
												<Button 
                                                variant="primary" 
                                                type="submit"                                                                                         
                                                >
													Edit Employee
												</Button>
                                                &nbsp;

                                                </ButtonToolbar>
											</Form.Group>

										</Form>
										<br/>
									</Col>
								</Row>
							</Modal.Body>
							<Modal.Footer>
								<Button variant="info" onClick={this.props.onHide}>Close</Button>
							</Modal.Footer>

            </Modal>

        </div>
    )}
		}
}