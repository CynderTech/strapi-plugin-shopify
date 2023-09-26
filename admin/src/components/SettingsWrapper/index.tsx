/* eslint-disable import/extensions */
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import SettingsPage from '../../pages/SettingsPage';

const queryClient = new QueryClient();

const SettingsWrapper = () => (
	<QueryClientProvider client={queryClient}>
		<SettingsPage />
	</QueryClientProvider>
);

export default SettingsWrapper;
