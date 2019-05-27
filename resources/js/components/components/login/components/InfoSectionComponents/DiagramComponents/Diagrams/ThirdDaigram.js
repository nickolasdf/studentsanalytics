import React from 'react';
import axios from 'axios';
import PieChart from "react-svg-piechart"
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

const log = m => console.log(m);

class FirstDiagram extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            currentProfession: 0,
            //  colors: [],
            persons: [],

            profession: [],
            region: [],
            amount: [],

            data: []
        };
        this.toggle = this.toggle.bind(this);
    }
    componentDidMount() {
        axios.get('/students/')
            .then(r => r.data)
            .then(r => {
                this.setState({persons: r})
            }).then(s => this.setOptions()).catch(log);
    }


    getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };


    countLength = () => {  //Кількість об'єктів яка прийшла.
        let k = 0;
        this.state.persons.map((elem) =>
            <div>{elem.id ? k++ : null} </div>
        );
        return k;
    };

    setOptions = () => {

        var labelProf = []; //назва професій
        var labelRegion = []; //назва області
        var count = []; //кількість
        var length = this.countLength();

        //Шукаємо кількість об'єктів
        for (var i = 0; i < length; i++) {
            count[i] = [];
            labelRegion[i] = [];
            var flag = true;
            var tempProfLabel = this.state.persons[i].prof; //prof

            if (i !== 0) {
                for (var j = 0; j < i; j++) {  //Перевірка на повтор назви
                    if (tempProfLabel !== labelProf[j]) {
                        flag = true;

                    } else {
                        flag = false;
                        labelProf[i] = null;
                        //count[i] = null;
                        break;
                    }
                }
            }

            if (flag === true) { //Якщо професія не повторюється

                for (var n = 0; n < length; n++) {

                    var tempRegionLabel = this.state.persons[n].region;//region
                    var tempCount = 0;
                    var secondFlag = true;
                    //   count[i][n]=0;
                    // console.log(tempCount);

                    if (n !== 0) {
                        for (var r = 0; r < n; r++) {

                            if (tempRegionLabel !== this.state.persons[r].region) {
                                secondFlag = true;
                            } else {
                                secondFlag = false;
                                labelRegion[i][n] = null;
                                count[i][n] = null;
                                break;
                            }
                        }
                    }
                    if (secondFlag === true) {

                        for (var m = 0; m < length; m++) {
                            //Якщо тіпи з однаковою професією і з одної області
                            if (tempProfLabel === this.state.persons[m].prof && tempRegionLabel === this.state.persons[m].region) {
                                //рахуємо їхню кількість
                                tempCount++;
                            }
                            //  console.log(tempCount)
                        }
                        labelProf[i] = tempProfLabel;
                        labelRegion[i][n] = tempRegionLabel;
                        count[i][n] = tempCount;
                    }
                }
            }
        }

        this.setState({
            profession: labelProf,
            region: labelRegion,
            amount: count
        });

        this.setDefaultData();
    };

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    };

    setDefaultData = () => {
        var info = [];
        for (let i = 0; i < this.state.profession.length; i++) {
            info[i] = {
                title: this.state.region[0][i],
                value: this.state.amount[0][i],
                color: this.getRandomColor()
            };
            //      console.log(info[i].title);
            //  console.log(info[i].value);
        }
        this.setState({data: info});
    };
    setData = (ind) => {
        var info = [];
        for (let i = 0; i < this.state.profession.length; i++) {
            info[i] = {
                title: this.state.region[ind][i],
                value: this.state.amount[ind][i],
                color: this.getRandomColor()
            };
            //      console.log(info[i].title);
            //  console.log(info[i].value);
        }
        this.setState(
            {
                data: info,
                 currentProfession: ind
            });
    };

    render() {
        return (
            <div className="DiagramItem">

                <div className="diagramText"> Діаграма перегляду розподілу<br/> професії по регіонах</div>
                <div className="wrapper">


                    <div id="Dropdown-Menu">
                        <Dropdown  isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle id={this.state.dropdownOpen ? "MenuBlockFocus" : "MenuBlock"} caret>
                                {this.state.profession[this.state.currentProfession]}
                            </DropdownToggle>
                            <DropdownMenu id="dropMenu">
                                {this.state.profession.map((elem, index) =>
                                    <DropdownItem id="dropItem" key={index} onClick={() => {
                                        this.setData(index)
                                    }}>
                                        {elem}
                                    </DropdownItem>
                                )}
                            </DropdownMenu>
                        </Dropdown></div>

                    <div className="schedule">
                        <PieChart
                            data={this.state.data}
                            expandOnHover/>
                    </div>

                    <div className="labels">
                        {this.state.data.map(({value, color, title}, i) => {
                            if (title !== null) {
                                if(value !== 0)
                                return (

                                    <div key={i} className="labelBlock">

                                        <div style={{"background-color": color}} className="value">{value}</div>
                                        &nbsp;
                                        <div style={{"color": color}}>:&nbsp;{title}</div>

                                    </div>)
                            }
                        })}
                    </div>
                </div>

            </div>

        );
    }
}

export default (FirstDiagram);
