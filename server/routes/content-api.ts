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
	],
};
