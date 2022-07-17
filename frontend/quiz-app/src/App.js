import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";

import Home from "./Components/Home/Home";
import AdminPanel from "./Components/AdminPanel/AdminPanel";
import AdminLogin from "./Components/AdminLogin/AdminLogin";
import AdminSignup from "./Components/AdminSignup/AdminSignup";
import QuizDetails from "./Components/QuizDetails/QuizDetails";
import Result from "./Components/Result/Result";
import Leaders from "./Components/LeaderBoard/Leaders"

import AuthContext from "./Store/auth-context";

import "./App.css";
import React from "react";
import Quizzes from "./Components/Quizzes/Quizzes";
import Quiz from "./Components/Quiz/Quiz";
import LeaderBoard from "./Components/LeaderBoard/LeaderBoard";

export const App = () => {
  const authCtx = useContext(AuthContext);

  return (
    <Routes>
      <Route exact path="/" element={<Home />}></Route>
      <Route exact path="/quizzes" element={<Quizzes />}></Route>
      <Route exact path="/quiz/:qid" element={<QuizDetails />}></Route>
      <Route exact path="/admin/login" element={<AdminLogin />}></Route>
      <Route exact path="/leaderboards" element={<LeaderBoard />} />
      <Route exact path="/leaderboard" element={<Leaders />} />
      <Route exact path="/admin/signup" element={<AdminSignup />}></Route>
      <Route
        exact path="/admin/:id"
        element={
          authCtx.isLoggedIn ? (
            <AdminPanel val="1" />
          ) : (
            <Navigate to="/admin/login" />
          )
        }
      ></Route>
      <Route
        exact path="/admin/create/:id"
        element={
          authCtx.isLoggedIn ? (
            <AdminPanel val="2" />
          ) : (
            <Navigate to="/admin/login" />
          )
        }
      ></Route>
      <Route
        exact path="/admin/tests/:id"
        element={
          authCtx.isLoggedIn ? (
            <AdminPanel val="3" />
          ) : (
            <Navigate to="/admin/login" />
          )
        }
      ></Route>
      <Route
        exact path="/admin/generate/:id"
        element={
          authCtx.isLoggedIn ? (
            <AdminPanel val="1" />
          ) : (
            <Navigate to="/admin/login" />
          )
        }
      ></Route>
      <Route
        exact path="/admin/analytics/:id"
        element={
          authCtx.isLoggedIn ? (
            <AdminPanel val="4" />
          ) : (
            <Navigate to="/admin/login" />
          )
        }
      ></Route>
      <Route exact path="qid/:id" element={<Quiz />}></Route>
      <Route exact path="results/:id" element={<Result />}></Route>
    </Routes>
  );
};
