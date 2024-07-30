import {JSX} from 'react';
import {GameType} from '../../../../types/game.type.ts';
import {Button, IconButton} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import './waiting-game-actions.component.css';

/**
 * Componente para listar las acciones de un juego en la sala de espera.
 * @constructor
 */
export function WaitingGameActionsComponent(props: { game: GameType | undefined }): JSX.Element {
    return (
        <>
            <div id='waiting-game-actions-component-container' className='component-container'>
                <IconButton id='waiting-game-actions-component-share-button'>
                    <ShareIcon></ShareIcon>
                </IconButton>
                <Button id='waiting-game-actions-component-start-button' variant='contained'>Iniciar</Button>
            </div>
        </>
    );
}