import { ApiProperty } from '@nestjs/swagger';

/**
 * Clase que representa el objeto de transferencia de un jugador
 * con información de su usuario.
 * @class
 */
export class PlayerWithUserDTO {
	@ApiProperty() playerId: string;
	@ApiProperty() userId: string;
	@ApiProperty() username: string;
	@ApiProperty() icon: string;
	@ApiProperty() isMarked: boolean;
	@ApiProperty() status: string;
	@ApiProperty() position: number;
	@ApiProperty() score: number;
	@ApiProperty() isActive: boolean;
	@ApiProperty() cardDesignId: string;
	@ApiProperty() cardDesignName: string;
}