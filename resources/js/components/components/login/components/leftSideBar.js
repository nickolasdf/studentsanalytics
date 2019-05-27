import React from 'react'
import {connect} from 'react-redux';
import './Sidebar.css';
import {FaAddressBook, FaChartBar, FaTable} from "react-icons/fa";
import {changeSection} from "../../../redux/actions";
import {Link} from "react-router-dom";

class Sidebar extends React.Component {
    onClickChange = (id) => {
        this.props.changeInfoSection(id);
    };
    render(){
        return(
            <aside className="aside">

                <Link to={'/mainpage/registration'} id="Registration" className={this.props.currentInfoSection
                ==="Реєстрація" ? "currentAsideItem" : "asideItem"}
                              onClick={() => {
                                  this.onClickChange("Реєстрація")
                              }}>
                    <FaAddressBook className="icon" size={46}/>
                    <p className="asideLabels">Реєстрація</p>
                </Link>


                <Link to={'/mainpage/table'}  id="ListOfStudents"  className={this.props.currentInfoSection
                ==="Списки студентів" ? "currentAsideItem" : "asideItem"}
                              onClick={() => {
                                  this.onClickChange("Списки студентів")
                              }}>
                    <FaTable className="icon" size={46}/>
                    <p className="asideLabels">Таблиця</p>
                </Link>



                <Link to={'/mainpage/diagrams'} id="Statistic"  className={this.props.currentInfoSection
                ==="Статистика" ? "currentAsideItem" : "asideItem"}
                              onClick={() => {
                                  this.onClickChange("Статистика")
                              }}>
                    <FaChartBar className="icon" size={46}/>
                    <p className="asideLabels">Статистика</p></Link>

            </aside>
        )
    }
}
const mapStateToProps = state => ({
    currentInfoSection: state.mainReducer.currentInfoSection
});
const mapDispatchToProps = (dispatch) => ({
    openPopupMenu: () => {
        dispatch({type: "OPEN_POPUP_MENU"})
    },

    changeInfoSection: (id) => dispatch(changeSection(id))

});


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);