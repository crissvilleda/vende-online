import React, { Component } from "react";
import Form from "./productoForm";

class Producto extends Component {
    constructor(props) {
        super(props);
        this.state = { imagen: null };
    }

    componentWillMount = () => {
        const { match, leer } = this.props;
        if (match.params.id) {
            const { id } = match.params;
            leer(id);
        }
    };

    setImagen = (imagen) => {
        this.setState({ imagen });
    };

    actualizarFormulario = (data) => {
        const { update } = this.props;
        update(data.id, {...data,imagen:null} ,[{ file: this.state.imagen, name: "imagen" }])
    };

    crear = (data) => {
        const { registrar } = this.props;
        registrar({ ...data, imagen: null }, [{ file: this.state.imagen, name: "imagen" }])};

    render() {
        const { match, crear, location, item } = this.props;
        const Action = match.params.id ? this.actualizarFormulario : this.crear;

        return (
            <React.Fragment>
                <div>
                    <br />
                    <h3 className="uk-width-1-2 uk-margin-auto uk-text-bold">
                        Productos
                    </h3>
                    <Form
                        onSubmit={Action}
                        ver={location.pathname.includes("ver")}
                        actualizar={!!match.params.id}
                        setImagen={this.setImagen}
                        item={item}
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default Producto;
