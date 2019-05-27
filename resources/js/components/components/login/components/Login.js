import React from "react";
//import GoogleLogin from 'react-google-login';
import {connect} from 'react-redux';
import './Login.css';
import MdCheckmark from 'react-ionicons/lib/MdCheckmark'
import IosAlert from 'react-ionicons/lib/IosAlert'
import blue from '@material-ui/core/colors/blue';

import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


import {signedInSucessfully, loginFailure} from '../../../redux/actions';
import {Link} from "react-router-dom";

const styles = theme => ({
    root: {
        width: 200,
        '&:after': {
            borderBottomColor: blue[800],
        },

        cssLabel: {
            '&$cssFocused': {
                color: blue[800],
            },

        }
    },

});


class Login extends React.Component {
    state = {
        login: '1',
        password: '1',
        link: "/",
        logcheck: false,
        passcheck: false
    };

    checkLog = () => {
        var log = document.getElementById('login').value;
        if (log === this.state.login) {
            this.setState({logcheck: true})
        } else {
            this.setState({logcheck: false})
        }
    };
    checkPass = () => {
        var pass = document.getElementById('password').value;
        if (pass === this.state.password) {
            this.setState({passcheck: true})
        } else {
            this.setState({passcheck: false})
        }
    };

    checkAuth = () => {
        if (log === this.state.login && pass === this.state.password) {
            this.setState({check: true})
            //this.props.successHandler();
        } else alert('Пароль чи логін введено невірно.')
    };

    render() {
        const {classes} = this.props;
        const linkTrue = <Link id="submitLink" to={'/mainpage/registration'}>Submit</Link>;
        const linkFalse = <Link id="submitLink" to={'/'}>Submit</Link>;
        return (
            <div className="Auth">
                <form className="authForm">

                    <div className="Field">
                        <label className="authInputBlock">
                            <TextField
                                InputLabelProps={{
                                    classes: {
                                        label: classes.cssLabel
                                    },
                                }}
                                InputProps={{
                                    classes: {
                                        root: classes.root
                                    },
                                }}
                                id="login"
                                label="Login"
                                type="text"
                                margin="normal"
                                onBlur={() => this.checkLog()}

                            />
                        </label>
                        <div className="CheckBox">
                            {this.state.logcheck ? <MdCheckmark fontSize="40px" color="#43853d"/>
                                : <IosAlert fontSize="40px" color="#A81D1D"/>}
                        </div>

                    </div>


                    <div className="Field">

                        <label className="authInputBlock">
                            <TextField
                                InputLabelProps={{
                                    classes: {
                                        label: classes.cssLabel
                                    },
                                }}
                                InputProps={{
                                    classes: {
                                        root: classes.root
                                    },
                                }}
                                id="password"
                                label="Password"
                                type="password"
                                margin="normal"
                                onBlur={() => this.checkPass()}
                            />
                        </label>

                        <div className="CheckBox">
                            {this.state.passcheck ? <MdCheckmark fontSize="40px" color="#43853d"/>
                                : <IosAlert fontSize="40px" color="#A81D1D"/>}
                        </div>
                    </div>

                    <div className="authInputBlock submit" onClick={() => this.checkAuth()}>
                        {this.state.logcheck && this.state.passcheck ? linkTrue : linkFalse}
                    </div>

                </form>
            </div>
        )
    }

}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    signedIn: state.mainReducer.isSignedIn
});
const mapDispatchToProps = dispatch => ({
    successHandler: response => dispatch(signedInSucessfully(response)),
    FailureHandler: response => dispatch(loginFailure(response))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));
