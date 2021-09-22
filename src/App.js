import './App.css';
import { Route, Redirect, Switch } from "react-router-dom";
import { lazy, Suspense } from "react";
const Login = lazy(() => import("./views/Login/Login"));
const Home = lazy(() => import("./views/Home/Home"));

function App() {
  return (
    <div className="App">
      <Suspense fallback="Loading">
      <header className="App-header">
       Hack Ideas
      </header>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/login' />
          </Route>
          <Route path='/login' component={Login}/>
          <Route path='/home' component={Home}/>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
