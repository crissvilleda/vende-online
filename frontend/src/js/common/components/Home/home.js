import React, { Component } from "react";
import Producto from "./producto";
import Modal from '../Utils/Modal/Modal';
import "./style.css";
import ComprarForm from './ComprarForm';

class Home extends Component {
    componentWillMount = () => {
        const { getProductos } = this.props;
        getProductos();
    };

    /* isAuthenticated = () => {
        const token = localStorage.getItem("token");
        const { getMe, me } = this.props;
        if (!!token && !!me.username) {
            return true;
        }
        if (token) {
            getMe();
            return "Verifying";
        }
    }; */
    realizarCompra = (data) => {
        const { RealizarCompra, producto } = this.props;
        RealizarCompra();
        console.log(producto);
        console.log({ data, producto });
    }

    render() {
        const { productos, me, showModal, ComprarBtn, CancelarCompra, producto, RealizarCompra } = this.props;
        /* //this.isAuthenticated();
        console.log(me) */
        return (
            <React.Fragment>
                <br />
                <h3 className="uk-margin-large-left">Productos</h3>
                <div className="container__flex">
                    {productos.results.map((producto, index) => (
                        <Producto key={index} producto={producto} me={me} ComprarBtn={ComprarBtn} />
                    ))}
                </div>
                <Modal titulo="Realizar Compra" showModal={showModal}>
                    <ComprarForm onSubmit={this.realizarCompra} producto={producto} CancelarCompra={CancelarCompra} />
                </Modal>

            </React.Fragment>
        );
    }
}

export default Home;
