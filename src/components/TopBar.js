import React from "react";
import logo from "../images/eshoplogo.jpg";
import { Link } from "react-router-dom";
import { MenuItems } from "./MenuItems";
import '../App';
import { connect } from 'react-redux';

class TopBar extends React.Component {
  state = {
    dropDownVisible: false,
  };

  componentDidMount() {
    document.addEventListener("click", this.onClickTracker);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.onClickTracker);
  }

  onClickTracker = (event) => {
    if (this.actionArea && !this.actionArea.contains(event.target)) {
      this.setState({
        dropDownVisible: false,
      });
    }
  };

  onClickLogout = () => {
    this.setState({
      dropDownVisible: false,
    });
    const action = {
      type: "logout-success",
    };
    this.props.dispatch(action);
  };

  onClickMyCart = () => {
    this.setState({
      dropDownVisible: false,
    });
  };

  assignActionArea = (area) => {
    this.actionArea = area;
  };

  render() {
    let links = (
      <ul className="nav navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/products" className="nav-link">
            Products
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    );
    if (this.props.user.isLoggedIn) {
      links = (
        <ul className="nav navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/products" className="nav-link">
              Products
          </Link>
          </li>
          <li className="nav-item">
            <Link to={`/users/${this.props.user.username}`} className="nav-link" onClick={this.onClickMyCart}>
              My Cart
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={this.onClickLogout} style={{ cursor: "pointer" }}>
              Logout
            </Link>
          </li>
        </ul>
      )
    }
    return (
      <nav >
        <div className="bg-white shadow-sm mb-2">
          <div className="container">
            <nav className="navbar navbar-light navbar-expand">
              <Link className="bee" to="/">
                <img src={logo} width="100" alt="Bee" /> BeeShop
              </Link>
              <div className="links">
                {links}
              </div>
            </nav>
          </div>
        </div>
      </nav>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    user: state
  }
}

export default connect(mapStateToProps)(TopBar);
