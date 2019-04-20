import { Accounts } from 'meteor/accounts-base';


const appName = "App Name"
Accounts.emailTemplates.siteName = "App Name";
Accounts.emailTemplates.from = "App Name <app@email.com>";

Accounts.emailTemplates.verifyEmail = {
	subject() {
		return `Activation de votre compte ${appName}`
	},

	text(user, url) {
		const urlWithoutHash = url.replace('#/', '')
		return `Bonjour,
		
		Vous avez demandé la création d'un compte pour utiliser l'applications ${appName} et nous vous en remercions.
		
		Afin d'activer votre compte, nous vous demandons de bien vouloir cliquer sur ce lien :
		
		${urlWithoutHash}
		
		A très bientôt.
		
		L'équipe ${appName}`
	},

	html(user, url){
		const urlWithoutHash = url.replace('#/', '')
		return `
		<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
			<html xmlns="http://www.w3.org/1999/xhtml">
				<head>
					<meta name="viewport" content="width=device-width" />
					<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
				</head>

				<body>
					<title>Activation Compte ${appName}</title>
					<p>Bonjour,</p>
					<p>Vous avez demandé la création d'un compte pour utiliser l'application ${appName} et nous vous en remercions.</p>
					<p>Afin d'activer votre compte, nous vous demandons de bien vouloir cliquer sur ce lien :</p>
					<p>${urlWithoutHash}</p>

					<p>A très bientôt.</p>
					<p>L'équipe ${appName}</p>
				</body>
			</html>
		`
	}
}

Accounts.emailTemplates.resetPassword = {
	subject() {
		return `${appName} - Réinitialiser votre mot de passe`
	},

	text(user, url) {
		const urlWithoutHash = url.replace('#/', '')
		return `Bonjour,
		
		Vous avez demandé la réinitialisation de votre mot de passe.

		Afin de définir un nouveau mot de passe nous vous demandons de bien vouloir cliquer sur ce lien :
		
		${urlWithoutHash}
		
		A très bientôt.
		
		L'équipe ${appName}`
	},

	html(user, url){
		const urlWithoutHash = url.replace('#/', '')
		return `
		<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
			<html xmlns="http://www.w3.org/1999/xhtml">
				<head>
					<meta name="viewport" content="width=device-width" />
					<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
				</head>

				<body>
					<title>${appName} - Réinitialiser votre mot de passe</title>
					<p>Bonjour,</p>
					<p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
					<p>Afin de définir un nouveau mot de passe, nous vous demandons de bien vouloir cliquer sur ce lien :</p>
					<p>${urlWithoutHash}</p>

					<p>A très bientôt.</p>
					<p>L'équipe ${appName}</p>
				</body>
			</html>
		`
	}	
}