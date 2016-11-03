describe('price calculator', function(){

	it('should create User', function(){
		var user = new User('company');
		var expected = 'company';

		var actual = user.getRole();
		expect(expected).to.equal(actual);
	});

	it('should set new User role', function(){
		var user = new User('company');
		user.setRole('normal');

		var expected = 'normal';
		var actual = user.getRole();
		expect(expected).to.equal(actual);
	});

	it('should create Product', function(){
		var product = new Product(500, '0');

		var expected = '500 SEK';
		var actual = product.getPrice();
		expect(expected).to.equal(actual);
	});

	it('should set new Product Price', function(){
		var product = new Product(1000, 'old');
		product.setPrice(1599);

		var expected = '1599 SEK';
		var actual = product.getPrice();
		expect(expected).to.equal(actual);
	});

	it('should get publish date for newly created Product', function(){
		var product = new Product(0, 1);

		var expected = new Date().toDateString();
		var actual = product.getPublishDate();
		expect(expected).to.equal(actual);
	});

	it('should calc price with new product and company', function(){
		var user = new User(1);
		var product = new Product(1123, 'new');

		var expected = '1133 SEK';
		var actual = product.calculatePriceForUser(user);
		expect(expected).to.equal(actual);
	});

	it('should calc price with old product and normal user', function(){
		var user = new User('normal');
		var product = new Product(333, 'old');

		var expected = '368 SEK';
		var actual = product.calculatePriceForUser(user);
		expect(expected).to.equal(actual);
	});

});
