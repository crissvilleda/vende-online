import { connect } from "react-redux";
import { getMe } from "../../../redux/modules/cuenta/login"
import Home from "./home";
import { actionsHome } from '../../../redux/modules/home/home'

const ms2p = (state) => {
    return {
        ...state.login,
        ...state.home,
    };
};

const md2p = { ...actionsHome,
    getMe };

export default connect(ms2p, md2p)(Home);
