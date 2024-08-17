import './game-player-list.component.css';
import {JSX} from 'react';
import {PlayerWithUserType} from '../../../../types/player-with-user.type.ts';
import {buildProfileImageRoute} from '../../../../utils/profile-image.utils.ts';
import {LocalLoadingComponent} from '../../../../components/loading/local/local-loading.component.tsx';
import {GameType} from '../../../../types/game.type.ts';
import {PlayerConstants} from '../../../../utils/constants/player.constants.ts';

/**
 * Componente de la lista de jugadores de un juego.
 * @param props Los parámetros necesarios para el funcionamiento del componente.
 * @param props.players Los jugadores del juego.
 * @param props.game El juego.
 * @constructor
 */
export function GamePlayersListComponent(props: {
    players: PlayerWithUserType[] | undefined
    game: GameType | undefined,
}): JSX.Element {
    return (
        <>
            <div id='game-player-list-component-container' className='component-container'>
                {
                    props.players
                        ? props.players.map((player) => {
                            return (
                                <div
                                    className={`game-player-list-component-card ${player.isMarked ? 'game-player-list-component-card-selected' : ''}`}
                                    key={player.username}>
                                    <img
                                        alt=''
                                        className={`game-player-list-component-card-image ${player.status === PlayerConstants.IN_TURN_PLAYER_STATUS ? 'game-player-image-spin' : ''}`}
                                        src={buildProfileImageRoute(player.icon)}
                                    />
                                    <div className='game-player-list-component-card-texts'>
                                        <p className={player.isMarked ? 'game-player-list-component-card-texts-marked' : ''}>{props.game && props.game.hostId === player.userId ? 'King' : ''}</p>
                                        <h4>{player.username}</h4>
                                        <p>Puntos: {player.score}</p>
                                    </div>
                                </div>
                            );
                        })
                        : <LocalLoadingComponent loading={true} showBackground={false}/>
                }
            </div>
        </>
    );
}