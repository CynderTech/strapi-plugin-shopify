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
	],
};
