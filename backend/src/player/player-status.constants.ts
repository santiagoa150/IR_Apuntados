export enum PlayerStatusConstants {
	/**
	 * El estado representa cuando un jugador está en su turno.
	 */
	IN_TURN = 'IN_TURN',
	/**
	 * El estado representa cuando un jugador ha perdido el juego.
	 */
	LOSER = 'LOSER',
	/**
	 * El estado representa cuando un jugar está tocando una partida.
	 */
	TOUCHING = 'TOUCHING',
	/**
	 * El estado representa cuando el jugador está esperando que
	 * comience el juego.
	 */
	WAITING_GAME = 'WAITING_GAME',
	/**
	 * El estado representa cuando el jugador está esperando su próximo
	 * turno.
	 */
	WAITING_TURN = 'WAITING_TURN',
	/**
	 * El estado representa cuando un jugador ha ganado un juego.
	 */
	WINNER = 'WINNER',
}