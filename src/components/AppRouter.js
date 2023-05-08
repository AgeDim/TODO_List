import React, {useContext} from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {authRoutes, publicRoutes} from "../utils/routes";
import {LOGIN_ROUTE, MAIN_ROUTE} from "../utils/consts";

const AppRouter = observer(() => {
    const {user} = useContext(Context)
    return (<Switch>
            {user.isAuth && authRoutes.map(({path, Component}) => <Route key={path} path={path} component={Component}
                                                                         exact/>)}
            {!user.isAuth && publicRoutes.map(({path, Component}) => <Route key={path} path={path} component={Component}
                                                                            exact/>)}
            <Redirect to={user.isAuth ? MAIN_ROUTE : LOGIN_ROUTE}/>
        </Switch>

    );
});

export default AppRouter;