import React from "react";
import * as apiCalls from "../api/apiCalls";
import { connect } from "react-redux";
import * as authActions from '../redux/authActions';


class OneProductPage extends React.Component {

    state = {
        product: undefined,

    }

    componentDidMount() {
        this.loadProduct();
    }

    loadProduct = () => {

        const productName = this.props.match.params.productName;
        if (!productName) {
            return;
        }
        apiCalls.getProductByName(productName)
            .then((response) => {
                this.setState({ ...response.data });
            })
    }

    render() {
        return (
            <div data-testid="productspage">
                <h1 className="title">ProductPage</h1>
                <ul>
                    <li>
                        <div className="product">
                            <div>
                                <span>
                                    <img className="img" src={"data:;base64," + this.state.image} alt="Bite" width="100" />
                                    <img className="img" src={"data:;base64," + this.state.image2} alt="Bite" width="100" />
                                    <img className="img" src={"data:;base64," + this.state.image3} alt="Bite" width="100" />
                                </span>

                            </div>
                            <h3>{this.state.name}</h3>
                            <p className="price">{this.state.price} pinigeliai</p>
                            <p>{this.state.description}</p>
                            <p><button className="cardButton2">Add to Cart</button></p>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}

OneProductPage.defaultProps = {
    match: {
        params: {},
    },
};

export default OneProductPage;

