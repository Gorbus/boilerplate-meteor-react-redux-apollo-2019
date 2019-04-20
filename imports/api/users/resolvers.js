export default {
	Query : {
		user(obj, args, { user }){
			return user || {};
		},
	},
	User : {
		email: (user) => {
			if(user._id){
				return user.emails[0].address 
			} else {
				return '';
			}
		}
	}
}