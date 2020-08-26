import React from "react";
import Imagen from "../../../../assets/img/noImage.png";

const Producto = (props) => {
    const { producto, me } = props;
    const disable = !!(me && me.username === producto.usuario);
    console.log(disable);
    console.log(producto.usuario);
    console.log(me.username);
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
            <div>
                <button disabled={disable} className="btn btn-primary btn-sm" type="button">
                    Comprar
                </button>
            </div>
        </div>
    );
};

export default Producto;
