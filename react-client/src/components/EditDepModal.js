import React, {Component} from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";


export class EditDepModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);


    }

    handleSubmit(event) {
      let did = event.target.DepartmentId.value
      event.preventDefault();      
      fetch(process.env.REACT_APP_API + 'department/' + did, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          DepartmentId: event.target.DepartmentId.value,
          DepartmentName: event.target.DepartmentName.value
        })
      })
      .then(response => response.json())
      .then((result) => {
        alert(result);
      })
      .error(() => {
        alert('Operation Failed');
      });
    }

    render() {
      
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
          Edit Department
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Row>
            <Col sm={10}>
                <br/>
              <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="DepartmentId">
                  <Form.Label>Department Id</Form.Label>
                  <Form.Control 
                  type="text" 
                  name="DepartmentId" 
                  placeholder="Department Id" 
                  defaultValue={this.props.depid}
                  disabled
                  />
                </Form.Group>
                <Form.Group controlId="DepartmentName">
                    <Form.Label>Department Name</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="DepartmentName" 
                    placeholder="Department Name" 
                    defaultValue={this.props.depname}
                    required
                    />
                </Form.Group>
                <br/>
                <Form.Group>
                    <br/>
                  <Button variant="primary" type="submit">
                    Update Department
                  </Button>
                </Form.Group>
              </Form>
              <br/>
            </Col>
          </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    </div>
                
            
        )
    }

}













