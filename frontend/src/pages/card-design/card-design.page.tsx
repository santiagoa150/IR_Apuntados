import {JSX, useState} from 'react';
import {CurrentCardDesignComponent} from './ui/current-card-design/current-card-design.component.tsx';
import {VerticalLineComponent} from '../../components/vertical-line/vertical-line.component.tsx';
import {CardDesignsShopComponent} from './ui/shop/card-designs-shop.component.tsx';
import {CardDesignType} from '../../types/card-design.type.ts';
import {CardDesignsHeaderComponent} from './ui/header/card-designs-header.component.tsx';
import './card-design.page.css';

/**
 * Página de los diseños de cartas.
 * @constructor
 */
export function CardDesignPage(): JSX.Element {

    /**
     * Hook que permite manejar los diseños del usuario.
     */
    const [selectedDesign, selectSelectedDesign] = useState<CardDesignType | undefined>(undefined);
    const [userDesign, selectUserDesign] = useState<CardDesignType | undefined>(undefined);

    return (
        <>
            <div id='card-designs-page-container' className='page-container'>
                <CardDesignsHeaderComponent
                    userDesign={userDesign}
                    selectedDesign={selectedDesign}
                    selectUserCardDesign={selectUserDesign}
                />
                <CurrentCardDesignComponent
                    selectedDesign={selectedDesign}
                    selectUserCardDesign={selectUserDesign}
                />
                <VerticalLineComponent id='card-designs-page-vertical-line'/>
                <CardDesignsShopComponent selectDesign={selectSelectedDesign}/>
            </div>
        </>
    );
}