import React from "react";
import Header from "./components/Header";
import InfoSection from "./components/InfoSection";
import ModalWindow from "./components/InfoSectionComponents/TableComponents/ModalWindow/modalWindow"
import './index.css';
import {connect} from "react-redux";


class MainPage extends React.Component {

    render(){
        return(
            <div className={ this.props.modalIsOpen ? "WindowBlurred" : "Window"}>
                <Header/>
                <div className="mainSection">
                   <InfoSection/>
                </div>
                <div className={ this.props.modalIsOpen ? "WindowWrapper" : ""}>
                    <ModalWindow/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    modalIsOpen: state.tableReducer.isModalOpen
})



export default connect(mapStateToProps)(MainPage);



