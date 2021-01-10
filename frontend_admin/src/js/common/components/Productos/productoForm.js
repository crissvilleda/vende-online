import React from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { renderField, renderCurrency } from "../Utils/renderField";
import { renderFilePicker } from "../Utils/renderField/renderField";

const validate = (values) => {
    const errors = {};
    if (!values.nombre) {
        errors.nombre = 'Campo requerido';
    }
    if (!values.descripción) {
        errors.descripción = 'Campo requerido';
    }
    if (!values.precio) {
        errors.precio = 'Campo requerido';
    }
    if (!values.cantidad) {
        errors.cantidad = 'Campo requerido';
    }

    return errors;
};

const ProductosForm = (props) => {
    const { setImagen, handleSubmit, ver, actualizar, item } = props;
    return (
        <form
            onSubmit={handleSubmit}
            className="uk-width-1-2 uk-margin-auto card card-small p-3"
        >
            <div className="form-group has-feedback">
                <label>Nombre</label>
                <Field
                    name="nombre"
                    placeholder="Nombre de producto"
                    component={renderField}
                    disabled={ver}
                />
            </div>
            <div className="form-group has-feedback">
                <label>Descripción</label>
                <Field
                    name="descripción"
                    placeholder="Descripción del producto"
                    component={renderField}
                    disabled={ver}
                />
            </div>
            <div className="form-group has-feedback">
                <label>Precio</label>
                <Field
                    name="precio"
                    placeholder="Precio de Venta"
                    component={renderCurrency}
                    disabled={ver}
                />
            </div>
            <div className="form-group has-feedback">
                <label>Cantidad</label>
                <Field
                    name="cantidad"
                    placeholder="Cantidad Disponible"
                    component={renderField}
                    disabled={ver}
                    type="number"
                />
            </div>
            <div className="form-group has-feedback">
                <label>Imagen</label>
                <Field
                    name="imagen"
                    photo={(ver || actualizar) && item.imagen ? item.imagen : null}
                    setFile={setImagen}
                    placeholder="Cantidad Disponible"
                    component={renderFilePicker}
                    disabled={ver}
                />
            </div>
            <div>
                {!ver && (
                    <button
                        type="submit"
                        className="btn btn-primary btn-sm"
                    >
                        {actualizar ? "Actualizar" : "Registrar"}
                    </button>
                )}
                <Link className="btn btn-secondary btn-sm m-2" to="/productos">
                    Cancelar
                </Link>
            </div>
        </form>
    );
};

export default reduxForm({
    form: "ProductosForm",
    validate,
})(ProductosForm);
