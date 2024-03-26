class Template {

	products(products) {
		return `<div class="widget-products">
			${ products }
		</div>`
	}

	product(product, images) {
		let title = product.title;

		return `<div class="widget-product">
            <div class="swiper">
                <div class="swiper-wrapper">
                	${ images }
                </div>
            </div>
            
            <div class="widget-product-price">
                <span>${ product.marketing_price } ₽</span>
                <span>${ product.old_price } ₽</span>
            </div>

            <div class="widget-product-name">                
                ${ product.name.substring(0, 50) +'...' }
            </div>

            <a href="${ product.url }" title="Купить ${ title }" class="widget-product-buy">🛒 Купить</a>
        </div>`
	}

	image(product, image) {
		let title = product.title;

		return `<div class="swiper-slide">
            <a href="${ product.url }" title="${ title }">
                <img class="widget-product-image" src="${ image }" alt="Изображение ${ title }" title="${ title }" loading="lazy">
            </a>
        </div>`;
	}

}