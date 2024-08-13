import { ApiProperty } from '@nestjs/swagger';
import { CardDTO } from '../../../card/card';
import { ArrayMaxSize, ArrayMinSize, IsNotEmpty, ValidateNested } from 'class-validator';
import { ExceptionMessagesConstants } from '../../../shared/exceptions/exception-messages.constants';

/**
 * Las cartas requeridas al pasar un turno.
 * @implements {Omit<CardDTO, 'value'>}
 */
export class PassShiftCard implements Omit<CardDTO, 'value'> {

	@ApiProperty()
	@IsNotEmpty({ message: ExceptionMessagesConstants.CARD_TYPE_IS_REQUIRED_ERROR })
		type: string;

	@ApiProperty()
	@IsNotEmpty({ message: ExceptionMessagesConstants.CARD_SUIT_IS_REQUIRED_ERROR })
		suit: string;
}

/**
 * Datos requeridos para que un jugador pueda pasar el turno.
 */
export class PassShiftControllerRequest {

	@ApiProperty({ type: [PassShiftCard] })
	@ArrayMinSize(3, { message: ExceptionMessagesConstants.ONLY_3_CARDS_ARE_REQUIRED_IN_TRIPS_1_ERROR })
	@ArrayMaxSize(3, { message: ExceptionMessagesConstants.ONLY_3_CARDS_ARE_REQUIRED_IN_TRIPS_1_ERROR })
	@ValidateNested({ each: true })
		trips1: [PassShiftCard, PassShiftCard, PassShiftCard];

	@ApiProperty({ type: [PassShiftCard] })
	@ArrayMinSize(3, { message: ExceptionMessagesConstants.ONLY_3_CARDS_ARE_REQUIRED_IN_TRIPS_2_ERROR })
	@ArrayMaxSize(3, { message: ExceptionMessagesConstants.ONLY_3_CARDS_ARE_REQUIRED_IN_TRIPS_2_ERROR })
	@ValidateNested({ each: true })
		trips2: [PassShiftCard, PassShiftCard, PassShiftCard];

	@ApiProperty({ type: [PassShiftCard] })
	@ArrayMinSize(4, { message: ExceptionMessagesConstants.ONLY_4_CARDS_ARE_REQUIRED_IN_QUADS_ERROR })
	@ArrayMaxSize(4, { message: ExceptionMessagesConstants.ONLY_4_CARDS_ARE_REQUIRED_IN_QUADS_ERROR })
	@ValidateNested({ each: true })
		quads: [PassShiftCard, PassShiftCard, PassShiftCard, PassShiftCard];

	@ApiProperty({ type: PassShiftCard })
	@IsNotEmpty({ message: ExceptionMessagesConstants.KICKER_IS_REQUIRED_ERROR })
		kicker: PassShiftCard;
}