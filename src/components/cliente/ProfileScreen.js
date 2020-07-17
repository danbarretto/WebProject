import React from 'react'
import '../style.css'
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom'
import ProfileCard from './ProfileCard'
import OwnedPetsPanel from './OwnedPetsPanel'
import profilePlaceHolder from './images/coffinGuy.jpg'
import petPlaceHolder from './images/dog2.jpeg'
import PetCard from './PetCard'

class AdoptionScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rerender: 0,
    }
  }

  removePetHandler = (id, photo) => {
    const ownerId = JSON.parse(localStorage.getItem('client')).client._id
    const data = { ownerId, petId: id, photo }
    fetch('http://localhost:5000/pet/remove', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(async (res) => {
      if (res.ok) {
        res.json().then((result) => {
          localStorage.setItem('client', JSON.stringify({ client: result }))
          let num = this.state.rerender + 1
          this.setState({ rerender: num })
          alert('Pet removido com sucesso!')
        }).catch(jsonErr=>{
          console.log(jsonErr)
        })
      } else {
        console.log(await res.json())
      }
    })
    this.setState({})
  }

  render() {
    return (
      <main id='profileHolder'>
        <div
          class='perfilHolder'
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <ProfileCard />
          <OwnedPetsPanel
            key={this.state.rerender}
            removePetHandler={this.removePetHandler}
            match={this.props.match}
          />
        </div>
      </main>
    )
  }
}

export default AdoptionScreen
