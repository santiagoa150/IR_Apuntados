import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

/**
 * Clase que representa la guardia para el login de los usuarios.
 * @class
 * @extends {AuthGuard('local')}
 */
@Injectable()
export class LoginGuard extends AuthGuard('local') {
}