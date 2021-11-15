import React from "react";
import {getTransactions} from './API/lib/transactions';
import {Button, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router';

export default function Home(){
    const navigate = useNavigate();

    const handleNewTransaction = () =>{
        navigate("/newTransaction", {replace: true});
    }
    return(
        <>
        <Row>
            <Col xs={{ offset: 9 }} md={{ offset: 9 }}>
                <Button onClick={handleNewTransaction} style={{marginTop:'10%'}} variant="outline-primary">Nueva Transferencia</Button></Col>
        </Row>
        
        </>);
}