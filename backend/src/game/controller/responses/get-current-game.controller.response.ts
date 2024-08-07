import { DefaultResponse } from '../../../shared/default.response';
import { ApiProperty } from '@nestjs/swagger';
import { GameDTO } from '../../game';
import { PlayerWithUserDTO } from '../../../player/player-with-user.dto';
import { DiscardedCardsDTO } from '../../../match/discarded-cards';

export class GetCurrentGameControllerResponse extends DefaultResponse {
	@ApiProperty({ type: GameDTO }) game: GameDTO;
	@ApiProperty({ type: [PlayerWithUserDTO] }) players: Array<PlayerWithUserDTO>;
	@ApiProperty({ type: DiscardedCardsDTO }) discardedCards?: DiscardedCardsDTO;
}