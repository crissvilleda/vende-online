import React from "react";
import Imagen from "../../../../assets/img/noImage.png";


const Producto = (props) => {
    const { producto, me, ComprarBtn } = props;
    const disable = !!(me && me.username === producto.usuario);
    return (
        <div className="container__producto">
            <h3>{producto.nombre}</h3>
            <div className="container__img">
                {producto.imagen ? (
                    <img
                        src={producto.imagen}
                        alt="Esta es la imagen del producto"
                    />
                ) : (
                    <img src={Imagen} alt="Esta es la imagen del producto" />
                )}
            </div>
            <br />
            <p>{producto.descripción}</p>
            <p style={{fontWeight:"bold"}}>
                <b>Cantidad disponible: </b>
                {producto.cantidad}
            </p>
            <div style={{marginTop : "10px"}}>
                <button disabled={disable} onClick={() => ComprarBtn(producto)} className="btn btn-primary btn-sm" type="button">
                    Comprar
                </button>
            </div>
        </div>
    );
};

export default Producto;
