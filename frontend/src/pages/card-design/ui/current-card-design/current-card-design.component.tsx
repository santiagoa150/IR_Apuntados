import {JSX, useEffect, useState} from 'react';
import './current-card-design.component.css';
import {CardComponent} from '../../../../components/card/card.component.tsx';
import {CardSuitsConstants} from '../../../../utils/constants/card-suits.constants.ts';
import {CheckBoxGroupComponent} from '../../../../components/check-box-group/check-box-group.component.tsx';
import {CardDesignType} from '../../../../types/card-design.type.ts';
import {LocalLoadingComponent} from '../../../../components/loading/local/local-loading.component.tsx';
import {BackendConstants} from '../../../../utils/constants/backend.constants.ts';
import {BackendUtils} from '../../../../utils/backend.utils.tsx';
import {GetCurrentCardDesign} from '../../../../types/services/get-current-card-design.ts';

/**
 * Componente en dónde se define el tablero de cartas.
 * @constructor
 */
export function CurrentCardDesignComponent(): JSX.Element {

    /**
     * Hooks para el funcionamiento del componente.
     */
    const [suit, setSuit] = useState<CardSuitsConstants>(CardSuitsConstants.SPADE);
    const [cardDesign, setCardDesign] = useState<CardDesignType | undefined>(undefined);

    /**
     * Utils para acceder al diseño de carta actual en el backend.
     * @const {BackendUtils}
     */
    const backendUtils: BackendUtils = new BackendUtils();

    useEffect(() => {

        async function fetchData(): Promise<void> {
            const res = await backendUtils.get<GetCurrentCardDesign, never>(BackendConstants.GET_CURRENT_CARD_DESIGN_URL);
            if (res) setCardDesign(res.design);
        }

        fetchData();
    });

    /**
     * Datos quemados para el funcionamiento del componente.
     */
    const top: Array<string> = ['2', '3', '4', '5', '6', '7'];
    const bottom: Array<string> = ['8', '9', '10', 'J', 'Q', 'K'];
    const right: string = 'A';

    return (
        <section id='card-table-component-container' className='component-container'>
            <h1>Diseño actual</h1>
            <section>
                {
                    cardDesign
                        ? <>
                            <div>
                                {
                                    top.map((d) => {
                                        return (
                                            <CardComponent key={d} suit={suit} type={d} designName={cardDesign.name}/>
                                        );
                                    })
                                }
                            </div>
                            <div>
                                {
                                    bottom.map((d) => {
                                        return (
                                            <CardComponent key={d} suit={suit} type={d} designName={cardDesign.name}/>
                                        );
                                    })
                                }
                            </div>
                            <div id='card-table-component-right'>
                                <CardComponent suit={suit} type={right} designName={cardDesign.name}/>
                            </div>
                        </>
                        : <LocalLoadingComponent loading={true} showBackground={false}/>
                }

            </section>
            <div>
                <CheckBoxGroupComponent
                    label=''
                    selected={suit}
                    setSelected={setSuit}
                    values={[
                        {value: CardSuitsConstants.SPADE, label: 'Picas'},
                        {value: CardSuitsConstants.CLUB, label: 'Tréboles'},
                        {value: CardSuitsConstants.DIAMOND, label: 'Diamantes'},
                        {value: CardSuitsConstants.HEART, label: 'Corazones'}
                    ]}
                />
            </div>
        </section>
    );
}