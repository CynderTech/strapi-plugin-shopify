import React from 'react';
import { Helmet } from 'react-helmet';

import {
	Box,
	Button,
	ContentLayout,
	GridLayout,
	HeaderLayout,
	Main,
	TextInput,
} from '@strapi/design-system';

const HomePage = () => (
	<Main>
		<Helmet title="Shopify" />

		<HeaderLayout primaryAction={<Button>Save</Button>} title="Shopify" />
		<ContentLayout>
			<GridLayout>
				<Box>
					<TextInput label="Access Token" name="accessToken" />
				</Box>
				<Box />
			</GridLayout>
		</ContentLayout>
	</Main>
);

export default HomePage;
