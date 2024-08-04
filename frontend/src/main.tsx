import ReactDOM from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {AppTheme} from './config/app.theme.tsx';
import {AppRouter} from './config/app.router.tsx';
import './main.css';
import {WebsocketProvider} from './config/websocket.provider.tsx';

/**
 * Define:
 * - La construcción del DOM con React.
 * - El tema de la aplicación.
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeProvider theme={AppTheme}>
        <CssBaseline/>
        <WebsocketProvider>
            <RouterProvider router={AppRouter}/>
        </WebsocketProvider>
    </ThemeProvider>
);
