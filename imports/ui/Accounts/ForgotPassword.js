import { Meteor } from 'meteor/meteor'
import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data'
import { Accounts } from 'meteor/accounts-base'

export class ForgotPassword extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      error: ''
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit () {
    let email = this.refs.email.value.trim()

    Accounts.forgotPassword({email}, (err) => {
      if (err) {
        Bert.alert(err.reason,'danger');
      } else {
        Bert.alert('Un lien pour réinitialiser votre mot de passe vous a été envoyé par email - Vérifiez aussi votre dossier de courriers indésirables', 'success');
      }
    })
  }

  render () {
    if (Meteor.user() || this.props.logging) {
      return (<Redirect to="/account" />)
    } else {
      return (
        <div className="forgot">
          <h1 className="account-title">Mot de passe oublié ?</h1>
          <h4>Email</h4>
          <input className="login__input bottom-margin-input" type="email" ref="email" name="email" placeholder="Votre adresse email" />
          <div className='account-button' onClick={this.onSubmit}>Générer un nouveau mot de passe</div>
          <Link className="account-no-compte" to='/signup'>Je n'ai pas encore de compte</Link>
          <Link className="account-no-compte" to='/login'>Je me souviens de mon mot de passe</Link>
        </div>
      )
    }
  }
}

export default withTracker(() => {
  const logging = Meteor.loggingIn()
  return { logging }
})(ForgotPassword)
