import React from 'react';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import './Buttons.css'
import {FaArrowCircleDown} from 'react-icons/fa';
import {connect} from 'react-redux';
import {setAmount, renderTable} from '../../../../../redux/TableState/tableActions';

const mapStateToProps = state => ({
    counters: state.tableReducer.counters,
    currentAmount: state.tableReducer.currentAmount
});
const mapDispatchToProps = dispatch => ({
    activateChangeAmount: (val) => dispatch(setAmount(val)),
    updateTable: (flag) => dispatch(renderTable(flag))
});

class DropMenu extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState(prevState => ({dropdownOpen: !prevState.dropdownOpen}))
    };

    changeAmount = (val) => { //ЗМІНЮЄМО КІЛЬКІСТЬ ВІДОБРАЖЕНИХ РЯДІВ НА 1 СТР І РОБИМО ЗБРОС НА ПЕРШУ СТР
        this.props.activateChangeAmount(val);
        this.props.updateTable(true);
    };

    render() {
        const {currentAmount} = this.props;
        return (

            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle id={this.state.dropdownOpen ? "dropdownFocus" : "dropdown"}>
                    <span id={this.state.dropdownOpen ? "AmountFocus" :"Amount"}>  <FaArrowCircleDown id="Arrow"/> {currentAmount}</span>
                </DropdownToggle>

                <DropdownMenu id="dropMenu">
                    {this.props.counters.map((elem, index) =>
                        <DropdownItem id="dropItem" key={index}
                                      onClick={() => {
                                          this.changeAmount(elem)
                                      }}>
                            {elem}
                        </DropdownItem>
                    )}
                </DropdownMenu>
            </Dropdown>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropMenu);
