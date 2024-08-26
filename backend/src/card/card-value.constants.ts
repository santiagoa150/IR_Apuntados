import { CardTypeConstants } from './card-type.constants';

/**
 * Constantes que definen los valores de cada tipo de cartas.
 */
export const CardValueConstants: Record<CardTypeConstants, number> = {
	[CardTypeConstants.A]: 10,
	[CardTypeConstants.C2]: 2,
	[CardTypeConstants.C3]: 3,
	[CardTypeConstants.C4]: 4,
	[CardTypeConstants.C5]: 5,
	[CardTypeConstants.C6]: 6,
	[CardTypeConstants.C7]: 7,
	[CardTypeConstants.C8]: 8,
	[CardTypeConstants.C9]: 9,
	[CardTypeConstants.C10]: 10,
	[CardTypeConstants.J]: 10,
	[CardTypeConstants.Q]: 10,
	[CardTypeConstants.K]: 10,
};