import React, { useEffect, useState } from 'react';
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
import { useFetchClient, useNotification } from '@strapi/helper-plugin';
import { useMutation } from '@tanstack/react-query';
import { isEmpty } from 'lodash';

const SettingsPage = () => {
	const [content, setContent] = useState('');

	const { get, put } = useFetchClient();
	const toggleNotification = useNotification();

	const mutation = useMutation({
		mutationFn: async (newSettings: { accessToken: String }) => {
			await put('/shopify/settings', newSettings);
		},
		onSuccess: () => {
			toggleNotification({
				type: 'success',
				message: { defaultMessage: 'Saved' },
			});
		},
	});

	useEffect(() => {
		get('/shopify/settings').then(({ data }) => {
			setContent(data?.settings?.accessToken);
		});
	}, [setContent]);

	return (
		<Main>
			<Helmet title="Shopify" />

			<HeaderLayout
				primaryAction={
					<Button
						disabled={isEmpty(content)}
						onClick={() => {
							mutation.mutate({ accessToken: content });
						}}
					>
						Save
					</Button>
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

export default SettingsPage;
