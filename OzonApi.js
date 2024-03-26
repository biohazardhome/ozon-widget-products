class OzonApi {

	constructor(clientId, apiKey) {
		this.CLIENT_ID = clientId;
		this.API_KEY = apiKey;
		this.BASE_URL = 'https://api-seller.ozon.ru/';
	}

	async post(uri, body, options) {
		let response = await fetch(this.BASE_URL + uri, {
		  method: 'POST',
		  cache: 'force-cache',
		  headers: {
		    'Content-Type': 'application/json;charset=utf-8',
		    'Client-Id': this.CLIENT_ID,
            'Api-Key': this.API_KEY,
		  },
		  body: JSON.stringify(body)
		});

		return response;
	}

	async productList(filter, limit, lastId = '') {
		return await this.post('v2/product/list', {
			'filter': filter,
            'last_id': lastId,
            'limit': limit,
		}).then(response => response.json());
	}

	async productInfo(product_id, offer_id = null, sku = null) {
		return await this.post('v2/product/info', {
			'product_id': product_id,
            'offer_id': offer_id,
            'sku': sku,
		}).then(response => response.json());
	}

	async ratingSummary() {
		return await this.post('v1/rating/summary', {})
			.then(response => response.json());
	}
}