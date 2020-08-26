import { actions } from "../../../redux/modules/productos/producto";
import { connect } from "react-redux";
import Productos from "./producto";

const ms2p = (state) => {
    return {
        ...state.productos,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(Productos);
