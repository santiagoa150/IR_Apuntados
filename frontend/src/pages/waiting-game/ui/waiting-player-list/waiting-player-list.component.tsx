import {JSX} from 'react';
import {PlayerWithUserType} from '../../../../types/player-with-user.type.ts';
import './waiting-player-list.component.css';
import {LocalLoadingComponent} from '../../../../components/loading/local/local-loading.component.tsx';
import {buildProfileImageRoute} from '../../../../utils/profile-image.utils.ts';
import {CardComponent} from '../../../../components/card/card.component.tsx';
import {CardSuitsConstants} from '../../../../utils/constants/card-suits.constants.ts';

/**
 * Componente para listar los jugadores de una página en la sala de espera.
 * @param props Los parámetros del componente.
 * @param {PlayerWithUserType[] | undefined} props.players Los jugadores del juego.
 * @constructor
 */
export function WaitingPlayerListComponent(props: { players: PlayerWithUserType[] | undefined }): JSX.Element {


    return (
        <>
            <div id='waiting-player-list-component-container'>
                {
                    props.players
                        ? props.players.map((player) => {
                            return (
                                <div
                                    className={`waiting-player-list-component-card ${player.isMarked ? 'waiting-player-list-component-card-selected' : ''}`}
                                    key={player.username}>
                                    <div className='waiting-player-list-component-card-top'>
                                        <img
                                            alt=''
                                            className='waiting-player-list-component-card-image'
                                            src={buildProfileImageRoute(player.icon)}
                                        />
                                        <h4>{player.username}</h4>
                                    </div>
                                    <div className='waiting-player-list-component-card-bottom'>
                                        <CardComponent
                                            designName={player.cardDesignName}
                                            suit={CardSuitsConstants.CLUB}
                                            type='A'
                                        />
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