import {JSX} from 'react';
import {VerticalLineComponent} from '../../components/vertical-line/vertical-line.component.tsx';
import {LoginComponent} from './ui/login/login.component.tsx';
import {RegisterComponent} from './ui/register/register.component.tsx';
import './default.page.css';

/**
 * Página por defecto del sistema.
 * @constructor
 */
export function DefaultPage(): JSX.Element {
    return (
        <>
            <div id='default-page-container' className='page-container'>
                <header>
                    <h1>Apuntado</h1>
                </header>
                <LoginComponent/>
                <VerticalLineComponent id='default-page-vertical-line'/>
                <RegisterComponent/>
            </div>
        </>
    );
} 