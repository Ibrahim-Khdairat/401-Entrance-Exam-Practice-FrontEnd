import React from 'react';
import { Form, Modal, Button } from 'react-bootstrap/';


class UpdateForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }


    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={this.props.onClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Drink</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit = {this.props.handleUpdate}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Drink Name</Form.Label>
                                <Form.Control type="text" defaultValue={this.props.updateObject.drinkName} name ='name' />   
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Drink Image</Form.Label>
                                <Form.Control type="text" defaultValue={this.props.updateObject.drinkImg} name='img'/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Drink Id</Form.Label>
                                <Form.Control type="text" defaultValue={this.props.updateObject.drinkId} name ='id'/>
                            </Form.Group>
                            <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.onClose}>
                            Close
                        </Button>
                        <Button variant="primary" type='submit' >
                            Save Changes
                        </Button>
                    </Modal.Footer>
                          
                        </Form>


                    </Modal.Body>
                 
                </Modal>
            </div>
        )
    }
}

export default UpdateForm
