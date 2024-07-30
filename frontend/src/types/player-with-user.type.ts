/**
 * Definición de los datos de los jugadores.
 */
export type PlayerWithUserType = {
    playerId: string;
    userId: string;
    username: string;
    icon: string;
    isMarked: boolean;
    status: string;
    position: number;
    score: number;
    isActive: boolean;
    cardDesignId: string;
    cardDesignName: string;
}