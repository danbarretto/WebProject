import React from 'react'
import '../style.css'
import { Link } from 'react-router-dom'

class ClientHeader extends React.Component {
  render() {
    return (
      <header>
        <div className='title title_small'>
          <h1>Petz</h1>
        </div>
        <div className='menu menuClient'>
          <ul>
            <li>
              <Link to={`${this.props.match.path}/agendamentos`}>Agendamentos</Link>
            </li>
            <li>
              <Link to={`${this.props.match.path}/produtos`}>Produtos</Link>
            </li>
            <li>
              <Link to={`${this.props.match.path}/adocao`}>
                Compre/Adote pets
              </Link>
            </li>
            <li>
              <Link to={`${this.props.match.path}/perfil`}>Meu perfil</Link>
            </li>
            <li>
              <Link to={`${this.props.match.path}/carrinho`}>Meu carrinho</Link>
            </li>
          </ul>
        </div>
      </header>
    )
  }
}

export default ClientHeader
