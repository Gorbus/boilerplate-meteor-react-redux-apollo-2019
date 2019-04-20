import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

import './email-templates';
import './apollo';
import './users';

// smtp value to put in setting and / or environment variable

// process.env.MAIL_URL = process.env.MAIL_URL ? process.env.MAIL_URL : Meteor.settings.smtp;

Meteor.methods({
	sendVerificationLink() {
		let userId = Meteor.userId();
		if ( userId ) {
			console.log('sending email')
			return Accounts.sendVerificationEmail( userId, (err,reponse) => {
				if (err){
					console.log(err)
				} else {
					console.log(response)
				}
			} );
		}
	},
})
