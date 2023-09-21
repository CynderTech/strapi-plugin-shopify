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
	const [baseUrl, setBaseUrl] = useState('');
	const [accessToken, setAccessToken] = useState('');

	const { get, put } = useFetchClient();
	const toggleNotification = useNotification();

	const mutation = useMutation({
		mutationFn: async (newSettings: {
			accessToken: String;
			baseUrl: String;
		}) => {
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
			setBaseUrl(data?.settings?.baseUrl);
			setAccessToken(data?.settings?.accessToken);
		});
	}, [setAccessToken, setBaseUrl]);

	return (
		<Main>
			<Helmet title="Shopify" />

			<HeaderLayout
				primaryAction={
					<Button
						disabled={isEmpty(baseUrl) || isEmpty(accessToken)}
						onClick={() => {
							mutation.mutate({ baseUrl, accessToken });
						}}
					>
						Save
					</Button>
				}
				title="Shopify"
			/>
			<ContentLayout>
				<GridLayout>
					<Box padding={4}>
						<TextInput
							label="Base URL"
							name="baseUrl"
							onChange={(e) => setBaseUrl(e.target.value)}
							value={baseUrl}
						/>
					</Box>
					<Box />
				</GridLayout>
				<GridLayout>
					<Box padding={4}>
						<TextInput
							label="Access Token"
							name="accessToken"
							onChange={(e) => setAccessToken(e.target.value)}
							value={accessToken}
						/>
					</Box>
					<Box />
				</GridLayout>
			</ContentLayout>
		</Main>
	);
};

export default SettingsPage;
