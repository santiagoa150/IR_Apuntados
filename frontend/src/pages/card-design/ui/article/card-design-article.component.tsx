import {Dispatch, JSX, SetStateAction} from 'react';
import {CardDesignShopType} from '../../../../types/card-design.shop.type.ts';
import {CardDesignTitleConstants} from '../../../../utils/constants/card-design.constants.ts';
import {CardComponent} from '../../../../components/card/card.component.tsx';
import {CardSuitsConstants} from '../../../../utils/constants/card-suits.constants.ts';
import {CardDesignType} from '../../../../types/card-design.type.ts';
import ClickImage from '../../../../assets/images/icons/click.png';
import ShoppingCart from '../../../../assets/images/icons/shopping-cart.png';
import './card-design-article.component.css';

/**
 * Componente que renderiza la card de un diseño de carta.
 * @param props Los parámetros necesarios para el funcionamiento del componente.
 * @param props.design El diseño de carta que visualiza la card.
 * @param props.selectDesign Hook que selecciona la carta para visualizar.
 * @constructor
 */
export function CardDesignArticleComponent(
    props: {
        design: CardDesignShopType;
        selectDesign: Dispatch<SetStateAction<CardDesignType | undefined>>,
    }
): JSX.Element {

    const {design} = props;

    return (
        <>
            <div id='card-design-article-component-container'>
                <h3>{CardDesignTitleConstants[design.name]}</h3>
                <div
                    style={{width: '100%', display: 'flex', justifyContent: 'center', position: 'relative'}}
                >
                    <div
                        className='card-design-article-icon'
                        onClick={() => design.canSelect ? props.selectDesign(design) : console.log('Not implemented yet')}
                        style={{backgroundImage: `url(${design.canSelect ? ClickImage : ShoppingCart})`}}
                    ></div>
                    <div>
                        <CardComponent
                            type='A'
                            suit={CardSuitsConstants.SPADE}
                            designName={design.name}
                            positionClassName='card-design-article-image'
                        />
                    </div>
                </div>
            </div>
        </>
    );
}