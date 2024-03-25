import {Dispatch, JSX, SetStateAction} from 'react';
import {CardDesignShopType} from '../../../../types/card-design.shop.type.ts';
import {CardDesignTitleConstants} from '../../../../utils/constants/card-design.constants.ts';
import {Button} from '@mui/material';
import {CardComponent} from '../../../../components/card/card.component.tsx';
import {CardSuitsConstants} from '../../../../utils/constants/card-suits.constants.ts';
import {CardDesignType} from '../../../../types/card-design.type.ts';
import './card-design-card.component.css';

/**
 * Componente que renderiza la card de un diseño de carta.
 * @param props Los parámetros necesarios para el funcionamiento del componente.
 * @param props.design El diseño de carta que visualiza la card.
 * @param props.selectDesign Hook que selecciona la carta para visualizar.
 * @constructor
 */
export function CardDesignCardComponent(
    props: {
        design: CardDesignShopType;
        selectDesign: Dispatch<SetStateAction<CardDesignType | undefined>>,
    }
): JSX.Element {

    const {design} = props;

    return (
        <>
            <div id='card-design-card-component-container'>
                <h3>{CardDesignTitleConstants[design.name]}</h3>
                <div id='card-design-card-component-buttons-container'>
                    {
                        design.canSelect
                            ? <Button
                                variant='contained'
                                onClick={() => props.selectDesign(design)}
                            >Visualizar</Button>
                            : <Button
                                variant='contained'
                            >Comprar</Button>
                    }
                </div>
                <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                    <CardComponent
                        type='A'
                        suit={CardSuitsConstants.SPADE}
                        designName={design.name}
                    />
                </div>
            </div>
        </>
    );
}