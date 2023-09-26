import React, { useState } from 'react';
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
import { isEmpty } from 'lodash';

const HomePage = () => {
	const [content, setContent] = useState('');

	return (
		<Main>
			<Helmet title="Shopify" />

			<HeaderLayout
				primaryAction={
					<Button disabled={isEmpty(content)}>Save</Button>
				}
				title="Shopify"
			/>
			<ContentLayout>
				<GridLayout>
					<Box>
						<TextInput
							label="Access Token"
							name="accessToken"
							onChange={(e) => setContent(e.target.value)}
							value={content}
						/>
					</Box>
					<Box />
				</GridLayout>
			</ContentLayout>
		</Main>
	);
};

export default HomePage;
