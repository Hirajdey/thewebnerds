import React, { Component } from "react";
import {Link} from "@reach/router";


class Navbar extends Component{
  render(){
    return(
       <nav className="container navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Navbar;

