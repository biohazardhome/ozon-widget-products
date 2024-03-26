class Widget {

	constructor() {
		this.OZON_CLIENT_ID = '548079';
		this.API_KEY = '34ea43a2-95df-47c3-a4b8-602e98680936';

		this.LIMIT = 5;
		this.PRODUCTS = ['403482751', '403636472', '403505713', '403510966', '403617123']; // product ids
		// this.CACHE_TIME = 500;
		this.VISIBLE = 'VISIBLE'; // ALL, VISIBLE, TO_SUPPLY, IN_SALE, OVERPRICED

		this.api = new OzonApi(this.OZON_CLIENT_ID, this.API_KEY);
		this.view = new Template;		
	}

	async init() {
		let products = await this.products();

		let view = products.reduce((html, product) => {
			let images = product.images.reduce((html, image) => {
				return html + this.view.image(product, image);
			}, '');
			return html + this.view.product(product, images);
		}, '');

		document.querySelector('.widget-products').innerHTML = view;

		let rating = await this.rating();
		document.querySelector('.widget-seller-rating').innerHTML += rating.current_value;

	}

	async products() {
		let filter = {
				'product_id': this.PRODUCTS,
				'offer_id': [],
				'visibility': this.VISIBLE,
			},
			list = await this.api.productList(filter, this.LIMIT),
			products = [],
	        items = list['result']['items'];

        for (let item of items) {
        	let result = await this.api.productInfo(item.product_id, item.offer_id);
        	let product = result.result;
            this.productPrepare(product);

            products.push(product);
        }

        return products;
	}

	async rating() {
		let result = await this.api.ratingSummary();
		let groups = result.groups;
		for(var group of groups) {
			if (group.group_name === 'Оценка продавца') {
				break;
			}
		}

		return group.items[0];
	}

	productPrepare(product) {
		product.title = product.name.substring(0, 30) +'...';
        product.url = 'https://www.ozon.ru/product/'+ product.sku;
        product.marketing_price = this.productPrice(product.marketing_price);
        product.old_price = this.productPrice(product.old_price);

        return product;
    }

    productPrice(price) {
    	return parseInt(price);
    }

}