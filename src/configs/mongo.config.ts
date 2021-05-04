import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

export const getMongoConfig = async (
	configService: ConfigService,
): Promise<TypegooseModuleOptions> => {
	return {
		uri: getMongoString(configService),
		...getMongoOptions(),
	};
};

const getMongoString = (configService: ConfigService) => {
	return (
		'mongodb://' +
		configService.get('DATABASE_USERNAME') +
		':' +
		configService.get('DATABASE_PASSWORD') +
		'@' +
		configService.get('DATABASE_HOST') +
		':' +
		configService.get('DATABASE_PORT') +
		'/' +
		configService.get('DATABASE_NAME')
	);
};

const getMongoOptions = () => ({
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});
