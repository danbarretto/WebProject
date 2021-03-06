import React from 'react'
import '../style.css'
import { Icon } from '@material-ui/core'

class ProfileCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editMode: false,
      name: '',
      id: '',
      address: '',
      phone: '',
      email: '',
      cpf: '',
      imgSrc: '',
    }
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    const client = JSON.parse(sessionStorage.getItem('client')).client
    this.setState({
      id: client._id,
      name: client.name,
      address: client.address,
      phone: client.phone,
      email: client.email,
      cpf: client.cpf,
      imgSrc: `http://localhost:5000/${client.photo}`,
    })
  }
  handleChange(event) {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  editModeHandler = () => {
    this.setState({ editMode: !this.state.editMode }, () => {
      if (!this.state.editMode) {
        fetch('/client/update', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: this.state.id,
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            phone: this.state.phone,
          }),
        }).then(async (res) => {
          if (res.ok) {
            sessionStorage.setItem(
              'client',
              JSON.stringify({
                id: this.state.id,
                name: this.state.name,
                email: this.state.email,
                address: this.state.address,
                phone: this.state.phone,
                photo: this.state.imgSrc,
                cpf: this.state.cpf,
              })
            )
          } else {
            const result = await res.json()
            alert(result.error)
          }
        })
      }
    })
  }

  render() {
    if (this.state.editMode) {
      return (
        <div class='perfilInfoBox'>
          <Icon className='edit' onClick={this.editModeHandler}>
            done
          </Icon>
          <h3>Dados do cliente</h3>
          <div id='photoAndName'>
            <img alt={this.state.name} class='image' src={this.state.imgSrc} />
            <input
              type='text'
              name='name'
              value={this.state.name}
              onChange={this.handleChange}
              style={{ height: '2em', marginLeft: '1em', marginTop: '2em' }}
            />
          </div>
          <div id='perfilInfo'>
            <div id='perfilInfoLabels'>
              <p>ID</p>
              <p>Endereço</p>
              <p>Telefone</p>
              <p>Email</p>
              <p>CPF</p>
            </div>
            <div id='perfilInfoContent'>
              <p>{this.state.id}</p>
              <input
                type='text'
                name='address'
                value={this.state.address}
                onChange={this.handleChange}
                style={{ height: '2em', marginLeft: '0.5em', marginTop: '1em' }}
              />
              <input
                type='text'
                name='phone'
                value={this.state.phone}
                onChange={this.handleChange}
                style={{ height: '2em', marginLeft: '0.5em', marginTop: '1em' }}
              />
              <input
                type='text'
                name='email'
                value={this.state.email}
                onChange={this.handleChange}
                style={{ height: '2em', marginLeft: '0.5em', marginTop: '1em' }}
              />
              <p>{this.state.cpf}</p>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div class='perfilInfoBox'>
        <Icon className='edit' onClick={this.editModeHandler}>
          edit
        </Icon>
        <h3>Dados do cliente</h3>
        <div id='photoAndName'>
          <img alt={this.state.name} class='image' src={this.state.imgSrc} />
          <p>{this.state.name}</p>
        </div>
        <div id='perfilInfo'>
          <div id='perfilInfoLabels'>
            <p>ID</p>
            <p>Endereço</p>
            <p>Telefone</p>
            <p>Email</p>
            <p>CPF</p>
          </div>
          <div id='perfilInfoContent'>
            <p id='ID'>{this.state.id}</p>
            <p id='endereco'>{this.state.address}</p>
            <p id='telefone'>{this.state.phone}</p>
            <p id='email'>{this.state.email}</p>
            <p id='cpf'>{this.state.cpf}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfileCard
