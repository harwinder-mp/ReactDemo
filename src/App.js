import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import ListItms from "./components/itemsList";
import SinglePost from "./components/single";
import "./App.css";

function App() {
  return (
    <Switch>
      <Route path="/post" exact component={ListItms} />
      <Route path="/post" component={SinglePost} />
      <Redirect path="/" to="/post" />
    </Switch>
  );
}

export default App;
