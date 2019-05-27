import React, {Component} from 'react';
import "../../StudentsRegistration.css";
import {connect} from "react-redux";
import {toggleModal, changeCurrentId, fetchData, renderTable} from "../../../../../../redux/TableState/tableActions";
import axios from "axios";
import './ModalWindow.css';
import Select from 'react-select';

const {level1: locateList} = require('../../koatuu');
const {professions: profList} = require('../../professions.json');
const {vnzList} = require('../../vnz.json');

class Window extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student: {
                "region": "",
                "address": "",
                "tel": "",
                "email": "",
                "vnz": "",
                "prof": "",
                "name": "",
                "isJoined": false
            },
            regions: this.getRegionList(),
            professions: this.getProfList(),
            vnzes: this.getVnzList()
        };

    }

    getRegionList = () => {
        return locateList.map((el) => ({
            value: el,
            label: el
        }))
    };

    getProfList = () => {
        return profList.map((el) => ({
            value: el,
            label: el
        }))
    };

    getVnzList = () => {
        return vnzList.map((el) => ({
            value: el,
            label: el
        }))
    };

    componentDidMount = () => {
        console.log('ID', this.props.studentId);
        this.getOne(this.props.studentId)
    };


    getOne = (id) => {
        axios.get('/students/' + id)
            .then(r => r.data)
            .then(r => {
                console.log('get one');
                console.log(r);
                this.setState({student: r});
                console.log(this.state.student);
                return r;
            }).catch()
    };

    upd = (user) => {
        return axios.put('/students/' + user.id, user)
            .then(r => r.data)
            .then(r => {
                console.log('PUT');
                console.log(r);
                return r;
            }).catch((er) => {
                console.log(er)
            }).then(n => {
                console.log('STARTING UPDATED TABLE');
                this.updateTable()
            })
    };
    del = (user) => {
        axios.delete('/students/' + user.id)
            .then(r => r.data)
            .then(r => {
                console.log('DELETED',r);
                return r;
            }).catch().then(n => {
            this.updateTable()
        });
    };

    updateTable() {
        axios.get('/students/')
            .then(res => {
                const persons = res.data;
                this.props.fetchAxios(persons);
                console.log('FETCHAXIOS')
            })
            .then(m => {
                this.props.rerenderTable(true);
        });
    };

    onChangeEvent = (e) => {
        const id = e.target.id;
        const current = e.currentTarget.value;
        const obj = {...this.state.student};
        obj[id + ""] = current;
        this.setState({student: obj});
        console.log(this.state.student)
    };

    render() {
        return (


                <form className={"modalWindow "}
                      onSubmit={(e) => {
                          this.upd(this.state.student);
                          this.props.closeWindow(null);
                      }}
                      onReset={(e) => {
                          this.del(this.state.student);
                          this.props.closeWindow(null);
                      }}
                >
                    <div className={"redactBlock"}>


                    <div className={"fieldBlock"}>
                        <div className="inputLabel">ПІБ</div>
                        <input id={"name"} className={"inputItem"}
                               defaultValue={this.state.student.name}
                               onChange={this.onChangeEvent}/>
                    </div>


                    <div className={"doubleSection"}>
                        <div className={"fieldBlock"}>
                            <div className="inputLabel">Область</div>
                            <Select  styles={customStyles}
                                     className={""} id={"region"}
                                    value={{label: this.state.student.region}}
                                    options={this.state.regions}
                                    onChange={(event) => {
                                        console.log(event)
                                        const s = {...this.state.student, region: event.value}
                                        console.log(s)
                                        this.setState(
                                            {
                                                student: s
                                            }
                                        )
                                    }}/>
                        </div>
                        <div className={"fieldBlock"}>
                            <div className="inputLabel">Адреса</div>
                            <input id={"address"} className={"inputItem "}
                                   defaultValue={this.state.student.address}
                                   onChange={this.onChangeEvent}/>
                        </div>
                    </div>


                    <div className={"doubleSection"}>
                        <div className={"fieldBlock"}>
                            <div className="inputLabel">Професія</div>
                            <Select id={"prof"} className={""}
                                    value={{label: this.state.student.prof}}
                                    styles={customStyles}
                                    options={this.state.professions}
                                    onChange={(event) => {
                                        console.log(event)
                                        const s = {...this.state.student, prof: event.value}
                                        console.log(s)
                                        this.setState(
                                            {
                                                student: s
                                            }
                                        )
                                    }}
                            />
                        </div>
                        <div className={"fieldBlock"}>
                            <div className="inputLabel">ВНЗ</div>

                            <Select className={""} id={"vnz"}
                                    value={{label: this.state.student.vnz}}
                                    styles={customStyles}
                                    options={this.state.vnzes}
                                    onChange={(event) => {
                                        console.log(event)
                                        const s = {...this.state.student, vnz: event.value}
                                        console.log(s)
                                        this.setState(
                                            {
                                                student: s
                                            }
                                        )
                                    }}
                            />
                        </div>
                    </div>


                    <div className={"doubleSection"}>

                        <div className={"fieldBlock"}>

                            <div className="inputLabel">Номер телефону</div>

                        <input id={"tel"} className={"inputItem "}
                               onChange={this.onChangeEvent} defaultValue={this.state.student.tel}/>

                        </div>

                        <div className="fieldBlock">
                            <div className="inputLabel">Електронна пошта</div>
                        <input id={"email"} className={"inputItem "}
                               onChange={this.onChangeEvent} defaultValue={this.state.student.email}/>
                        </div>
                    </div>


                    <div className={" buttonsSection"}>
                        <span>У майбутньому: вступив чи ні в НУВГП?</span>
                        <input id={"isJoined"} className={"inputData mt-1 ml-4"} type={"checkbox"}
                               onChange={this.toggleCheckBox}/>
                    </div>


                    <div className={" buttonsSection"}>
                        <button className="mr-lg-5 mr-md-3 mr-2" type={"submit"}>Зберегти
                        </button>

                        <button className="ml-lg-5 ml-md-3 ml-2" type={"reset"}>Видалити
                        </button>
                    </div>


                    <div className="closeButton" onClick={() => {
                        this.props.closeWindow(null)
                    }}>
                        Close
                    </div>

                    </div>


                </form>

        )
    }

}
/*const mobileStyles={
    option: () => ({
        padding: 20,
    }),
    control: (provided) => ({
        // none of react-select's styles are passed to <Control />
        ...provided,
        width: 290,
        height: 35,
        padding: '0px 20px',
        border: '2px solid 0d5b85',
        borderRadius: 15,
        lineHeight: 1,
        textAlign: 'left',
        zIndex: 0,

        '&:hover': {
            backgroundColor: '#d9d9d9'
        }
    })
};*/
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
            outline: 'none'
        },
        '&:focus': {
            outline: 'none'
        }
    })


};
const mapStateTopProps = (state) => ({
    studentId: state.tableReducer.currentStudentId
});

const mapDispatchToProps = (dispatch) => ({
    closeWindow: (id) => {
        dispatch(toggleModal());
        dispatch(changeCurrentId(id));
    },
    fetchAxios: (persons) => dispatch(fetchData(persons)),
    rerenderTable: (flag) => dispatch(renderTable(flag))
});

export default connect(mapStateTopProps, mapDispatchToProps)(Window)

