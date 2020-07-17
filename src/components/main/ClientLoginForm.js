import React from 'react'
import '../style.css'
import { Link, Redirect } from 'react-router-dom'

class ClientLoginForm extends React.Component {
  componentWillMount() {
    this.setState({ cpf: '', password: '', logedin: false, redirect:'/login/client' })
  }

  cpfHandler = (event) => {
    this.setState({ cpf: event.target.value })
  }
  passwordHandler = (event) => {
    this.setState({ password: event.target.value })
  }
  submitHandler = () => {
    const data = {cpf:this.state.cpf, password:this.state.password}
    fetch('http://localhost:5000/auth/authenticate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(async res=>{
        if(res.ok){
          const client = await res.json()
          localStorage.setItem('client', JSON.stringify(client))
          window.location.replace('http://localhost:3000/client')
        }else{
          alert('Usuário ou senha incorretos!')
        }
        
    })

  }

  render() {
    return (
      <main>
        <Redirect to={this.state.redirect} />
        <div class='formAgendarHolder'>
          <div class='formAgendar  shadow'>
            <h1>Login Cliente </h1>
            <input
              type='text'
              placeholder='CPF'
              class='nameInput'
              value={this.state.cpf}
              onChange={this.cpfHandler}
            />
            <input
              type='password'
              placeholder='Senha'
              class='nameInput'
              value={this.state.password}
              onChange={this.passwordHandler}
            />

              <button type='submit' onClick={this.submitHandler}>
                Confirmar
              </button>
          </div>
        </div>

        <div class='formAgendarHolder'>
          <div class='formAgendar  shadow'>
            <Link to='/login/create'>
              <button type='submit'>Novo cliente</button>
            </Link>
            <Link to='/login/admin'>
              <button type='submit'>Logar como Admin</button>
            </Link>
          </div>
        </div>
      </main>
    )
  }
}

export default ClientLoginForm