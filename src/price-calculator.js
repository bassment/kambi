// userType, 0 = normal, 1 = company
// productType, 0 = new product, 1 = old product
// price, the price of the product
var calculatePrice = function (user, product, price, publishedDate) {
	try	{
		var productType = product.getType();
		switch (user.getRole()) {
		case 'normal': // normal
			if (productType == 'new') { // new product
				var enddateDiscount = 0;
				if (publishedDate.toDateString() == new Date().toDateString()) enddateDiscount = 10;

				return price + 25 - enddateDiscount;
			} else if (productType == 'old') { // old product
				return price + 35 - 0;
			}
			break;
		case 'company': // company
			if (productType == 'new') { // new product
				if (publishedDate.toDateString() === new Date().toDateString()) {
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
