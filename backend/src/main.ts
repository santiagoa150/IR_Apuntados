import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { AppExceptionFilter } from './shared/exceptions/app.exception-filter';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as process from 'process';

/**
 * Función que levanta el backend de Apuntado.\
 * Define:
 * - El prefijo global de la aplicación.
 * - La tubería de validación de requests.
 * - Los cors de la aplicación.
 * - El filtro global de excepciones.
 *
 * @function
 * @async
 */
async function bootstrap(): Promise<void> {
	const app: INestApplication = await NestFactory.create(AppModule);
	app.setGlobalPrefix(process.env.APP_GLOBAL_PREFIX);
	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalFilters(new AppExceptionFilter());
	app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
	app.enableCors();

	const config = new DocumentBuilder()
		.setTitle('Apuntado Requisitos')
		.setDescription('Servicios de la aplicación de apuntado')
		.setVersion('v1')
		.addBearerAuth()
		.build();
	const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup(process.env.APP_DOCS_URI, app, document);
	await app.listen(Number(process.env.APP_PORT));
}

bootstrap()
	.then(() => {
		const logger: Logger = new Logger();
		logger.log(`Server running on :: ${process.env.APP_URL}`);
		logger.log(`Swagger running on :: ${process.env.APP_URL}/${process.env.APP_DOCS_URI}`);
	});
