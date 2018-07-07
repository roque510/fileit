import "./menuBar.css";
import React from "react";
import Logo from "../logo/logo";

function template() {
  return (
    <div className="menu-bar">
    	<Logo iconWidth="30" iconHeight="30" fontSize="20" className="f1"></Logo>
    	<div className="bar f1"></div>
      <ul className="snip1189 f20">
		  <li className="current"><a href="">Inicio</a></li>
		  <li><a href="">Perfil</a></li>
		  <li><a href="">Ligas</a></li>
		  <li><a href="">Apuestas</a></li>
		</ul>
		
		<div className="f1" >
			<h3 href="" onClick={this.props.signOut} className=" pointer"><i className="material-icons">highlight_off</i>Sign Out</h3>
		</div>

		
    </div>
  );
};

export default template;
