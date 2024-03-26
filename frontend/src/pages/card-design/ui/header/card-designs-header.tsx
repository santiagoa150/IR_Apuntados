import {Dispatch, JSX, SetStateAction, useState} from 'react';
import {Link} from 'react-router-dom';
import {RoutesConstants} from '../../../../config/app.router.tsx';
import {Button, ButtonGroup} from '@mui/material';
import {CardDesignType} from '../../../../types/card-design.type.ts';
import './card-designs-header.css';
import {AlertComponent} from '../../../../components/alert/alert.component.tsx';
import {AlertTypeConstants} from '../../../../utils/constants/alert.constants.ts';
import {BackendUtils} from '../../../../utils/backend.utils.tsx';
import {GlobalLoadingComponent} from '../../../../components/loading/global/global-loading.component.tsx';
import {
    UpdateUserCardDesignRequest,
    UpdateUserCardDesignResponse
} from '../../../../types/services/update-user-card-design.ts';
import {BackendConstants} from '../../../../utils/constants/backend.constants.ts';

/**
 * Componente que renderiza el header de los diseños de cartas.
 * @param props Parámetros necesarios para el funcionamiento del componente
 * @param {CardDesignType | undefined} props.selectedDesign El diseño seleccionado por el usuario.
 * @param {Dispatch<SetStateAction<CardDesignType | undefined>>} props.selectUserCardDesign Hook que
 * permite actualizar el diseño de carta del usuario.
 * @param {CardDesignType | undefined} props.userDesign El diseño del usuario.
 * @constructor
 */
export function CardDesignsHeader(
    props: {
        selectedDesign: CardDesignType | undefined,
        selectUserCardDesign: Dispatch<SetStateAction<CardDesignType | undefined>>
        userDesign: CardDesignType | undefined,
    }
): JSX.Element {

    /**
     * Hooks encargados de manejar el funcionamiento del componente.
     * - La configuración para los componentes de carga.
     * - La configuración para los componentes de alertas.
     */
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const backendUtils: BackendUtils = new BackendUtils(
        (message: string) => {
            setLoading(false);
            setErrorMessage(message);
        });

    /**
     * Método que permite actualizar el diseño de carta de un usuario en el backend.
     * @returns {Promise<void | false>} Se retorna "false" si no están los datos requeridos
     * para actualizar el diseño de carta.
     */
    const selectDesign = async (): Promise<void | false> => {
        if (!props.selectedDesign || !props.selectedDesign.cardDesignId) {
            setErrorMessage('CARD_DESIGN_ID_IS_REQUIRED_ERROR');
            return false;
        }
        setLoading(true);
        const body: UpdateUserCardDesignRequest = {cardDesignId: props.selectedDesign.cardDesignId};
        const res = await backendUtils.patch<UpdateUserCardDesignResponse, UpdateUserCardDesignRequest>(
            BackendConstants.UPDATE_USER_CARD_DESIGN_URL, body
        );
        if (res) {
            props.selectUserCardDesign(props.selectedDesign);
            setLoading(false);
        }
    };

    return (
        <>
            <header id='card-designs-header-component-container' className='component-container'>
                <ButtonGroup
                    variant='contained'
                    id='card-designs-header-button-group'
                    aria-label="outlined primary button group"
                >
                    <Link
                        className='card-header-header-button'
                        to={RoutesConstants.HOME_ROUTE}
                    >
                        <Button
                            variant='contained'
                        >Atrás</Button>
                    </Link>
                    <div className='card-header-header-button'>
                        <Button
                            variant='contained'
                            onClick={selectDesign}
                            disabled={
                                !props.selectedDesign ||
                                props.userDesign?.cardDesignId === props.selectedDesign.cardDesignId
                            }
                        >Guardar</Button>
                    </div>
                </ButtonGroup>
            </header>
            <AlertComponent
                type={AlertTypeConstants.ERROR_ALERT}
                rawMessage={errorMessage}
                setRawMessage={setErrorMessage}
            />
            <GlobalLoadingComponent loading={loading}/>
        </>
    );
}