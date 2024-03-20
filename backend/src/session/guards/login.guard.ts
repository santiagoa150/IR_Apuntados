import { AuthGuard } from '@nestjs/passport';

/**
 * Clase que representa la guardia para el login de los usuarios.
 * @class
 * @extends {AuthGuard('local')}
 */
export class LoginGuard extends AuthGuard('local') {
}