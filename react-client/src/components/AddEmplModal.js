import React, {Component} from "react";
import { Modal, Button, ButtonToolbar, Row, Col, Form } from "react-bootstrap";


export class AddEmplModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

		handleSubmit(event){
			event.preventDefault();
			fetch(process.env.REACT_APP_API + 'employee/', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
          			'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					EmployeeId: null,
					EmployeeName: event.target.EmployeeName.value,
					Department: event.target.Department.value,
					DateOfJoining: event.target.DateOfJoining.value,
					PhotoFileName: event.target.PhotoFileName.value
				})
			})
			.then(response => response.json())
			.then((result) => {
				alert(result);
			})
			.catch(error => alert('Operation was Failed! :('))
			.then(() => this.props.cls_func(false));

		}


render () {
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
									Add Employee
								</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<Row>
									<Col sm={10}>
										<br/>
										<Form onSubmit={this.handleSubmit}>
											<Form.Group controlId="EmployeeName">
												<Form.Label>Employee Name</Form.Label>
												<Form.Control type="text" name="EmployeeName" placeholder="Employee Name" required/>
											</Form.Group>
											<br/>
											<Form.Group controlId="Department">
												<Form.Label>Department</Form.Label>
												<Form.Control type="text" name="Department" placeholder="Department" required/>
											</Form.Group>
											<br/>
											<Form.Group controlId="DateOfJoining">
												<Form.Label>Date Of Joining</Form.Label>
												<Form.Control type="date" name="DateOfJoining" placeholder="Date Of Joining" required/>
											</Form.Group>
											<br/>
											<Form.Group controlId="PhotoFileName">
												<Form.Label>Photo File Name</Form.Label>
												<Form.Control type="text" name="PhotoFileName" placeholder="Photo File Name" required/>
											</Form.Group>
											<br/>
											<Form.Group>
												<Button variant="primary" type="submit">
													Add Employee
												</Button>
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
    )
		}
}