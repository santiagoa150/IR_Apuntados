import {JSX} from 'react';
import {CurrentCardDesignComponent} from './ui/current-card-design/current-card-design.component.tsx';
import {VerticalLineComponent} from '../../components/vertical-line/vertical-line.component.tsx';
import {CardDesignsShopComponent} from './ui/card-designs-shop/card-designs-shop.component.tsx';
import './card-design.page.css';

/**
 * Página de los diseños de cartas.
 * @constructor
 */
export function CardDesignPage(): JSX.Element {
    return (
        <>
            <div id='card-designs-page-container' className='page-container'>
                <CurrentCardDesignComponent/>
                <VerticalLineComponent id='card-designs-page-vertical-line'/>
                <CardDesignsShopComponent/>
            </div>
        </>
    );
}