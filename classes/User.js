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
// andy.setRole('normal') --- set PRIVATE `_role` Class property to parameter's value
//
// !!!Note!!! constructor parameter is not required. Default role is set to 'normal'

function User(role) {
	var self = this;

	// define PRIVATE variable _role
	var _role;

	// define defaults and publicAPI
	var DEFAULT_ROLE = "normal";
	var publicAPI = { getRole: getRole, setRole: setRole };

	// define PUBLIC variables
	this.staticRoles = ['normal', 'company'];
	this.messages = {
		wrongType: 'User Class only excepts a String or a Number as a role parameter.',
		wrongNumber: 'User has only 2 roles. You can specify them by passing:\n' +
			'1 - to create "normal" User\n' +
			'2 - to create "company" User\n' +
			'OR - pass in the regular string to constructor, like: "normal" or "company"',
		saved: 'Your value is successfully saved!',
		notSaved: 'Sorry we can\'t save your value! ;('
	};


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

	// Set 'normal'(DEFAULT_ROLE const) - as a default User role, if no parameters was passed
	if(!role) {
		_role = DEFAULT_ROLE;
		return status.success;
	}

	// validation method from PRIVATE methods below
	typeCheck();


	// End of User instance creation logic, retuns the status of instance creation
	return _role ? status.success : status.fail;



	// Defining extensible Helper methods from here:


	// PUBLIC methods for User Class:

	function getRole() {
		return _role;
	}

	function setRole(newRole) {
		return typeCheck(newRole);
	}


	// PRIVATE methods to handle constructor parameters:

	// User Class only accepts a Number or a String as a constructor parameter
	function typeCheck(newRole) {
		// Use `role` from constructor parameter on Class initialization
		if(!newRole && newRole !== 0) newRole = role;

		switch(typeof newRole) {
			case 'number':
				handleNumber(newRole);
				break;
			case 'string':
				handleString(newRole);
				break;
			default:
				console.error(self.messages.wrongType);
		}

		return newRole === _role ? self.messages.saved : self.messages.notSaved;
	}

	function handleNumber(newRole) {
		if(newRole === 0 || newRole === 1) {
			_role = self.staticRoles[newRole];
		} else {
			console.error(self.messages.wrongNumber);
		}
	}

	function handleString(newRole) {
		var lowRole = newRole.toLowerCase();
		if(lowRole === 'normal' || lowRole === 'company') {
			_role = lowRole;
		} else if(newRole === '0' || newRole === '1') {
			var roleToNumber = parseInt(newRole);
			_role = self.staticRoles[roleToNumber];
		} else {
			console.error(self.messages.wrongNumber);
		}
	}
}
