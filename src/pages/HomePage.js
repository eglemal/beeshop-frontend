import React from "react";
import { connect } from "react-redux";


class HomePage extends React.Component {
    render() {
        return (
            <div className="homepage" data-testid="homepage">
                <h1 className="homepageTitle">HomePage</h1>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        loggedInUser: state,
    };
};

export default connect(mapStateToProps)(HomePage);

