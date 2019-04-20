import { Meteor } from 'meteor/meteor'
import React from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data';

class Login extends React.Component {
  onSubmit = (e) => {
    e.preventDefault()

    let email = this.email.value.trim()
    let password = this.password.value.trim()

    Meteor.loginWithPassword({email}, password, (err) => {
      if (err) {
        if (err.error === 'User not found') {
          Bert.alert("Problème de connexion - Utilisateur non trouvé", 'danger')
        } else if (err.error === 'Incorrect password') {
          Bert.alert("Problème de connexion - Mot de passe incorrect", 'danger')
        } else {
          if (err.error === "Vous venez de recevoir un email d'activation - Merci de cliquer sur le lien pour valider votre compte - Pensez à vérifier votre dossier Spam"){
            Bert.alert(err.error, 'success')
          } else {
            Bert.alert(err.error, 'danger')
          }
        }
      } else {
        Bert.alert('Connexion réussie !', 'success')
        this.props.client.resetStore();
      }
    })
  }

  render () {
    if (this.props.logging){
      return null
		}
		if (Meteor.user()) {
      return (<Redirect to="/" />)
		} 
		return (
			<div className="login">
				<h1 className="account-title">Connexion</h1>
				<h4>Email</h4>
				<div className="login__oneinput margin-input"><div className="login__input-icon login-icon-email"></div><input className="login__input" type="email" ref={(input) => this.email = input} name="email" placeholder="Votre addresse email" /></div>
				<h4>Mot de passe</h4>
				<div className="login__oneinput"><div className="login__input-icon login-icon-password"></div><input className="login__input" type="password" ref={(input) => this.password = input} name="password" placeholder="Votre mot de passe" /></div>
				<Link className="account-mdp-oublie" to='/forgot-password'>J'ai oublié mon mot de passe</Link>
				<div className='account-button' onClick={this.onSubmit}>Connexion</div>
				<Link className="account-no-compte" to='/signup' >Je n'ai pas encore de compte</Link>
			</div>
		)
  }
}

export default withTracker(() => {
  const logging = Meteor.loggingIn();
  return { logging }
})(withRouter(Login));
