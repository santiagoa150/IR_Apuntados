import {GameType} from '../game.type.ts';
import {PlayerWithUserType} from '../player-with-user.type.ts';
import {DiscardedCardsType} from '../discarded-cards.type.ts';

/**
 * La respuesta del servicio para obtener el detalle del juego actual.
 */
export type GetCurrentGameDetailResponse = {
    success: boolean;
    game: GameType;
    players: PlayerWithUserType[];
    discardedCards?: DiscardedCardsType;
}