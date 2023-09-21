export default {
	type: 'content-api',
	routes: [
		{
			method: 'GET',
			path: '/products',
			handler: 'products.find',
			config: {
				policies: [],
			},
		},
	],
};
