import {JSX, useState} from 'react';
import {CurrentCardDesignComponent} from './ui/current-card-design/current-card-design.component.tsx';
import {VerticalLineComponent} from '../../components/vertical-line/vertical-line.component.tsx';
import {CardDesignsShopComponent} from './ui/card-designs-shop/card-designs-shop.component.tsx';
import {CardDesignType} from '../../types/card-design.type.ts';
import './card-design.page.css';

/**
 * Página de los diseños de cartas.
 * @constructor
 */
export function CardDesignPage(): JSX.Element {

    const [design, selectDesign] = useState<CardDesignType | undefined>(undefined);

    return (
        <>
            <div id='card-designs-page-container' className='page-container'>
                <CurrentCardDesignComponent selectedDesign={design}/>
                <VerticalLineComponent id='card-designs-page-vertical-line'/>
                <CardDesignsShopComponent selectDesign={selectDesign}/>
            </div>
        </>
    );
}