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
import Quizzes from './Components/Quizzes/Quizzes'



export const App = () => {
    const authCtx = useContext(AuthContext);

    return (
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/quizzes' element={<Quizzes/>}></Route>
            <Route path='/admin/login' element={<AdminLogin />}></Route>
            <Route path='/admin/signup' element={<AdminSignup />}></Route>
            <Route path='/admin/:id' element={authCtx.isLoggedIn ? <AdminPanel val="1"/> : <Navigate to='/admin/login' />}></Route>
            <Route path='/admin/create/:id' element={authCtx.isLoggedIn ? <AdminPanel val="2"/> : <Navigate to='/admin/login' />}></Route>
            <Route path='/admin/tests/:id' element={authCtx.isLoggedIn ? <AdminPanel val="3" /> : <Navigate to='/admin/login' />}></Route>
            <Route path='/admin/generate/:id' element={authCtx.isLoggedIn ? <AdminPanel val="1"/> : <Navigate to='/admin/login' />}></Route>
            <Route path='/admin/analytics/:id' element={authCtx.isLoggedIn ? <AdminPanel val="4"/> : <Navigate to='/admin/login' />}></Route>
            <Route path='/:qid' element={<QuizDetails/>}></Route>
        </Routes >
    )
}

