import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./components/About";
import Header from "./components/Header";
import Home from "./Home";

export default function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path='/about'>
            <About />
          </Route>

          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
