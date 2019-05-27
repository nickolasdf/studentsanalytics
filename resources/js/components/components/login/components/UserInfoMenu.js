import React from 'react'
import {connect} from 'react-redux'

function UserInfoMenu() {
        return(

            <div className={"absBlock"}>
                <div className={"userInfoMenu"}>

                    <div className={"userInfoSection"}>
                        <span>E-mail: {this.props.profileObj.email}</span>
                        <span>Given name: {this.props.profileObj.givenName}</span>
                        <span>Surname: {this.props.profileObj.familyName}</span>
                        <span>Name: {this.props.profileObj.name}</span>
                    </div>
                </div>
            </div>
        )
    }

    const mapStateToProps = state => ({
        profileObj: state.mainReducer.userInfo
    });
    export default connect(mapStateToProps)(UserInfoMenu)
