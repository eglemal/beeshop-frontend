import React from "react";
import ButtonWithProgress from "../components/ButtonWithProgress";
import Input from '../components/Input';
import {connect} from 'react-redux';
import * as authActions from '../redux/authActions';
import authReducer from "../redux/authReducer";

export class RegistrationPage extends React.Component {

    state = {
        username: "",
        email: "",
        password: "",
        passwordRepeat: "",
        pendingApiCall: false,
        errors: {},
        passwordRepeatConfirmed: false
        
    }


    onChangeUsername = (event) => {
        const value = event.target.value;
        const errors = { ...this.state.errors };
        delete errors.username;
        this.setState({ username: value, errors });
      };
    
      onChangeEmail = (event) => {
        const value = event.target.value;
        const errors = { ...this.state.errors };
        delete errors.email;
        this.setState({ email: value, errors });
      };
    
      onChangePassword = (event) => {
        const value = event.target.value;
        const passwordRepeatConfirmed = this.state.passwordRepeat === value;
        const errors = { ...this.state.errors };
        delete errors.password;
        errors.passwordRepeat = passwordRepeatConfirmed
          ? ""
          : "Does not match to password";
        this.setState({ password: value, passwordRepeatConfirmed, errors });
      };
    
      onChangePasswordRepeat = (event) => {
        const value = event.target.value;
        const passwordRepeatConfirmed = this.state.password === value;
        const errors = { ...this.state.errors };
        errors.passwordRepeat = passwordRepeatConfirmed
          ? ""
          : "Does not match to password";
        this.setState({ passwordRepeat: value, passwordRepeatConfirmed, errors });
      };

      onClickRegister = () => {
        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        };
        this.setState({pendingApiCall:true});
        this.props.actions
            .postRegister(user)
            .then((response) => {
                this.setState({pendingApiCall:false}, () => {
                    this.props.history.push("/");
                });
              
            }).catch((apiError) => {
                let errors = { ...this.state.errors}
                if(apiError.response.data && apiError.response.data.validationErrors) {
                    errors = {...apiError.response.data.validationErrors}
                }
                this.setState({pendingApiCall:false, errors});
            })
      }

    render() {
        return (
            <div className="loginpage">
                <div className="container">
                    <h1 className="text-center">Register</h1>
                    <div className="col-12 mb-3">
                        <Input 
                            label="Username"
                            placeholder="Your name" 
                            value={this.state.username} 
                            onChange={this.onChangeUsername}
                            hasError={this.state.errors.username && true}
                            error={this.state.errors.username}
                        />
                    </div>
                    <div className="col-12 mb-3">
                        <Input
                            label="Users Email" 
                            placeholder="Your email" 
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                            hasError={this.state.errors.email && true}
                            error={this.state.errors.email}
                        />
                    </div>
                    <div className="col-12 mb-3">
                        <Input 
                            label="Password"
                            placeholder="Your password" 
                            type="password" 
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            hasError={this.state.errors.password && true}
                            error={this.state.errors.password}
                        />
                    </div>
                    <div className="col-12 mb-3">
                        <Input 
                            label="Repeat users password"
                            placeholder="Repeat your password" 
                            type="password" 
                            value={this.state.repeatPassword}
                            onChange={this.onChangePasswordRepeat}
                            hasError={this.state.errors.passwordRepeat && true}
                            error={this.state.errors.passwordRepeat}
                        />
                    </div>
                    <div className="text-center">
                        <div className="text-center">
                        <ButtonWithProgress
                            onClick={this.onClickRegister}
                            disabled={
                            this.state.pendingApiCall || !this.state.passwordRepeatConfirmed
                            }
                            pendingApiCall={this.state.pendingApiCall}
                            text="Register"
                        />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

RegistrationPage.defaultProps = {
    actions: {
      postRegister: () =>
        new Promise((resolve, reject) => {
          resolve({});
        }),
    },
    history: {
      push: () => {},
    },
  };

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            postRegister: (user) => dispatch(authActions.registerHandler(user))
        }
    }
}

export default connect(null, mapDispatchToProps)(RegistrationPage);

