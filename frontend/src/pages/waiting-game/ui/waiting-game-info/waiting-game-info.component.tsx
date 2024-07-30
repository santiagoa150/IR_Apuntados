import {GameType} from '../../../../types/game.type.ts';
import {JSX} from 'react';
import {LocalLoadingComponent} from '../../../../components/loading/local/local-loading.component.tsx';
import './waiting-game-info.component.css';

/**
 * Componente para listar el juego actual en una sala de espera.
 * @param props Los parámetros necesarios para el funcionamiento del componente.
 * @param {GameType | undefined} props.game El juego actual.
 * @constructor
 */
export function WaitingGameInfoComponent(props: { game: GameType | undefined }): JSX.Element {

    return (
        <>
            <div id='waiting-game-info-component-container' className='component-container'>
                {
                    props.game
                        ?
                        <div id='waiting-game-info-component-header'>
                            <h4 id='waiting-game-info-component-header-left'>Nombre: {props.game.name}</h4>
                            <h4 id='waiting-game-info-component-header-right'>Apuesta: {props.game.betByPlayer * props.game.requiredPlayers}</h4>
                        </div>
                        : <LocalLoadingComponent loading={true} showBackground={false}/>
                }
            </div>
        </>
    );
}