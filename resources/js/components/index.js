import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import store from "./redux/store";
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Login from "./components/login/components/Login";
import MainPage from "./components/login/MainPage";

export default App;

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>

            <Switch> /*InfoSection компонент має дочєрні маршрути */
                <Route exact path="/" component={Login}/>
                <Route path="/mainpage/registration" component={MainPage}/>
                <Route path="/mainpage/table" component={MainPage}/>
                <Route path="/mainpage/diagrams" component={MainPage}/>
            </Switch>

        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));

