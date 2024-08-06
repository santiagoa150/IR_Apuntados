/**
 * Definición de los datos de los juegos.
 */
export type GameType = {
    gameId: string;
    creatorId: string;
    hostId: string;
    status: string;
    name: string;
    requiredPlayers: number;
    currentPlayers: number;
    betByPlayer: number;
    isPublic: boolean;
    wasInitiated: boolean;
}