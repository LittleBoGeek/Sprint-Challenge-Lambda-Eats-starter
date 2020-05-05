import React from "react";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Form from './Form'


const App = () => {
  
  return (
    <div>
      <h1>Lambda Eats</h1>
      <div className="header">Header</div>
       <Link to="/pizza"> Order Pizza </Link> 
      <Route exact path="/pizza" component={Form}/>
    </div>
  );
};
export default App;
