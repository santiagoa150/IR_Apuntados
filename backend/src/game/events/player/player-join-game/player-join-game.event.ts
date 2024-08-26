import { User } from '../../../../user/user';
import { Player } from '../../../../player/player';
import { Game } from '../../../game';

/**
 * Evento que indica que un usuario ingresó a un juego.
 */
export class PlayerJoinGameEvent {

	/**
	 * @param {User} user El usuario que ingresó al juego.
	 * @param {Player} player El jugador generado.
	 * @param {Game} game El juego al que se ingresó.
	 */
	constructor(
		public readonly user: User,
		public readonly player: Player,
		public readonly game: Game,
	) {
	}
}