import React from 'react';
import Header from "./Header";
import {Table} from "reactstrap";
import {connect} from "react-redux";
import {SortDidMount, countRows, toggleModal, changeCurrentId, fetchData, renderTable
} from "../../../../../redux/TableState/tableActions.js";
import axios from "axios";
import MdCreate from 'react-ionicons/lib/MdCreate';
import MdCog from 'react-ionicons/lib/MdCog';

const mapStateToProps = state => ({
    last: state.tableReducer.last,
    info: state.tableReducer.info,
    currentAmount: state.tableReducer.currentAmount,
    mover: state.tableReducer.mover,
    direction: state.tableReducer.direction,
    menuIsOpen: state.tableReducer.isModalOpen,
    pushedSort: state.tableReducer.pushedSort,
    rerenderTable: state.tableReducer.rerenderTable
});

const mapDispatchToProps = dispatch => ({
    amountRows: (i) => dispatch(countRows(i)),
    sortDidMount: (temp, type) => dispatch(SortDidMount(temp, type)),
    changeToggle: () => dispatch(toggleModal()),
    changeStudentId: (id) => dispatch(changeCurrentId(id)),
    fetchAxios: (persons) => dispatch(fetchData(persons)),
    updateTable: (flag) => dispatch(renderTable(flag))
});

const log = m => console.log(m);

class MyTable extends React.Component {
    state = {
        page: [],
        checker: null,
        data: []
    };

    changeToggle = () => {
        this.props.changeToggle();
        console.log(this.props.menuIsOpen)
    };

    componentWillMount() {
        axios.get('/students')
            .then(r => r.data)
            .then(r => {
                this.props.fetchAxios(r);
            })
            .then(s => this.sortByDate()).catch(log);
    }

    sortByDate() { //ЗА ЗАМОВЧУВАННЯМ СОРТУВАННЯ ПО ДАТІ
        let temp = this.props.info;
        temp.sort((a, b) => a.updated_at < b.updated_at ? this.props.direction : -this.props.direction);
        this.props.sortDidMount(temp, "date");
        this.amountCount();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.rerenderTable === true) {
            console.log('DidUpdate', this.props.rerenderTable);
            this.amountCount();
        }
    }

    amountCount = () => {

        var i = 0;
        this.props.info.map((elem) =>
            <div>{elem.id ? i++ : null}</div>
        );
        this.props.amountRows(i);
        console.log(this.props.last);
        this.renderPage();
    };
    renderPage = () => {
        console.log('RENDER PAGE!');
        const {currentAmount, mover, info, last} = this.props; //mover - початкове
        //  console.log('Info', info);
        const show = currentAmount + mover;   //Кінцеве значення для відображення

        const tableBody = info.slice(mover, show).map((item) => //Відображуємо ряди на стр з початкового(mover) по (show)
            <tr key={item.id}>

            <td id="Editor" onClick={() => {
                this.changeToggle();
                this.props.changeStudentId(item.id)}}>
                <MdCreate fontSize="40px" id="cog" shake={true} />
            </td>

            <td>{item.name}</td>
            <td>{item.region}</td>
            <td>{item.address}</td>
            <td>{item.tel}</td>
            <td>{item.email}</td>
            <td>{item.vnz}</td>
            <td>{item.prof}</td>
            <td>{item.updated_at}</td>
        </tr>);

        let tablePage;
        if (last !== 0) { //Якщо є студенти для відображення
            tablePage =
                <Table className="table">
                    <thead>
                    <Header/>
                    </thead>
                    <tbody>
                    {tableBody}
                    </tbody>
                </Table>
        } else {
            tablePage = <p className="EmptyTable">До бази даних не внесено жодного студента!</p>
        }

        this.setState(
            {page: tablePage});

        this.props.updateTable(false);
        console.log('FALSE!')
    };

    render() {
        /*    if(this.props.info !== this.state.data) {
                console.log('START!');
                 this.amountCount();
             }  */
        return (
            <div>
                {this.state.page}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyTable);