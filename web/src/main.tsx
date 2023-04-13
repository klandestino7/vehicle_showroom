import React from 'react'
import ReactDOM from 'react-dom'
import AppShowroom from './AppShowroom'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query';

import { HashRouter } from 'react-router-dom';

const queryClient = new QueryClient();

ReactDOM.render(
    <React.StrictMode>
        <HashRouter>
            <QueryClientProvider client={queryClient}>
                <AppShowroom />
            </QueryClientProvider>
        </HashRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
