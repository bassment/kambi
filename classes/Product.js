// class Product
// @param `price`:(NUMBER) - *REQUIRED* parameter. Specify the price of your product. Can't be negative Number or a String.
// @param `type`:(NUMBER|STRING) - accepts String or Number. Specify the type of a Product
//
// !description: class which helps to create products with `type`,  `price` and `publishedDate`.
// !description: 0 `type` is linked to 'new' product
// !description: 1 `type` is linked to 'old' product
// !description: returns {created: false} if parameters are wrong OR with a wrong type OR `price` is not specified
//
// *Example of instance creation:
// var iphone = new Product(1000, 'new') --- creates product with type "new" and price of '1000 SEK'
// OR
// var iphone = new Product(150, 1) --- creates product with type "old"
//
// *Example of public methods usage:
// iphone.getPrice() --- returns product PRIVATE product _price in SEK currency
// iphone.setPrice(1000) --- set PRIVATE `_price` Class property to parameter's value(1000 in this case). The value can't by negative number or a String
// iphone.getType() --- returns current PRIVATE property _type
// iphone.setType(1) --- set PRIVATE `_type` Class property to parameter's value("old" in this case)
// iphone.getPublishDate() --- returns publish date of a product. Date is set on an instance create
//
// !!!Note!!! constructor parameter `price` IS *Required*. You could not create the instance without a price
// !!!Note!!! constructor parameter `_type` is NOT required. Default role is set to 'new'

function Product(price, type) {
	var self = this;

	// define PRIVATE variables
	var _type, _price, _publishDate;

	// define defaults and publicAPI
	var DEFAULT_TYPE = "new";
	var publicAPI = {
		calculatePriceForUser: calculatePriceForUser,
		getPrice: getPrice,
		setPrice: setPrice,
		getType: getType,
		setType: setType,
		getPublishDate: getPublishDate
	};

	// define PUBLIC variables
	this.staticTypes = ['new', 'old'];
	this.messages = {
		noParam: 'First Parameter(Price) is *required*, please specify it to create a Product instance.',
		wrongParam: 'First Parameter(Price) should be the type of positive Number. The program will automatically convert your number to SEK currency afterwards.',
		wrongInstance: {done: false, message: 'Calculate method only excepts instances of Class User. Please specify correct instance.'},
		wrongType: 'Product Class only excepts a String or a Number as a type parameter.',
		wrongNumber: 'Product has only 2 types. You can specify them by passing:\n' +
      '1 - to create "new" Product\n' +
      '2 - to create "old" Product\n' +
      'OR - pass in the regular string to constructor, like: "new" or "old"',
		saved: {status: 'saved', message: 'Your value is successfully saved!'},
		notSaved: {status: 'failed', message: 'Sorry we can\'t save your value! ;('}
	};


	// Define the statuses for Product instance creation
	var status = {
		success: (function() {
			for(var method in publicAPI) {
				self[method] = publicAPI[method];
			}
			_publishDate = new Date().toDateString();
			self.created = true;
			return true;
		})(),
		fail: { created: false }
	};

	// Start Class instanciating Logic;
	// ---------------------------------

	// Price should be set in a constructor parameter. Returns an error if not specified
	if(!price) {
		console.error(self.messages.noParam);
		return status.fail;
	} else {
		var priceSaved = validatePrice();
		if(priceSaved.status === 'failed') return status.fail;
	}


	// Set 'new'(DEFAULT_TYPE const) - as a default Product type, if no parameters was passed
	if(!type) {
		_type = DEFAULT_TYPE;
		return status.success;
	}

	typeCheck();

	// end of Product instance creation logic, retuns the status of instance creation
	return _type ? status.success : status.fail;


	// Defining extensible helper methods from here:
	// ---------------------------------

	// PUBLIC calculate for specified User method
	function calculatePriceForUser(user) {
		// Return with error if User Class instance was not provided in method argument list
		if(!(user instanceof User)) {
			var msg_stat = self.messages.wrongInstance;
			console.error(msg_stat.message);
			return msg_stat;
		}

		var currentDate = new Date().toDateString();
		var enddateDiscount = 0;

		// Get User Role to Calculate correct price
		var userRole = user.getRole();

		// Calculation Logic
		switch (userRole) {
			case 'normal':
				if (_type == 'new') { // new product
					if (_publishDate == currentDate) enddateDiscount = 10;

					return _price + 25 - enddateDiscount;
				} else if (productType == 'old') { // old product
					return _price + 35 - 0;
				}
				break;
			case 'company': // company
				if (_type == 'new') { // new product
					if (_publishDate == currentDate) {
							return price + 25 - 15;// Enddate discount and company discount
					}

					return _price + 25 - 5;// Only company discount
				} else if (_type == 'old') { // old product
					return _price + 35 - 5;
				}
				break;
		}
	}

	// PUBLIC methods for Product Class:

	function getPrice() {
		var SEK_converted = _price.toString() + ' SEK'
		return SEK_converted;
	}

	function setPrice(newPrice) {
		return validatePrice(newPrice).message;
	}

	function getType() {
		return _type;
	}

	function setType(newType) {
		var typeSaved = typeCheck(newType)
		return typeSaved.message;
	}

	function getPublishDate() {
		return _publishDate;
	}

	// PRIVATE methods to handle constructor parameters:

	function validatePrice(newPrice) {
		// Use `price` from constructor parameter on Class initialization
		if(!newPrice) newPrice = price;

		if(typeof newPrice === 'number' && newPrice >= 0) {
			_price = newPrice;
		} else {
			console.error(self.messages.wrongParam);
		}

		// Return a status and a message for this `price` update operation
		return newPrice === _price
			? self.messages.saved
			: self.messages.notSaved;
	}

	// Product Class only accepts a Number or a String as a constructor parameter for type
	function typeCheck(newType) {
		// Use `type` from constructor parameter on Class initialization
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

		// Return a status and a message for this `type` update operation
		return newType === _type
			? self.messages.saved
			: self.messages.notSaved;
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
			var roleToNumber = parseInt(newType);
			_type = self.staticTypes[roleToNumber];
		} else {
			console.error(self.messages.wrongNumber);
		}
	}
}
