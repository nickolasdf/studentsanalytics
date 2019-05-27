import React from 'react';
import axios from "axios";

import Select from 'react-select';
import Checkbox from '@material-ui/core/Checkbox';


import "./StudentsRegistration.css";
import './Animation.css';

//import Select from '@material-ui/core/Select';

const {level1: locateList} = require('./koatuu.json');
const {professions: profList} = require('./professions.json');
const {vnzList} = require('./vnz.json');


class StudentsRegistration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            student: {
                "address": "",
                "region": "",
                "tel": "",
                "email": "",
                "vnz": "",
                "prof": "",
                "name": "",
                "isJoined": false
            },
            regions: this.getRegionList(),
            professions: this.getProfList(),
            vnzes: this.getVnzList(),
            checkBox: false
        };
    }

    handleChange = ()=> {
        this.setState({ checkBox: !this.state.checkBox});
    };

    onChangeEvent = (e) => {
        const id = e.target.id;
        const current = e.currentTarget.value;
        let obj = {...this.state.student};
        obj[id] = current;
        this.setState({student: obj});
    };

    add(e) {
        e.preventDefault();
        console.log('STATE OF STUD', this.state.student);
        return axios.post('/students', this.state.student)
            .then(r => r.data)
            .then(r => {
                console.log('start adding', r);
                return r;
            }).catch(error => {
                console.log(error.response)
            }).then(s => alert("ТУТ БУДЕ АНІМАЦІЯ ЗЕЛЕНОЇ ГАЛОЧКИ"))


    };

    getRegionList=()=> {
        return locateList.map((el) => ({
            value: el,
            label: el
        }))
    };

    getProfList=()=> {
        return profList.map((el) => ({
            value: el,
            label: el
        }))
    };

    getVnzList=()=> {
        return vnzList.map((el) => ({
            value: el,
            label: el
        }))
    };

    toggleCheckBox = (e) => {
        const id = e.target.id;
        const current = !this.state.student.isJoined;
        let obj = {...this.state.student};
        obj[id] = current;
        this.setState({student: obj});
        setTimeout(() => console.log(this.state), 500);
    };

    clearArray = () => {
        this.setState({student: []})
    };

    render() {
        return (
            <div className={"registrWrapper"}>

                <form id={"registrationForm"} onSubmit={this.add.bind(this)}>


                    <div className={"inputsSection"}>
                        <input id={"name"} className={"input"} placeholder={"ПІБ"}
                               onChange={this.onChangeEvent}/>
                    </div>


                    <div className={"doubleInputs"}>
                        <div className={"inputsSection"}>
                            <Select styles={customStyles} className={"mr"} id={"region"}
                                    placeholder={"Виберіть область..."}
                                    options={this.state.regions}
                                    onChange={(event) => {
                                        console.log(event);
                                        const s = {...this.state.student, region: event.value};
                                        console.log(s);
                                        this.setState(
                                            {
                                                student: s
                                            }
                                        )
                                    }}/>
                        </div>
                        <div className={"inputsSection"}>
                            <input id={"address"} className={"input ml"} placeholder={"Введіть адресу..."}
                                   onChange={this.onChangeEvent}/>
                        </div>
                    </div>


                    <div className={"doubleInputs"}>
                        <div className={"inputsSection"}>
                            <Select className={"mr"} id={"prof"}
                                    placeholder={"Виберіть професію..."}
                                    styles={customStyles}
                                    options={this.state.professions}
                                    onChange={(event) => {
                                        console.log(event);
                                        const s = {...this.state.student, prof: event.value};
                                        console.log(s);
                                        this.setState(
                                            {
                                                student: s
                                            }
                                        )
                                    }}
                            />
                        </div>
                        <div className={"inputsSection"}>
                            <Select className={"ml"} id={"vnz"}
                                    placeholder={"Виберіть ВНЗ..."}
                                    styles={customStyles}
                                    options={this.state.vnzes}
                                    onChange={(event) => {
                                        console.log(event);
                                        const s = {...this.state.student, vnz: event.value};
                                        console.log(s);
                                        this.setState(
                                            {
                                                student: s
                                            }
                                        )
                                    }}
                            />
                        </div>
                    </div>


                    <div className={"doubleInputs"}>
                        <div className={"inputsSection"}>
                        <input id={"tel"} className={"input mr"} placeholder={"Номер телефону"}
                               onChange={this.onChangeEvent}/>
                        </div>

                        <div className={"inputsSection"}>
                        <input id={"email"} className={"input ml"} placeholder={"Електронна пошта"}
                               onChange={this.onChangeEvent}/>
                        </div>
                    </div>


                    <div className={"inputsSection inputButtons"}>
                        <span>У майбутньому: вступив чи ні в НУВГП?</span>
                        <div>
                        <Checkbox
                            checked={this.state.checkBox}
                            onChange={()=>{this.handleChange();this.toggleCheckBox()}}
                            value="checkedB"
                            color={"primary"}
                            id={"isJoined "}
                            className={"ml-4"}

                        /></div>

                    </div>


                    <div className={"inputsSection inputButtons"}>
                        <button className="mr-lg-5 mr-md-3 mr-2" type={"submit"}>Відправити</button>
                        <button className="ml-lg-5 ml-md-3 ml-2" type={"reset"} onClick={this.clearArray}>Очистити
                        </button>
                    </div>

                </form>
            </div>
        )
    }
}


const customStyles = {
    option: () => ({
        padding: 20,
    }),
    control: (provided) => ({
        // none of react-select's styles are passed to <Control />
        ...provided,
        width: 320,
        height: 45,

        padding: '0px 10px',
        border: '2px solid #0d5b85',
        borderRadius: 15,
        lineHeight: 1,
        textAlign: 'left',
        zIndex: 0,
        boxShadow: "none",
        '&:hover': {
            backgroundColor: '#d9d9d9',
        },

    })


};

export default StudentsRegistration;

