import {JSX} from 'react';
import {CardDesignShopType} from '../../../../types/card-design.shop.type.ts';
import {CardDesignTitleConstants} from '../../../../utils/constants/card-design.constants.ts';
import {Button} from '@mui/material';
import {CardComponent} from '../../../../components/card/card.component.tsx';
import {CardSuitsConstants} from '../../../../utils/constants/card-suits.constants.ts';
import './card-design-card.component.css';

export function CardDesignCardComponent(
    props: {
        design: CardDesignShopType
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
                            >Seleccionar</Button>
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