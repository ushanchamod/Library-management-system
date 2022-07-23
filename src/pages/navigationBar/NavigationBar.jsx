import { useState } from "react";
import "./Nav.scss";
import { Link } from "react-router-dom";

export default function NavigationBar(props) {
  const[clicked, isClicked] = useState(true);


  return (
    <div className="nav-bar">
      <nav>
        <div className="left">
          <Link to="/home">
            <h6>LIBRARY</h6>
          </Link>
        </div>

        <div>
          <code style={{ color: "#fff", fontSize: "15px" }}>{props.name}</code>
        </div>

        <div className="right">
          <span className="plus-a" onClick={() => {isClicked(!clicked)}}>
            <i className="fa-solid fa-plus plus" />
          </span>
          <Link to="/book" state={{ condition: "out" }} className="out-a">
            <i className="fa-solid fa-receipt" />
          </Link>
        </div>
      </nav>
      <div className="alert" style={clicked ? {display:"none"} : null}>

        <div className="close"><i className="fa-solid fa-rectangle-xmark" onClick={() => {isClicked(!clicked)}}/></div>

        <div className="left-btn">
          <Link to="/addbook">
            <button>Add Book</button>
          </Link>
        </div>
        <div className="right-btn">
          <Link to="/addcategory">
            <button>Add Category</button>
          </Link>
        </div>

      </div>
    </div>
  );
}
