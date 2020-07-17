import React from 'react'
import '../style.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  
  
class AdminHeader extends React.Component {
  
    render() {

        return (
            <header>
                <div class="title title_small">
                    <h1>
                    Petz
                    </h1>
                </div>
                <div class="menu menuAdmin">
                    <ul>
                    <li class="dropdown">
                        <a href="javascript:void(0)" class="dropbtn">Registrar</a>
                        <div class="dropdown-content admin">
                            <Link to={`${this.props.match.path}/registro/clientes`}>Clientes</Link>
                            <Link to={`${this.props.match.path}/registro/admins`}>Administradores</Link>
                            <Link to={`${this.props.match.path}/registro/produtos`}>Produtos</Link>
                            <Link to={`${this.props.match.path}/registro/servicos`}>Serviços</Link>
                        </div>
                    </li>
                    <li><Link to={`${this.props.match.path}/servicos`}>Administração de serviços</Link></li>
                    <li><Link to={`${this.props.match.path}/estoque`}>Administração de estoques</Link></li>
                    </ul>
                </div>
            </header>
        );
    }
}

export default AdminHeader;