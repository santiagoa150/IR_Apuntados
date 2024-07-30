import {JSX} from 'react';
import {Link} from 'react-router-dom';
import {Button, ButtonGroup} from '@mui/material';
import {RoutesConstants} from '../../../../config/app.router.tsx';
import TutorialPDF from '../../../../assets/documents/Tutorial.pdf';
import './home-header.component.css';
import {UserType} from '../../../../types/user.type.ts';
import {LocalLoadingComponent} from '../../../../components/loading/local/local-loading.component.tsx';
import {buildProfileImageRoute} from '../../../../utils/profile-image.utils.ts';

/**
 * Componente en dónde se define el header de la página
 * principal de la aplicación
 * @constructor
 */
export function HomeHeaderComponent(
    props: {
        user: UserType | undefined,
        openIProfileConfigModel: () => (void),
    }
): JSX.Element {

    return (
        <>
            <header id='home-header-component-container' className='component-container'>
                <div id='home-header-button-group-container' className='component-container'>
                    <ButtonGroup
                        id='home-header-button-group'
                        variant="contained"
                        aria-label="outlined primary button group"
                    >
                        <div className='home-header-button-container'>
                            <a
                                target="_blank"
                                href={TutorialPDF}
                                rel="noopener noreferrer"
                            >
                                <Button>Reglas</Button>
                            </a>
                        </div>
                        <Link
                            to={RoutesConstants.CARD_DESIGNS_ROUTE}
                            className='home-header-button-container'
                        >
                            <Button>Cartas</Button>
                        </Link>
                        <div className='home-header-button-container'>
                            <Button>Tokens</Button>
                        </div>
                    </ButtonGroup>
                </div>
                <div id='home-header-info'>
                    {
                        props.user
                            ? <>
                                <img
                                    alt=''
                                    className='home-header-info-image'
                                    onClick={() => props.openIProfileConfigModel()}
                                    src={buildProfileImageRoute(props.user.icon)}/>
                                <h4>{props.user.tokens}</h4>
                            </>
                            : <div className='home-header-info-image'>
                                <LocalLoadingComponent loading={true} showBackground={false}/>
                            </div>
                    }
                </div>
            </header>
        </>
    );
}