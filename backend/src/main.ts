import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { AppExceptionFilter } from './shared/app.exception-filter';
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
		new Logger().log(`Server running on port ${Number(process.env.APP_PORT)}`);
	});
