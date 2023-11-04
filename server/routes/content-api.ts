export default {
	type: 'content-api',
	routes: [
		{
			method: 'GET',
			path: '/products',
			handler: 'product.find',
			config: {
				policies: [],
			},
		},
		{
			method: 'GET',
			path: '/orders',
			handler: 'order.find',
			config: {
				policies: [],
			},
		},
		{
			method: 'GET',
			path: '/cart',
			handler: 'cart.findOne',
			config: {
				policies: [],
			},
		},
		{
			method: 'PUT',
			path: '/cart',
			handler: 'cart.upsert',
			config: {
				policies: [],
			},
		},
		{
			method: 'PUT',
			path: '/cart/checkout',
			handler: 'cart.checkout',
			config: {
				policies: [],
			},
		},
	],
};
