import { Meteor } from 'meteor/meteor'
import React from 'react'
import { Redirect } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data'
import { Accounts } from 'meteor/accounts-base'

export class ResetPassword extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      passwordVerif: '',
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.onPasswordVerifChange = this.onPasswordVerifChange.bind(this)
  }

  onPasswordChange (e) {
    let password = e.target.value
    this.setState(() => ({password}))
  }

  onPasswordVerifChange (e) {
    let passwordVerif = e.target.value
    this.setState(() => ({passwordVerif}))
  }

  onSubmit () {
    const password = this.state.password
    const passwordVerif = this.state.passwordVerif

    if (password.length < 8) {
      return Bert.alert('Le mot de passe doit faire au moins 8 caractères', 'error')
    }

    if (password != passwordVerif) {
      return Bert.alert('Le mot de passe et sa confirmation ne sont pas identiques', 'error')
    }

    Accounts.resetPassword(this.props.token, password, (err) => {
      if (err) {
        Bert.alert(err.reason, 'error')
      } else {
        Bert.alert('Mot de passe changé avec succés', 'success')
      }
    })
  }

  render () {
    if (Meteor.user() || this.props.logging) {
      return (<Redirect to="/" />)
    } else {
      return (
        <div className="reset">
          <h1 className="account-title">Changez votre mot de passe</h1>
          <h4>Mot de passe</h4>
          <input className="login__input margin-input" type="password" onChange={this.onPasswordChange} name="password" placeholder="Nouveau mot de passe" value={this.state.password} />
          <h4>Confirmation du mot de passe</h4>
          <input className="login__input bottom-margin-input" type="password" onChange={this.onPasswordVerifChange} name="password_verif" placeholder="Confirmation du mot de passe" value={this.state.passwordVerif}/>
          <div className='account-button' onClick={this.onSubmit}>Changez votre mot de passe</div>
        </div>
      )
    }
  }
}

export default withTracker((props) => {
  const logging = Meteor.loggingIn()
  const token = props.match.params.token
  return { logging, token }
})(ResetPassword)
