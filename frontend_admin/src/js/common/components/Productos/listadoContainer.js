import { actions } from "../../../redux/modules/productos/producto";
import { connect } from "react-redux";
import ListaProductos from "./listaProductos";

const ms2p = (state) => {
    return {
        ...state.productos,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(ListaProductos);
