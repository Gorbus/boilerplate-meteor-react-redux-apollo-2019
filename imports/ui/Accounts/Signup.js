import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link, Redirect } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { withTracker } from 'meteor/react-meteor-data';

export class Signup extends React.Component {
  state = {
    nom: '',
    prenom: '',
    adresse: '',
    ville: '',
    postal: '',
    email: '',
    password: '',
    passwordVerif: '',
    error: '',
    approvedTerms: false
  }

  onNomChange = (e) => {
    let nom = e.target.value
    this.setState(() => ({nom}))
  }

  onPrenomChange = (e) => {
    let prenom = e.target.value
    this.setState(() => ({prenom}))
  }

  onAdresseChange = (e) => {
    let adresse = e.target.value
    this.setState(() => ({adresse}))
  }

  onVilleChange = (e) => {
    let ville = e.target.value
    this.setState(() => ({ville}))
  }

  onPostalChange = (e) => {
    let postal = e.target.value
    this.setState(() => ({postal}))
  }

  onEmailChange = (e) => {
    let email = e.target.value
    this.setState(() => ({email}))
  }

  onPasswordChange = (e) => {
    let password = e.target.value
    this.setState(() => ({password}))
  }

  onPasswordVerifChange = (e) => {
    let passwordVerif = e.target.value
    this.setState(() => ({passwordVerif}))
  }

  onTermsChange = (e) => {
    let approvedTerms = e.target.value
    this.setState(() => ({approvedTerms}))
  }

  onSubmit = (e) => {
    e.preventDefault()

    const { email, password, passwordVerif, nom, prenom, adresse, ville, postal } = this.state;

    // MAKE STRONGER PASSWORD CRITERIA

    if (!this.state.approvedTerms) {
      return Bert.alert("Veuillez approuver les conditions d'utilisation pour créer un compte", 'danger')
    }

    if (password.length < 8) {
      return Bert.alert("Erreur - Le mot de passe doit comporter au moins 8 caractères", 'danger')
    }

    if (password != passwordVerif) {
      return Bert.alert("Erreur - Le mot de passe et sa vérification ne sont pas identiques", 'danger')
    }

    if (nom.trim().length < 2){
      return Bert.alert("Erreur - Votre nom doit comporter au moins 2 caractères", 'danger')
    }

    if (prenom.trim().length < 2){
      return Bert.alert("Erreur - Votre prénom doit comporter au moins 2 caractères", 'danger')
    }

    Accounts.createUser({ email, password, profile: { nom, prenom, adresse, ville, postal}}, (err) => {
      if (err) {
        if (err.error === "Vous venez de recevoir un email d'activation - Merci de cliquer sur le lien pour valider votre compte - Pensez à vérifier votre dossier Spam"){
          Bert.alert(err.error, 'success')
        } else {
          Bert.alert(err.error, 'danger')
        }
      } else {
        Meteor.call('sendVerificationLink', (err, response) => {
          if (err) {
            Bert.alert(err.reason, 'danger')
          } else {
            Bert.alert("Vous venez de recevoir un email d'activation - Merci de cliquer sur le lien pour valider votre compte - Pensez à vérifier votre dossier Spam", 'success')
          }
        })
      }
    })
  }

  render () {
    if (Meteor.user()) {
      return (<Redirect to="/" />)
    } else {
      return (
        <div className='signup'>
          <h1 className="account-title">Création d'un compte</h1>
          <h4>Nom*</h4>
          <input className="login__input" type="text" onChange={this.onNomChange} name="nom" placeholder="Votre nom" value={this.state.nom} />
          <h4>Prénom*</h4>
          <input className="login__input" type="text" onChange={this.onPrenomChange} name="prenom" placeholder="Votre prénom" value={this.state.prenom} />
          <h4>Email*</h4>
          <input className="login__input" type="email" onChange={this.onEmailChange} name="email" placeholder="Votre adresse email professionnelle" value={this.state.email} />
          <h4>Mot de passe*</h4>
          <input className="login__input" type="password" onChange={this.onPasswordChange} name="password" placeholder="Choisissez un mot de passe" value={this.state.password} />
          <h4>Confirmation du mot de passe*</h4>
          <input className="login__input" type="password" onChange={this.onPasswordVerifChange} name="password_verif" placeholder="Confirmation du mot de passe" value={this.state.passwordVerif}/>
          <h4>Adresse<span className="facultatif">(facultatif)</span></h4>
          <input className="login__input" type="text" onChange={this.onAdresseChange} name="adresse" placeholder="Adresse de la société" value={this.state.adresse} />
          <div className="signup-group">
            <div className="signup-group-col">
              <h4>Ville <span className="facultatif">(facultatif)</span></h4>
              <input className="login__input" type="text" onChange={this.onVilleChange} name="ville" placeholder="Ville" value={this.state.ville} />
            </div>
            <div className="signup-group-col">
              <h4>Code postal <span className="facultatif">(facultatif)</span></h4>
              <input className="login__input" type="text" onChange={this.onPostalChange} name="postal" placeholder="Code postal" value={this.state.postal} />
            </div>
          </div>
          <div className="signup-terms"><input className="signup-terms-checkbox" type="checkbox" onChange={this.onTermsChange} name="terms" value={this.state.approvedTerms}/><div className="signup-terms-text">J'accepte <Link to="/legal" target="blank">les termes et conditions d'utilisation de<br /> Appname</Link> et <Link to="/cgu" target="blank">les règles de protection de l'identité</Link>.</div></div>
          <div className="account-button" onClick={this.onSubmit}>Valider</div>
        </div>
      )
    }
  }
}

export default withTracker(() => {
  const logging = Meteor.loggingIn()
  return { logging }
})(Signup);
