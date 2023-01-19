import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/Landing/LandingPage";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail";
import Form from "./components/Form/Form";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact={true} path="/home" component={Home} />
          <Route path="/home/:id" component={Detail} />
          <Route path="/form" component={Form} />
        </Switch>
        <div className="credits">
          <div className="creditsContent">Henry Countries by Gurokawa</div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
