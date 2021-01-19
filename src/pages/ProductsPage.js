import React from "react";
import { Link } from "react-router-dom";
import * as apiCalls from '../api/apiCalls';
import { connect } from 'react-redux';
import { queryByText } from "@testing-library/react";


class ProductsPage extends React.Component {

    state = {
        products: [],
    }

    componentDidMount = () => {
        apiCalls.getProducts().then((response) => {
            const products = response.data;
            this.setState({ ...this.state, products });

        });
    }

    onClickProduct = (productName) => {
        apiCalls.getProductByName(productName).then((response) => {
            this.props.history.push("/product/${productName}");

        })
    }

    onClickAddNotLoggedIn = () => {
        this.props.history.push("/login");
    }

    onClickAddLoggedIn = () => {

    }

    checkIfUserLoggedIn = this.props.user.isLoggedIn;
    render() {


        let listProducts = this.state.products.map((product) =>

            <li key={product.id}>
                <Link to={`/product/${product.productName}`}>
                    <img src={"data:;base64," + product.image} alt={product.productName} width="100" />
                </Link>
                <h3>{product.productName}</h3>
                <p className="price">{product.price} pinigeliai</p>
                <p>{product.description}</p>
                <p><button className="cardButton" onClick={this.onClickAddLoggedIn}>Add to Cart</button></p>
            </li>
        );

        if (!this.checkIfUserLoggedIn) {
            listProducts = this.state.products.map((product) =>

                <li key={product.id}>
                    <Link to={`/product/${product.productName}`}>
                        <span>
                            <img className="img" src={"data:;base64," + product.image} alt={product.productName} width="100" />
                            <img className="img" src={"data:;base64," + product.image2} alt={product.productName} width="100" />
                            <img className="img" src={"data:;base64," + product.image3} alt={product.productName} width="100" />
                        </span>

                    </Link>
                    <h3>{product.productName}</h3>
                    <p className="price">{product.price} pinigeliai</p>
                    <p>{product.description}</p>
                    <p><button className="cardButton" onClick={this.onClickAddNotLoggedIn}>Add to Cart</button></p>
                    <h1>-----------------------------------------------------------------------------</h1>
                </li>
            );
        }

        return (
            <div data-testid="productspage">
                <h1 className="title">ProductsPage</h1>
                <ul className="productsList">
                    {listProducts}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state
    }
}

export default connect(mapStateToProps)(ProductsPage);