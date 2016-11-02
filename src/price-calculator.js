// userType, 0 = normal, 1 = company
// productType, 0 = new product, 1 = old product
// price, the price of the product
var calculatePrice = function (user, product) {
	try	{
		var productType = product.getType();
		var price = product.getPrice();
		price = parseInt(price.slice(0, price.length - 4));
		var publishedDate = product.getPublishDate();

		switch (user.getRole()) {
		case 'normal': // normal
			if (productType == 'new') { // new product
				var enddateDiscount = 0;
				if (publishedDate == new Date().toDateString()) enddateDiscount = 10;

				return price + 25 - enddateDiscount;
			} else if (productType == 'old') { // old product
				return price + 35 - 0;
			}
			break;
		case 'company': // company
			if (productType == 'new') { // new product
				if (publishedDate === new Date().toDateString()) {
						return price + 25 - 15;// Enddate discount and company discount
				}

				return price + 25 - 5;// Only company discount
			} else if (productType == 'old') { // old product
				return price + 35 - 5;
			}
			break;
		}
	}	catch (ex)	{
			console.log(ex);
	}
	return 0;
}
