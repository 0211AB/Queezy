import { Route, Routes, Navigate } from 'react-router-dom'
import { useContext } from 'react'

import Home from './Components/Home/Home'
import AdminPanel from './Components/AdminPanel/AdminPanel'
import AdminLogin from './Components/AdminLogin/AdminLogin'
import AdminSignup from './Components/AdminSignup/AdminSignup'
import QuizDetails  from './Components/QuizDetails/QuizDetails'

import AuthContext from './Store/auth-context';

import './App.css'
import React from 'react'



export const App = () => {
    const authCtx = useContext(AuthContext);

    return (
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/login/admin' element={<AdminLogin />}></Route>
            <Route path='/signup/admin' element={<AdminSignup />}></Route>
            <Route path='/admin' element={authCtx.isLoggedIn ? <AdminPanel /> : <Navigate to='/login/admin' />}></Route>
            <Route path='/admin/:qid' element={authCtx.isLoggedIn ? <QuizDetails /> : <Navigate to='/login/admin' />}></Route>
        </Routes >
    )
}

