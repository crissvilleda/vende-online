import React from "react";
import { Field, reduxForm } from "redux-form";
import { renderField, renderCurrency } from "../Utils/renderField";

const validate = (values) => {
    const errors = {};
    if (!values.nombre) {
        errors.nombre = "Campo requerido";
    }
    if (!values.dirección) {
        errors.dirección = "Campo requerido";
    }
    if (!values.teléfono) {
        errors.teléfono = "Campo requerido";
    }
    if (!values.cantidad) {
        errors.cantidad = "Campo requerido";
    }

    return errors;
};

const ComprarForm = (props) => {
    const { CancelarCompra, producto, handleSubmit, onChangeField } = props;
    return (
        <form onSubmit={handleSubmit} className="container__comprar">
            <div>
                <h3 style={{ fontSize: "18px", marginBottom: "5px" }}>
                    Detalle Compra
                </h3>
                <p style={{ fontSize: "14px" }}>
                    <b>Nombre producto: </b>
                    {producto.nombre}
                    <br />
                    <b>Precio: </b>
                    {producto.precio}
                </p>
            </div>
            <div>
                <label>Cantidad deseada: </label>
                <Field
                    name="cantidad"
                    type="number"
                    onChange={e => onChangeField(e.target.value, producto.precio)
                    }
                    component={renderField}
                />
                <label>Total: </label>
                <Field name="total" type="number" component={renderCurrency} disabled />
            </div>
            <h4 style={{ fontSize: "18px" }}>Datos personales</h4>
            <hr />
            <label>Nombre: </label>
            <Field name="nombre" component={renderField} />
            <label>Direccion</label>
            <Field name="dirección" component={renderField} />
            <label>Telefono</label>
            <Field name="teléfono" component={renderField} type="number" />
            <div className="uk-flex uk-flex-between uk-margin-top">
                <button className="btn btn-primary btn-sm" type="submit">
                    Comprar
                </button>
                <button
                    onClick={() => CancelarCompra()}
                    className="btn btn-secondary btn-sm"
                    type="button"
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
};

export default reduxForm({
    form: "ComprarForm",
    validate,
})(ComprarForm);
