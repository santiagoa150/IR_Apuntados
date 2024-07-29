import {Dispatch, JSX, SetStateAction, useEffect, useState} from 'react';
import {CardDesignShopType} from '../../../../types/card-design.shop.type.ts';
import {CardDesignArticleComponent} from '../article/card-design-article.component.tsx';
import {LocalLoadingComponent} from '../../../../components/loading/local/local-loading.component.tsx';
import {BackendConstants} from '../../../../utils/constants/backend.constants.ts';
import {BackendUtils} from '../../../../utils/backend.utils.tsx';
import {GetActiveCardDesigns} from '../../../../types/services/get-active-card-designs.ts';
import {CardDesignType} from '../../../../types/card-design.type.ts';
import './card-designs-shop.component.css';

/**
 * Componente en dónde se define la tienda de diseños de cartas.
 * @param props Parámetros necesarios para el funcionamiento del componente.
 * @param {Dispatch<SetStateAction<CardDesignType | undefined>>} props.selectDesign Hook
 * que permite seleccionar un diseño de carta.
 * @constructor
 */
export function CardDesignsShopComponent(
    props: {
        selectDesign: Dispatch<SetStateAction<CardDesignType | undefined>>
    }
): JSX.Element {

    /**
     * Hook encargado de manejar los diseños de cartas del sistema.
     */
    const [cardDesigns, setCardDesigns] = useState<Array<CardDesignShopType> | undefined>(undefined);

    /**
     * Utils para acceder al diseño de carta actual en el backend.
     * @const {BackendUtils}
     */
    const backendUtils: BackendUtils = new BackendUtils();

    /**
     * Hook que se encarga de consultar los diseños de cartas del sistema.
     */
    useEffect(() => {
        async function fetchData(): Promise<void> {
            const res = await backendUtils.get<GetActiveCardDesigns, never>(BackendConstants.GET_ACTIVE_CARD_DESIGNS_URL);
            if (res) setCardDesigns(res.data);
        }

        fetchData().then();
    }, []);

    return (
        <section id='card-designs-shop-container' className='component-container'>
            <h1>Diseños</h1>
            <div id='card-designs-shop-available-container' className='component-container'>
                {
                    cardDesigns
                        ? cardDesigns.map((c) => {
                            return <CardDesignArticleComponent
                                design={c}
                                key={c.cardDesignId}
                                selectDesign={props.selectDesign}
                            />;
                        })
                        : <LocalLoadingComponent loading={true} showBackground={false}/>
                }
            </div>
        </section>
    );
}