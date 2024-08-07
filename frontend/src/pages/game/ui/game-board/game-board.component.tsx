import './game-board.component.css';
import {JSX, useEffect, useState} from 'react';
import {DiscardedCardsType} from '../../../../types/discarded-cards.type.ts';
import {PlayerType} from '../../../../types/player.type.ts';
import {BackendConstants} from '../../../../utils/constants/backend.constants.ts';
import {BackendUtils} from '../../../../utils/backend.utils.tsx';
import {LocalLoadingComponent} from '../../../../components/loading/local/local-loading.component.tsx';
import {GetCurrentPlayerResponse} from '../../../../types/services/get-current-player.ts';
import {CardComponent} from '../../../../components/card/card.component.tsx';

/**
 *  Componente que define el tablero del juego.
 *  @param props Los parámetros para el funcionamiento del juego.
 *  @param props.discardedCards Las cartas desechadas de la partida.
 * @constructor
 */
export function GameBoardComponent(props: { discardedCards: DiscardedCardsType | undefined }): JSX.Element {

    const [player, setPlayer] = useState<PlayerType | undefined>();
    const [currentDesign, setCurrentDesign] = useState<string | undefined>();

    useEffect(() => {
        async function fetchData(): Promise<void> {
            const backendUtils: BackendUtils = new BackendUtils();
            const res = await backendUtils.get<GetCurrentPlayerResponse, never>(BackendConstants.GET_CURRENT_PLAYER_URL);
            if (res) {
                setPlayer(res.player);
                setCurrentDesign(res.currentDesignName);
            }
        }

        fetchData().then();
    }, []);

    return (
        <>
            <div id='game-board-component-container' className='component-container'>
                <div>

                </div>
                <div id='game-board-cards-container'>
                    {
                        player
                            ? <>
                                <div id='game-board-trips-container'>
                                    <div>
                                        {player.trips1.map((c) => {
                                            return (
                                                <CardComponent
                                                    key={c.suit + c.type}
                                                    designName={currentDesign ?? 'DEFAULT'}
                                                    suit={c.suit}
                                                    type={c.type}
                                                />
                                            );
                                        })}
                                    </div>
                                    <div>
                                        {player.trips2.map((c) => {
                                            return (
                                                <CardComponent
                                                    key={c.suit + c.type}
                                                    designName={currentDesign ?? 'DEFAULT'}
                                                    suit={c.suit}
                                                    type={c.type}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                                <div id='game-board-quads-container'>
                                    <div>
                                        {player.quads.map((c) => {
                                            return (
                                                <CardComponent
                                                    key={c.suit + c.type}
                                                    designName={currentDesign ?? 'DEFAULT'}
                                                    suit={c.suit}
                                                    type={c.type}
                                                />
                                            );
                                        })}
                                    </div>
                                    <div>
                                        {
                                            player.kicker
                                                ? <CardComponent
                                                    designName={'RED'}
                                                    suit={player.kicker.suit}
                                                    type={player.kicker.type}
                                                />
                                                : <></>
                                        }
                                    </div>
                                </div>
                            </>
                            : <LocalLoadingComponent loading={true} showBackground={false}/>
                    }
                </div>
            </div>
        </>
    );
}