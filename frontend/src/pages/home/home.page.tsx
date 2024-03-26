import {JSX} from 'react';
import {VerticalLineComponent} from '../../components/vertical-line/vertical-line.component.tsx';
import {HomeHeaderComponent} from './ui/header/home-header.component.tsx';
import './home.page.css';
import {CreateGameComponent} from './ui/create-game/create-game.component.tsx';
import {JoinGameComponent} from './ui/join-game/join-game.component.tsx';

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
                <HomeHeaderComponent/>
                <CreateGameComponent/>
                <VerticalLineComponent id='home-page-vertical-line'/>
                <JoinGameComponent/>
            </div>
        </>
    );
}