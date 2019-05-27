import React from 'react';
import {connect} from 'react-redux'
import StudentsRegistration from './InfoSectionComponents/StudentsRegistration'
import TableStudentsInfo from './InfoSectionComponents/TableStudentsInfo'
import DiagramStudentsInfo from './InfoSectionComponents/DiagramStudentsInfo'
import Sidebar from './leftSideBar';
import {Route, Switch} from "react-router";

class InfoSection extends React.Component {
    changeInfoSection = (idOfSection) => {
        switch (idOfSection) {
            case "Реєстрація":
                return <StudentsRegistration/>
            case "Списки студентів":
                return <TableStudentsInfo/>
            case "Статистика":
                return <DiagramStudentsInfo/>
            default:
                return "Error"
        }
    };

    render() {


        return (
            <section className="Page">

                    {this.props.isPopupBtnClicked ? <div className="SideBar "> <Sidebar/></div> : null}

                <div className="currentSection">
                    <Switch>
                        <Route path={'/mainpage/registration'} component={StudentsRegistration} />
                        <Route path={'/mainpage/table'} component={TableStudentsInfo} />
                        <Route path={'/mainpage/diagrams'} component={DiagramStudentsInfo} />
                    </Switch>
                </div>

            </section>
        )
    }
}


const mapStateToProps = state => ({
    isPopupBtnClicked: state.mainReducer.isPopupBtnClicked
});
export default connect(mapStateToProps, null)(InfoSection);

