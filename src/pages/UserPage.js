import React from "react";
import * as apiCalls from "../api/apiCalls";
import { connect } from "react-redux";

class UserPage extends React.Component {

    state = {
        user: undefined,
        userNotFound: false,
        isLoadingUser: false,
        errors: {},
    };

    componentDidMount() {
        this.loadUser();
    }

    loadUser = () => {
        const username = this.props.match.params.username;
        if (!username) {
            return;
        }
        this.setState({ userNotFound: false, isLoadingUser: true });
        apiCalls
            .getUser(username)
            .then((response) => {
                this.setState({ user: response.data, isLoadingUser: false });
            })
            .catch((error) => {
                this.setState({
                    userNotFound: true,
                    isLoadingUser: false,
                });
            });
    };

    render() {
        let pageContent;
        if (this.state.isLoadingUser) {
            pageContent = <div>Loading...</div>;
        } else if (this.state.userNotFound) {
            pageContent = (
                <div className="alert alert-danger text-center">
                    <div className="alert-heading">
                        <i className="fas fa-exclamation-triangle fa-3x"></i>
                    </div>
                    <h5>User not found</h5>
                </div>
            );
        } else {
            const isEditable =
                this.props.loggedInUser.username === this.props.match.params.username;
            pageContent = this.state.user && (
                <div user={this.state.user} errors={this.state.errors} >UserPage</div>
            );
        }
        return (
            <div className="userpage">
                <div user={this.props.match.params.username}>{pageContent}</div>
            </div>
        )
    }
}

UserPage.defaultProps = {
    match: {
        params: {},
    },
};

const mapsStateToProps = (state) => {
    return {
        loggedInUser: state,
    };
};

export default connect(mapsStateToProps)(UserPage);