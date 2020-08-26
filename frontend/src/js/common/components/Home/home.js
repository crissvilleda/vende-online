import React, { Component } from "react";
import Producto from "./producto";
import "./style.css";


class Home extends Component {
    componentWillMount = () => {
        const { getProductos } = this.props;
        getProductos();
    };

    isAuthenticated = () => {
        const token = localStorage.getItem("token");
        const { getMe, me } = this.props;
        if (!!token && !!me.username) {
            return true;
        }
        if (token) {
            getMe();
            return "Verifying";
        }
    };

    render() {
        const { productos, me } = this.props;
        this.isAuthenticated();
        console.log(this.props);
        return (
            <React.Fragment>
                <br />
                <h3 className="uk-margin-left" >Productos</h3>
                <div className="container__flex">
                    {productos.results.map((producto, index) => (
                        <Producto key={index} producto={producto} me={me} />
                    ))}
                </div>
            </React.Fragment>
        );
    }
}

export default Home;
