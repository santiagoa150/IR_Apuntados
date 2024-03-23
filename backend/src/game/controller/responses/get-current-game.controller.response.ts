import { DefaultResponse } from '../../../shared/default.response';
import { ApiProperty } from '@nestjs/swagger';
import { GameDTO } from '../../game';

export class GetCurrentGameControllerResponse extends DefaultResponse {
	@ApiProperty({ type: GameDTO}) game: GameDTO;
}