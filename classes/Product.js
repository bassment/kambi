// class Product
// @param `type` - accepts String or Number. Specify the type of a Product
//
// !description: class which helps to create products with types.
// !description: 0 is linked to 'new' product
// !description: 1 is linked to 'old' product
// !description: returns {created: false} if parameter is wrong or with a wrong type
//
// *Example of instance creation:
// var iphone = new Product(0) --- creates product with type "new"
// OR
// var iphone = new Product("old") --- creates user with role "old"
//
// *Example of public methods usage:
// iphone.getType() --- returns "old"
// iphone.setType(1) --- set PRIVATE `_type` Class property to parameter's value("old" in this case)
//
// !!!Note!!! constructor parameter is not required. Default role is set to 'new'

function Product(type) {
	var self = this;

	// define PRIVATE variable _type
	var _type;

	// define defaults and publicAPI
	var DEFAULT_TYPE = "new";
	var publicAPI = { getType: getType, setType: setType };

	// define PUBLIC variables
	this.staticTypes = ['new', 'old'];
	this.messages = {
		wrongType: 'Product Class only excepts a String or a Number as a type parameter.',
		wrongNumber: 'Product has only 2 types. You can specify them by passing:\n' +
      '1 - to create "new" Product\n' +
      '2 - to create "old" Product\n' +
      'OR - pass in the regular string to constructor, like: "new" or "old"',
		saved: 'Your value is successfully saved!',
		notSaved: 'Sorry we can\'t save your value! ;('
	};


	// Define the statuses for Product instance creation
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

// Set 'new'(DEFAULT_TYPE const) - as a default Product type, if no parameters was passed
	if(!type) {
		_type = DEFAULT_TYPE;
		return status.success;
	}

	typeCheck();

	// end of Product instance creation logic, retuns the status of instance creation
	return _type ? status.success : status.fail;


	// Defining extensible helper methods from here:

	// PUBLIC methods for Product Class:

	function getType() {
		return _type;
	}

	function setType(newType) {
		return typeCheck(newType);
	}

	// PRIVATE methods to handle constructor parameters:

	// Product Class only accepts a Number or a String as a constructor parameter
	function typeCheck(newType) {
		if(!newType && newType !== 0) newType = type;

		switch(typeof newType) {
			case 'number':
				handleNumber(newType);
				break;
			case 'string':
				handleString(newType);
				break;
			default:
				console.error(self.messages.wrongType);
		}

		return newType === _type ? self.messages.saved : self.messages.notSaved;
	}

	function handleNumber(newType) {
		if(newType === 0 || newType === 1) {
			_type = self.staticTypes[newType];
		} else {
			console.error(self.messages.wrongNumber);
		}
	}

	function handleString(newType) {
    var lowType = newType.toLowerCase();
		if(lowType === 'new' || lowType === 'old') {
			_type = lowType;
		} else if(newType === '0' || newType === '1') {
			var roleToNumber = parseInt(_type);
			_type = self.staticTypes[roleToNumber];
		} else {
			console.error(self.messages.wrongNumber);
		}
	}
}
