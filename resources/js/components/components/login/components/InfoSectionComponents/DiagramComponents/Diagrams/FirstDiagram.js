import React from 'react';
import axios from 'axios';
import PieChart from "react-svg-piechart"

const log = m => console.log(m);

class FirstDiagram extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            //  colors: [],
            persons: [],
            region: [],
            amount: [],
            data: []
        };
    }


    componentDidMount() {
          axios.get('/students')
              .then(r => r.data)
              .then(r => {
                this.setState({persons: r})
              })
              .then(s => this.setOptions()).catch(log);
    }


    getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    setData = () => {
       // console.log('state' + this.state.amount);
        var info = [];
        for (let i = 0; i < this.state.region.length; i++) {
            info[i] = {
                title: this.state.region[i],
                value: this.state.amount[i],
                color: this.getRandomColor()
            };

        }

        this.setState({data: info});
        // console.log(this.state.data + 'data')
    };

    countLength = () => {
        let k = 0;
        this.state.persons.map((elem) =>
            <div>{elem.id ? k++ : null} </div>
        );
        return k;
    };

    setOptions = () => {
        var count = [];
        var label = [];
        var length = this.countLength();
        //Шукаємо кількість об'єктів
        //console.log('length ' + length);
        for (var i = 0; i < length; i++) {
            var flag = true;
            var tempLabel = this.state.persons[i].region;

            //console.log(tempLabel +'Label');

            if (i !== 0) {
                for (var j = 0; j < i; j++) {  //Перевірка на назву
                    if (tempLabel !== label[j]) {
                        //console.log(label[j]);
                        flag = true;
                    } else {
                        flag = false;
                        label[i] = null;
                        count[i] = null;
                        break;
                    }
                }
            }
            if (flag === true) { //Якщо назва не повторяється
                var tempAmount = 0;

                for (var n = 0; n < length; n++) {             //Шукаємо однакову назву
                    if (tempLabel === this.state.persons[n].region) {
                        tempAmount++;                            //Підрахуємо
                    }
                }
                // console.log('Amount' +tempAmount);
                label[i] = tempLabel;
                count[i] = tempAmount;
            }
        }
        this.setState({
            region: label,
            amount: count
        });
        this.setData();

    };


    render() {
        return (
            <div className="DiagramItem">
                <div className="diagramText">Групування по регіонах</div>
                <div className="wrapper">
                    <div className="schedule">
                        <PieChart
                            data={this.state.data}
                            expandOnHover/>
                    </div>

                    <div className="labels">
                        {this.state.data.map(({value, color, title}, i) => {
                            if (title !== null) {
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

