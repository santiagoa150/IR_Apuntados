/**
 * Todas las combinaciones posibles de las ternas.
 */
export const AllowedTrips: Set<string> = new Set([
	'A-CLUB,A-CLUB,A-DIAMOND',
	'A-CLUB,A-CLUB,A-HEART',
	'A-CLUB,A-CLUB,A-SPADE',
	'A-CLUB,A-DIAMOND,A-DIAMOND',
	'A-CLUB,A-DIAMOND,A-HEART',
	'A-CLUB,A-DIAMOND,A-SPADE',
	'A-CLUB,A-HEART,A-HEART',
	'A-CLUB,A-HEART,A-SPADE',
	'A-CLUB,A-SPADE,A-SPADE',
	'A-DIAMOND,A-DIAMOND,A-HEART',
	'A-DIAMOND,A-DIAMOND,A-SPADE',
	'A-DIAMOND,A-HEART,A-HEART',
	'A-DIAMOND,A-HEART,A-SPADE',
	'A-DIAMOND,A-SPADE,A-SPADE',
	'A-HEART,A-HEART,A-SPADE',
	'A-HEART,A-SPADE,A-SPADE',
	'C2-CLUB,C2-CLUB,C2-DIAMOND',
	'C2-CLUB,C2-CLUB,C2-HEART',
	'C2-CLUB,C2-CLUB,C2-SPADE',
	'C2-CLUB,C2-DIAMOND,C2-DIAMOND',
	'C2-CLUB,C2-DIAMOND,C2-HEART',
	'C2-CLUB,C2-DIAMOND,C2-SPADE',
	'C2-CLUB,C2-HEART,C2-HEART',
	'C2-CLUB,C2-HEART,C2-SPADE',
	'C2-CLUB,C2-SPADE,C2-SPADE',
	'C2-DIAMOND,C2-DIAMOND,C2-HEART',
	'C2-DIAMOND,C2-DIAMOND,C2-SPADE',
	'C2-DIAMOND,C2-HEART,C2-HEART',
	'C2-DIAMOND,C2-HEART,C2-SPADE',
	'C2-DIAMOND,C2-SPADE,C2-SPADE',
	'C2-HEART,C2-HEART,C2-SPADE',
	'C2-HEART,C2-SPADE,C2-SPADE',
	'C3-CLUB,C3-CLUB,C3-DIAMOND',
	'C3-CLUB,C3-CLUB,C3-HEART',
	'C3-CLUB,C3-CLUB,C3-SPADE',
	'C3-CLUB,C3-DIAMOND,C3-DIAMOND',
	'C3-CLUB,C3-DIAMOND,C3-HEART',
	'C3-CLUB,C3-DIAMOND,C3-SPADE',
	'C3-CLUB,C3-HEART,C3-HEART',
	'C3-CLUB,C3-HEART,C3-SPADE',
	'C3-CLUB,C3-SPADE,C3-SPADE',
	'C3-DIAMOND,C3-DIAMOND,C3-HEART',
	'C3-DIAMOND,C3-DIAMOND,C3-SPADE',
	'C3-DIAMOND,C3-HEART,C3-HEART',
	'C3-DIAMOND,C3-HEART,C3-SPADE',
	'C3-DIAMOND,C3-SPADE,C3-SPADE',
	'C3-HEART,C3-HEART,C3-SPADE',
	'C3-HEART,C3-SPADE,C3-SPADE',
	'C4-CLUB,C4-CLUB,C4-DIAMOND',
	'C4-CLUB,C4-CLUB,C4-HEART',
	'C4-CLUB,C4-CLUB,C4-SPADE',
	'C4-CLUB,C4-DIAMOND,C4-DIAMOND',
	'C4-CLUB,C4-DIAMOND,C4-HEART',
	'C4-CLUB,C4-DIAMOND,C4-SPADE',
	'C4-CLUB,C4-HEART,C4-HEART',
	'C4-CLUB,C4-HEART,C4-SPADE',
	'C4-CLUB,C4-SPADE,C4-SPADE',
	'C4-DIAMOND,C4-DIAMOND,C4-HEART',
	'C4-DIAMOND,C4-DIAMOND,C4-SPADE',
	'C4-DIAMOND,C4-HEART,C4-HEART',
	'C4-DIAMOND,C4-HEART,C4-SPADE',
	'C4-DIAMOND,C4-SPADE,C4-SPADE',
	'C4-HEART,C4-HEART,C4-SPADE',
	'C4-HEART,C4-SPADE,C4-SPADE',
	'C5-CLUB,C5-CLUB,C5-DIAMOND',
	'C5-CLUB,C5-CLUB,C5-HEART',
	'C5-CLUB,C5-CLUB,C5-SPADE',
	'C5-CLUB,C5-DIAMOND,C5-DIAMOND',
	'C5-CLUB,C5-DIAMOND,C5-HEART',
	'C5-CLUB,C5-DIAMOND,C5-SPADE',
	'C5-CLUB,C5-HEART,C5-HEART',
	'C5-CLUB,C5-HEART,C5-SPADE',
	'C5-CLUB,C5-SPADE,C5-SPADE',
	'C5-DIAMOND,C5-DIAMOND,C5-HEART',
	'C5-DIAMOND,C5-DIAMOND,C5-SPADE',
	'C5-DIAMOND,C5-HEART,C5-HEART',
	'C5-DIAMOND,C5-HEART,C5-SPADE',
	'C5-DIAMOND,C5-SPADE,C5-SPADE',
	'C5-HEART,C5-HEART,C5-SPADE',
	'C5-HEART,C5-SPADE,C5-SPADE',
	'C6-CLUB,C6-CLUB,C6-DIAMOND',
	'C6-CLUB,C6-CLUB,C6-HEART',
	'C6-CLUB,C6-CLUB,C6-SPADE',
	'C6-CLUB,C6-DIAMOND,C6-DIAMOND',
	'C6-CLUB,C6-DIAMOND,C6-HEART',
	'C6-CLUB,C6-DIAMOND,C6-SPADE',
	'C6-CLUB,C6-HEART,C6-HEART',
	'C6-CLUB,C6-HEART,C6-SPADE',
	'C6-CLUB,C6-SPADE,C6-SPADE',
	'C6-DIAMOND,C6-DIAMOND,C6-HEART',
	'C6-DIAMOND,C6-DIAMOND,C6-SPADE',
	'C6-DIAMOND,C6-HEART,C6-HEART',
	'C6-DIAMOND,C6-HEART,C6-SPADE',
	'C6-DIAMOND,C6-SPADE,C6-SPADE',
	'C6-HEART,C6-HEART,C6-SPADE',
	'C6-HEART,C6-SPADE,C6-SPADE',
	'C7-CLUB,C7-CLUB,C7-DIAMOND',
	'C7-CLUB,C7-CLUB,C7-HEART',
	'C7-CLUB,C7-CLUB,C7-SPADE',
	'C7-CLUB,C7-DIAMOND,C7-DIAMOND',
	'C7-CLUB,C7-DIAMOND,C7-HEART',
	'C7-CLUB,C7-DIAMOND,C7-SPADE',
	'C7-CLUB,C7-HEART,C7-HEART',
	'C7-CLUB,C7-HEART,C7-SPADE',
	'C7-CLUB,C7-SPADE,C7-SPADE',
	'C7-DIAMOND,C7-DIAMOND,C7-HEART',
	'C7-DIAMOND,C7-DIAMOND,C7-SPADE',
	'C7-DIAMOND,C7-HEART,C7-HEART',
	'C7-DIAMOND,C7-HEART,C7-SPADE',
	'C7-DIAMOND,C7-SPADE,C7-SPADE',
	'C7-HEART,C7-HEART,C7-SPADE',
	'C7-HEART,C7-SPADE,C7-SPADE',
	'C8-CLUB,C8-CLUB,C8-DIAMOND',
	'C8-CLUB,C8-CLUB,C8-HEART',
	'C8-CLUB,C8-CLUB,C8-SPADE',
	'C8-CLUB,C8-DIAMOND,C8-DIAMOND',
	'C8-CLUB,C8-DIAMOND,C8-HEART',
	'C8-CLUB,C8-DIAMOND,C8-SPADE',
	'C8-CLUB,C8-HEART,C8-HEART',
	'C8-CLUB,C8-HEART,C8-SPADE',
	'C8-CLUB,C8-SPADE,C8-SPADE',
	'C8-DIAMOND,C8-DIAMOND,C8-HEART',
	'C8-DIAMOND,C8-DIAMOND,C8-SPADE',
	'C8-DIAMOND,C8-HEART,C8-HEART',
	'C8-DIAMOND,C8-HEART,C8-SPADE',
	'C8-DIAMOND,C8-SPADE,C8-SPADE',
	'C8-HEART,C8-HEART,C8-SPADE',
	'C8-HEART,C8-SPADE,C8-SPADE',
	'C9-CLUB,C9-CLUB,C9-DIAMOND',
	'C9-CLUB,C9-CLUB,C9-HEART',
	'C9-CLUB,C9-CLUB,C9-SPADE',
	'C9-CLUB,C9-DIAMOND,C9-DIAMOND',
	'C9-CLUB,C9-DIAMOND,C9-HEART',
	'C9-CLUB,C9-DIAMOND,C9-SPADE',
	'C9-CLUB,C9-HEART,C9-HEART',
	'C9-CLUB,C9-HEART,C9-SPADE',
	'C9-CLUB,C9-SPADE,C9-SPADE',
	'C9-DIAMOND,C9-DIAMOND,C9-HEART',
	'C9-DIAMOND,C9-DIAMOND,C9-SPADE',
	'C9-DIAMOND,C9-HEART,C9-HEART',
	'C9-DIAMOND,C9-HEART,C9-SPADE',
	'C9-DIAMOND,C9-SPADE,C9-SPADE',
	'C9-HEART,C9-HEART,C9-SPADE',
	'C9-HEART,C9-SPADE,C9-SPADE',
	'C10-CLUB,C10-CLUB,C10-DIAMOND',
	'C10-CLUB,C10-CLUB,C10-HEART',
	'C10-CLUB,C10-CLUB,C10-SPADE',
	'C10-CLUB,C10-DIAMOND,C10-DIAMOND',
	'C10-CLUB,C10-DIAMOND,C10-HEART',
	'C10-CLUB,C10-DIAMOND,C10-SPADE',
	'C10-CLUB,C10-HEART,C10-HEART',
	'C10-CLUB,C10-HEART,C10-SPADE',
	'C10-CLUB,C10-SPADE,C10-SPADE',
	'C10-DIAMOND,C10-DIAMOND,C10-HEART',
	'C10-DIAMOND,C10-DIAMOND,C10-SPADE',
	'C10-DIAMOND,C10-HEART,C10-HEART',
	'C10-DIAMOND,C10-HEART,C10-SPADE',
	'C10-DIAMOND,C10-SPADE,C10-SPADE',
	'C10-HEART,C10-HEART,C10-SPADE',
	'C10-HEART,C10-SPADE,C10-SPADE',
	'J-CLUB,J-CLUB,J-DIAMOND',
	'J-CLUB,J-CLUB,J-HEART',
	'J-CLUB,J-CLUB,J-SPADE',
	'J-CLUB,J-DIAMOND,J-DIAMOND',
	'J-CLUB,J-DIAMOND,J-HEART',
	'J-CLUB,J-DIAMOND,J-SPADE',
	'J-CLUB,J-HEART,J-HEART',
	'J-CLUB,J-HEART,J-SPADE',
	'J-CLUB,J-SPADE,J-SPADE',
	'J-DIAMOND,J-DIAMOND,J-HEART',
	'J-DIAMOND,J-DIAMOND,J-SPADE',
	'J-DIAMOND,J-HEART,J-HEART',
	'J-DIAMOND,J-HEART,J-SPADE',
	'J-DIAMOND,J-SPADE,J-SPADE',
	'J-HEART,J-HEART,J-SPADE',
	'J-HEART,J-SPADE,J-SPADE',
	'Q-CLUB,Q-CLUB,Q-DIAMOND',
	'Q-CLUB,Q-CLUB,Q-HEART',
	'Q-CLUB,Q-CLUB,Q-SPADE',
	'Q-CLUB,Q-DIAMOND,Q-DIAMOND',
	'Q-CLUB,Q-DIAMOND,Q-HEART',
	'Q-CLUB,Q-DIAMOND,Q-SPADE',
	'Q-CLUB,Q-HEART,Q-HEART',
	'Q-CLUB,Q-HEART,Q-SPADE',
	'Q-CLUB,Q-SPADE,Q-SPADE',
	'Q-DIAMOND,Q-DIAMOND,Q-HEART',
	'Q-DIAMOND,Q-DIAMOND,Q-SPADE',
	'Q-DIAMOND,Q-HEART,Q-HEART',
	'Q-DIAMOND,Q-HEART,Q-SPADE',
	'Q-DIAMOND,Q-SPADE,Q-SPADE',
	'Q-HEART,Q-HEART,Q-SPADE',
	'Q-HEART,Q-SPADE,Q-SPADE',
	'K-CLUB,K-CLUB,K-DIAMOND',
	'K-CLUB,K-CLUB,K-HEART',
	'K-CLUB,K-CLUB,K-SPADE',
	'K-CLUB,K-DIAMOND,K-DIAMOND',
	'K-CLUB,K-DIAMOND,K-HEART',
	'K-CLUB,K-DIAMOND,K-SPADE',
	'K-CLUB,K-HEART,K-HEART',
	'K-CLUB,K-HEART,K-SPADE',
	'K-CLUB,K-SPADE,K-SPADE',
	'K-DIAMOND,K-DIAMOND,K-HEART',
	'K-DIAMOND,K-DIAMOND,K-SPADE',
	'K-DIAMOND,K-HEART,K-HEART',
	'K-DIAMOND,K-HEART,K-SPADE',
	'K-DIAMOND,K-SPADE,K-SPADE',
	'K-HEART,K-HEART,K-SPADE',
	'K-HEART,K-SPADE,K-SPADE',
	'A-CLUB,C2-CLUB,C3-CLUB',
	'C2-CLUB,C3-CLUB,C4-CLUB',
	'C3-CLUB,C4-CLUB,C5-CLUB',
	'C4-CLUB,C5-CLUB,C6-CLUB',
	'C5-CLUB,C6-CLUB,C7-CLUB',
	'C6-CLUB,C7-CLUB,C8-CLUB',
	'C7-CLUB,C8-CLUB,C9-CLUB',
	'C10-CLUB,C8-CLUB,C9-CLUB',
	'C10-CLUB,C9-CLUB,J-CLUB',
	'C10-CLUB,J-CLUB,Q-CLUB',
	'J-CLUB,K-CLUB,Q-CLUB',
	'A-CLUB,K-CLUB,Q-CLUB',
	'A-CLUB,C2-CLUB,K-CLUB',
	'A-DIAMOND,C2-DIAMOND,C3-DIAMOND',
	'C2-DIAMOND,C3-DIAMOND,C4-DIAMOND',
	'C3-DIAMOND,C4-DIAMOND,C5-DIAMOND',
	'C4-DIAMOND,C5-DIAMOND,C6-DIAMOND',
	'C5-DIAMOND,C6-DIAMOND,C7-DIAMOND',
	'C6-DIAMOND,C7-DIAMOND,C8-DIAMOND',
	'C7-DIAMOND,C8-DIAMOND,C9-DIAMOND',
	'C10-DIAMOND,C8-DIAMOND,C9-DIAMOND',
	'C10-DIAMOND,C9-DIAMOND,J-DIAMOND',
	'C10-DIAMOND,J-DIAMOND,Q-DIAMOND',
	'J-DIAMOND,K-DIAMOND,Q-DIAMOND',
	'A-DIAMOND,K-DIAMOND,Q-DIAMOND',
	'A-DIAMOND,C2-DIAMOND,K-DIAMOND',
	'A-HEART,C2-HEART,C3-HEART',
	'C2-HEART,C3-HEART,C4-HEART',
	'C3-HEART,C4-HEART,C5-HEART',
	'C4-HEART,C5-HEART,C6-HEART',
	'C5-HEART,C6-HEART,C7-HEART',
	'C6-HEART,C7-HEART,C8-HEART',
	'C7-HEART,C8-HEART,C9-HEART',
	'C10-HEART,C8-HEART,C9-HEART',
	'C10-HEART,C9-HEART,J-HEART',
	'C10-HEART,J-HEART,Q-HEART',
	'J-HEART,K-HEART,Q-HEART',
	'A-HEART,K-HEART,Q-HEART',
	'A-HEART,C2-HEART,K-HEART',
	'A-SPADE,C2-SPADE,C3-SPADE',
	'C2-SPADE,C3-SPADE,C4-SPADE',
	'C3-SPADE,C4-SPADE,C5-SPADE',
	'C4-SPADE,C5-SPADE,C6-SPADE',
	'C5-SPADE,C6-SPADE,C7-SPADE',
	'C6-SPADE,C7-SPADE,C8-SPADE',
	'C7-SPADE,C8-SPADE,C9-SPADE',
	'C10-SPADE,C8-SPADE,C9-SPADE',
	'C10-SPADE,C9-SPADE,J-SPADE',
	'C10-SPADE,J-SPADE,Q-SPADE',
	'J-SPADE,K-SPADE,Q-SPADE',
	'A-SPADE,K-SPADE,Q-SPADE',
	'A-SPADE,C2-SPADE,K-SPADE'
]);