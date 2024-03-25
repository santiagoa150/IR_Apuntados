import {JSX} from 'react';
import {VerticalLineComponent} from '../../components/vertical-line/vertical-line.component.tsx';
import { HomeHeader } from './ui/header/home-header.tsx';
import './home.page.css';

/**
 * Página principal del sistema.
 * @constructor
 */
export function HomePage(): JSX.Element {
    return (
        <>
            <div
                id='home-page-container'
                className='page-container'
            >
                <HomeHeader/>
                <section></section>
                <VerticalLineComponent id='home-page-vertical-line'/>
                <section></section>
            </div>
        </>
    );
}