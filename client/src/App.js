import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/Landing/LandingPage";
import Home from "./components/Home/Home";


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route exact={true} path="/home" component={Home}/>
        <Route />
        <Route />
      </Switch>
      <h1>Henry Countries by Gurokawa</h1>
    </div>
    </BrowserRouter>
  );
}

export default App;
