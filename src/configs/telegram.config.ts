import { ITelegramOptions } from '../telegram/telegram.interface';
import { ConfigService } from '@nestjs/config';
import { TELEGRAM_TOKEN_NOT_FOUND } from '../telegram/telegram.constants';

export const getTelegramConfig =  (configServce: ConfigService): ITelegramOptions => {
	const token = configServce.get('TELEGRAM_TOKEN');
	if (!token){
		throw new Error(TELEGRAM_TOKEN_NOT_FOUND);
	}
	return {
		token: token,
		chatId: configServce.get('CHAT_ID') ?? ''
	};
};
