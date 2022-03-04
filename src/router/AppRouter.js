import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import { startChecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';

export const AppRouter = () => {
    const dispatch = useDispatch();
    const {checking} = useSelector( state => state.auth );

    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch]);
   
    if(checking) {
        return <h5>Espere...</h5>
    }

    return (
        <Router>
            <div>
                <Routes>

                    <Route exact path='/login' element={<LoginScreen />} />

                    <Route path='/' element={<CalendarScreen />} />

                    <Route path='*' element={<Navigate replace to='/' />} />

                </Routes>
            </div>
        </Router>
    )
}
