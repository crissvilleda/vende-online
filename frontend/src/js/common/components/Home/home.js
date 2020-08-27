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

    realizarCompra = (data) => {
        const { RealizarCompra, producto } = this.props;
        RealizarCompra(data, producto);
    }

    render() {
        const { productos, me, showModal, ComprarBtn, CancelarCompra, producto, onChangeField, update, getProductos } = this.props;
        if (update) {
            getProductos();
        }
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
                    <ComprarForm
                        onSubmit={this.realizarCompra}
                        producto={producto}
                        CancelarCompra={CancelarCompra}
                        onChangeField={onChangeField}
                    />
                </Modal>

            </React.Fragment>
        );
    }
}

export default Home;
