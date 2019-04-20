import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

Accounts.onCreateUser(function(options, user) {
  const { nom, prenom, ville, postal, adresse } = options.profile;
  
  if (nom.trim().length < 2){
    throw new Meteor.Error("Le nom doit comporter au moins 2 caractères");
  }

  if (prenom.trim().length < 2){
    throw new Meteor.Error("Le prénom doit comporter au moins 2 caractères");
  }

	user.nom = nom
	user.prenom = prenom;
	user.ville = ville;
	user.postal = postal;
  user.adresse = adresse;
  user.isAdmin = false;
 return user;
});


Accounts.onLogin(function(user) {
  let previousConnect = user.user.lastConnect;
  let lastIp = user.connection.httpHeaders['x-forwarded-for'];
  Meteor.users.update({_id: user.user._id}, { $set : { lastConnect : moment().valueOf(), previousConnect, lastIp }})
});

Accounts.validateLoginAttempt(function(options){
  if(options.error){
    if (options.error.reason){
      throw new Meteor.Error(options.error.reason); 
    }
    if(options.error.error){
      throw new Meteor.Error(options.error.error); 
    }
  }

  if (!options.user){
    throw new Meteor.Error("Email ou mot de passe invalide");
  }

  if (options.user && options.user.emails[0].verified){
    return true;
  } else {
    Accounts.sendVerificationEmail(options.user._id);
    throw new Meteor.Error("Vous venez de recevoir un email d'activation - Merci de cliquer sur le lien pour valider votre compte - Pensez à vérifier votre dossier Spam");
  }
})
