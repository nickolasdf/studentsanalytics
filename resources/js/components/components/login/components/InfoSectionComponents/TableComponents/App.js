import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import Container from "reactstrap/es/Container";
import TableBody from './myTable.js';
import DropMenu from './DropMenu.js';
import Buttons from './Buttons.js';
//import axios from "axios";
import './App.css'
import './Buttons.css'
import {fetchData} from "../../../../../redux/TableState/tableActions"
import {connect} from "react-redux"

const mapStateToProps = state => ({
    last: state.tableReducer.last,
});

const mapDispatchToProps = dispatch =>({
    fetchAxios: (persons) => dispatch(fetchData(persons))
});


class App extends Component {
componentDidMount() {

  /*  let DropMenu, Buttons;
    if(this.props.last!==0) { //Якщо є дані зі студентами в таблиці, то будуть і кнопки і випад меню.
        DropMenu = <DropMenu/>;
        Buttons = <Buttons/>;
    } else {
        DropMenu = null;
        Buttons = null;
    }
    */
}
    render() {
       return (
            <div className="tableBlock">
                <TableBody/>
                <Container fluid>
                    <Row id="btn-row">
                        <Col xs={{size: 2}}>
                            {this.props.last!==0 ? <DropMenu/> : null}
                        </Col>
                        <Col xs={{size: 10}} id="BtnGroup">
                            {this.props.last!==0 ? <Buttons/> : null}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

