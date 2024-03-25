import {JSX} from 'react';
import {CurrentCardDesignComponent} from './ui/current-card-design/current-card-design.component.tsx';
import './card-design.page.css';
import {VerticalLineComponent} from '../../components/vertical-line/vertical-line.component.tsx';

/**
 * Página de los diseños de cartas.
 * @constructor
 */
export function CardDesignPage(): JSX.Element {
    return (
        <>
            <div id='card-designs-page-container' className='page-container'>
                <CurrentCardDesignComponent/>
                <VerticalLineComponent id='card-desigs-page-vertical-line'/>
                <section></section>
            </div>
        </>
    );
}