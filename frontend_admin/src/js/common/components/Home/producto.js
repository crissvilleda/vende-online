import React from "react";
import Imagen from "../../../../assets/img/noImage.png";


const Producto = (props) => {
    const { producto, me, ComprarBtn } = props;
    // const disable = !!((me && me.username === producto.usuario));
    const disable = !!((me && (me.username === producto.usuario)) || producto.cantidad <= 0);
    return (
        <div className="container__producto">
            <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>{producto.nombre}</h3>
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
            <p style={{fontSize: "14px", fontWeight:"bold"}}>Descripción del producto: </p>
            <p>{producto.descripción}</p>
            <p style={{ fontWeight: "bold", fontSize: "14px" }}>
                Cantidad disponible:
                {` ${producto.cantidad}`}
            </p>
            <p style={{fontSize: "12px", fontWeight: "bold"}}>
                Vendido por:
                {` ${producto.usuario}`}
            </p>
            <div style={{ marginTop: "10px" }}>
                <button disabled={disable} onClick={() => ComprarBtn(producto)} className="btn btn-primary btn-sm" type="button">
                    Comprar
                </button>
            </div>
        </div>
    );
};

export default Producto;
