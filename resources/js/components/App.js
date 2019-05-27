import React, {Component} from 'react';
import {Route, Switch, withRouter} from "react-router-dom";
import Login from "./components/login/MainPage";

class App extends Component {

    render() {
        return (
            <div>
                <main>
                    <Switch>
                        <Route path="/" component={Login}/>
                        {/*<Route path="/Login" component={Auth}/>*/}
                    </Switch>
                </main>
            </div>
        );
    }
}

export default withRouter(App);
