import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage.jsx";
import AboutPage from "./about/AboutPage.jsx";
import Header from "./common/Header.jsx";
import PageNotFound from "./PageNotFound.jsx";
import CoursesPage from "./courses/CoursesPage.jsx";
import ManageCoursePage from "./courses/ManageCoursePage.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Switch = only one route should match
function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/courses" component={CoursesPage} />
        <Route path="/course/:slug" component={ManageCoursePage} />
        <Route path="/course" component={ManageCoursePage} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
