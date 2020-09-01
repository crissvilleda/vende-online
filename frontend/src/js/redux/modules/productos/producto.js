import { handleActions } from "redux-actions";
import { api } from "api";
import { NotificationManager } from "react-notifications";
import { createReducer } from "../baseReducer/baseReducer";
import { push } from "react-router-redux";

const reducer = createReducer(
    "productos",
    "productos",
    "ProductosForm",
    "/productos"
);

const registrar = (data = {}, attachments = []) => (dispatch) => {
    api.postAttachments("productos", data, attachments)
        .then((response) => {
            NotificationManager.success(
                "Se a registrado el producto exitosamente",
                "Éxito",
                1000
            );
            dispatch(push('/productos'));
        })
        .catch(() => {
            NotificationManager.error(
                "Error al registrar Producto",
                "Error",
                1000
            );
        })
        .finally(() => {});
};
const update = (id, data = {}, attachments = []) => (dispatch) => {
    console.log(id);
    api.putAttachments(`productos/${id}/`, data, attachments)
        .then((response) => {
            NotificationManager.success(
                "Datos actualizados exitosamente",
                "Éxito",
                1000
            );
            dispatch(push('/productos'));
        })
        .catch(() => {
            NotificationManager.error(
                "Error al actualizar el producto",
                "ERROR",
                1000
            );
        })
        .finally(() => {});
};

export const actions = {
    ...reducer.actions,
    registrar,
    update,
};

export default handleActions(reducer.reducers, reducer.initialState);
