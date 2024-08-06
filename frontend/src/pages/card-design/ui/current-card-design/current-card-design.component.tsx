import {Dispatch, JSX, SetStateAction, useEffect, useState} from 'react';
import {CardComponent} from '../../../../components/card/card.component.tsx';
import {CardSuitsConstants} from '../../../../utils/constants/card-suits.constants.ts';
import {CheckBoxGroupComponent} from '../../../../components/check-box-group/check-box-group.component.tsx';
import {CardDesignType} from '../../../../types/card-design.type.ts';
import {LocalLoadingComponent} from '../../../../components/loading/local/local-loading.component.tsx';
import {BackendUtils} from '../../../../utils/backend.utils.tsx';
import {GetCurrentCardDesign} from '../../../../types/services/get-current-card-design.ts';
import {BackendConstants} from '../../../../utils/constants/backend.constants.ts';
import './current-card-design.component.css';

/**
 * Componente en dónde se define el tablero de cartas.
 * @param props Los parámetros necesarios para el funcionamiento del componente.
 * @param {Dispatch<SetStateAction<CardDesignType | undefined>>} props.selectUserCardDesign Hook
 * que permite guardar el diseño de carta del usuario.
 * @param {CardDesignType | undefined} props.selectedDesign El diseño seleccionado por
 * el usuario.
 * @constructor
 */
export function CurrentCardDesignComponent(
    props: {
        selectUserCardDesign: Dispatch<SetStateAction<CardDesignType | undefined>>
        selectedDesign: CardDesignType | undefined
    }
): JSX.Element {

    /**
     * Hooks para el funcionamiento del componente.
     */
    const [suit, setSuit] = useState<CardSuitsConstants>(CardSuitsConstants.SPADE);
    const [cardDesign, setCardDesign] = useState<CardDesignType | undefined>(props.selectedDesign);
    const [getFromBackend, setGetFromBackend] = useState<boolean>(false);

    /**
     * Utils para acceder al diseño de carta actual en el backend.
     * @const {BackendUtils}
     */
    const backendUtils: BackendUtils = new BackendUtils();

    useEffect(() => {

        async function fetchData(): Promise<void> {
            if (props.selectedDesign) {
                setCardDesign(props.selectedDesign);
            } else if (!getFromBackend) {
                const res = await backendUtils.get<GetCurrentCardDesign, never>(BackendConstants.GET_CURRENT_CARD_DESIGN_URL);
                if (res) {
                    setGetFromBackend(true);
                    setCardDesign(res.design);
                    props.selectUserCardDesign(res.design);
                }
            }
        }

        fetchData().then();
    });

    /**
     * Datos quemados para el funcionamiento del componente.
     */
    const top: Array<string> = ['C2', 'C3', 'C4', 'C5', 'C6', 'C7'];
    const bottom: Array<string> = ['C8', 'C9', 'C10', 'J', 'Q', 'K'];
    const right: string = 'A';

    return (
        <section id='current-card-design-component-container' className='component-container'>
            <h1>Diseño actual</h1>
            <section className='component-container'>
                <div id='current-card-design-table-container'>
                    {
                        cardDesign
                            ? <>
                                <div id='current-card-design-component-top'>
                                    {
                                        top.map((d) => {
                                            return (
                                                <CardComponent key={d} suit={suit} type={d} designName={cardDesign.name}/>
                                            );
                                        })
                                    }
                                </div>
                                <div id='current-card-design-component-bottom'>
                                    {
                                        bottom.map((d) => {
                                            return (
                                                <CardComponent key={d} suit={suit} type={d} designName={cardDesign.name}/>
                                            );
                                        })
                                    }
                                </div>
                                <div id='current-card-design-component-right'>
                                    <CardComponent suit={suit} type={right} designName={cardDesign.name}/>
                                </div>
                            </>
                            : <LocalLoadingComponent loading={true} showBackground={false}/>
                    }
                </div>
            </section>
            <div id='current-card-design-check-box-group'>
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