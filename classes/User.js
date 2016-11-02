// class User
// @param `role` - accepts String or Number. Specify the role of a User
//
// !description: class which helps to create users with roles.
// !description: 0 is linked to 'normal' user
// !description: 1 is linked to 'company' user
// !description: returns {created: false} if parameter is wrong or with wrong type
//
// *Example of instance creation:
// var andy = new User(1) --- creates user with role "company"
// OR
// var andy = new User("normal") --- creates user with role "normal"
//
// *Example of public methods usage:
// andy.getRole() --- returns "company"
//
// !!!Note!!! constructor parameter is not required. Default role is set to 'normal'

function User(role) {
	var self = this;
	var DEFAULT_ROLE = "normal";
	var publicAPI = { getRole: getRole };

	// Define the statuses for User instance creation
	var status = {
		success: (function() {
			for(var method in publicAPI) {
				self[method] = publicAPI[method];
			}
			self.created = true;
			return true;
		})(),
		fail: { created: false }
	};

	// Set 'normal'(DEFAULT_ROLE const) - as a default User, if no parameters was passed
	if(!role) {
		this.role = DEFAULT_ROLE;
		return status.success;
	}

	var staticRoles = ['normal', 'company'];
	var messages = {
		wrongType: 'User Class only excepts a String or a Number as a role parameter.',
		wrongNumber: 'User has only 2 types. You can specify them by passing:\n 1 - to create "normal" User\n 2 - to create "company" User\n OR - pass in the regular string to constructor, like: "normal" or "company"'
	};


	// User Class only accepts a Number or a String as a constructor parameter
	switch(typeof role) {
		case 'number':
			handleNumber();
			break;
		case 'string':
			handleString();
			break;
		default:
			console.error(messages.wrongType);
	}

	// end of User instance creation logic, retuns the status of instance creation
	return this.role ? status.success : status.fail;

	// Defining extensible helper methods from here:

	// PUBLIC methods for User Class:

	function getRole() {
		return self.role;
	}

	// PRIVATE methods to handle constructor parameters:

	function handleNumber() {
		if(role === 0 || role === 1) {
			self.role = staticRoles[role];
		} else {
			console.error(messages.wrongNumber);
		}
	}

	function handleString() {
		if(role === 'normal' || role === 'company') {
			self.role = role;
		} else if(role === '0' || role === '1') {
			var roleToNumber = parseInt(role);
			self.role = staticRoles[roleToNumber];
		} else {
			console.error(messages.wrongNumber);
		}
	}
}
