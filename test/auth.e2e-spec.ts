import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';
import { AuthDto } from '../src/auth/dto/auth.dto';


const loginDto: AuthDto = {
	login: 'temp@temp.com',
	password: 'tempPassword1'
};

describe('AuthController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();

	});


	it('/auth/login (POST) - success', async (done) => {
	return request(app.getHttpServer())
		.post('/auth/login')
		.send(loginDto)
		.expect(200)
		.then(({body}: request.Response) => {
			const access_token = body.access_token;
			expect(access_token).toBeDefined();
			done();
		});
	});

	it('/auth/login (POST) - fail by email', () => {
	return request(app.getHttpServer())
		.post('/auth/login')
		.send({...loginDto, login: 'asdad@asdada.com'})
		.expect(401, {
			'statusCode': 401,
			'message': 'Пользователь с таким email не найден',
			'error': 'Unauthorized'
		});
	});

	it('/auth/login (POST) - fail by password', () => {
	return request(app.getHttpServer())
		.post('/auth/login')
		.send({...loginDto, password: 'sadadasdadad'})
		.expect(401, {
			'statusCode': 401,
			'message': 'Неверный пароль',
			'error': 'Unauthorized'
		});
	});

	afterAll(() => {
		disconnect();
	});
});
