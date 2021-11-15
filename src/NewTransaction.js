import React from "react";
import {Container, Tab, Tabs, Button, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {getUserAccounts} from './API/lib/users';

export default function NewTransaction(){

    console.log('------');
    const token = localStorage.getItem("userToken");
    getUserAccounts(token).then(response => console.log(response));


    return (
        <div style={{padding:'10%'}}>
            <Tabs
            defaultActiveKey="Ingreso de datos"
            transition={false}
            id="noanim-tab-example"
            className="mb-3"
            >
                <Tab eventKey="Ingreso de datos" title="Ingreso de datos">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Referencia</Form.Label>
                            <Form.Control type="text" maxLength />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Tab>
                <Tab eventKey="Comprobante" title="Comprobante">

                </Tab>
            </Tabs>
        </div>
    );
}