import React from 'react'
import {connect} from 'react-redux'
import './header.css';
import './userInfo.css';
import {Link} from "react-router-dom";


import {changeSection} from '../../../redux/actions';
import IosMenu from 'react-ionicons/lib/IosMenu';
import MdLogOut from 'react-ionicons/lib/MdLogOut';


import Sidebar from './leftSideBar';

class Header extends React.Component {

    hoverHamburger=()=>{
document.getElementById('iosMenu').color = "red"
    };

    render() {
        return (
            <nav className="navbar-expand-lg navbar-expand-md  navbar-expand-sm headerMenu">


                    <ul className={"list"}>


                            <li className="nav-item ">
                                <i className="fas fa-globe" id={this.props.isPopupBtnClicked ? "roll" : "hamburger"}
                                     onClick={this.props.openPopupMenu}/>
                            </li>

                            <li className="nav-item">
                                <div className="currentPage">{this.props.currentInfoSection}</div>
                            </li>



                            <li className="nav-item">

                                <Link to={"/"} className={"logOut"} onClick={this.props.logOut}>
                                    <div><i className={"fas fa-door-open"}/></div>

                                    <div>Log Out</div>

                                </Link>
                            </li>

                        </ul>
            </nav>
        )
    }
}


const mapStateToProps = (state) => ({
    isUserMenuOpened: state.mainReducer.isUserMenuOpened,
    userInfo: state.mainReducer.userInfo,
    currentInfoSection: state.mainReducer.currentInfoSection,
    profileObj: state.mainReducer.userInfo,

    isPopupBtnClicked: state.mainReducer.isPopupBtnClicked
});


const mapDispatchToProps = (dispatch) => ({
    openPopupMenu: () => {
        dispatch({type: "OPEN_POPUP_MENU"})
    },
    onClickUserIcon: () => {
        dispatch({type: "OPEN_USER_MENU"})
    },
    logOut: () => {
        dispatch({type: "LOG_OUT"})
    },
    changeInfoSection: (id) => dispatch(changeSection(id))

});


export default connect(mapStateToProps, mapDispatchToProps)(Header);
