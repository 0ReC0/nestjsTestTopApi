import { Injectable } from '@nestjs/common';
import { FileElementResponseDto } from './dto/file-element.response.dto';
import { format } from 'date-fns';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import * as sharp from 'sharp';
import { Mfile } from './mfile.class';

@Injectable()
export class FilesService {

	async saveFiles(files: Mfile[]): Promise<FileElementResponseDto[]> {
		const dateFolder = format(new Date, 'yyyy-MM-dd');
		const uploadFolder = `${path}/uploads/${dateFolder}`;
		await ensureDir(uploadFolder);
		const res: FileElementResponseDto[] = [];
		for(const file of files) {
			 await writeFile(`${uploadFolder}/${file.originalname}`,  file.buffer);
			 res.push({ url: `${dateFolder}/${file.originalname}`, name: file.originalname});

		}
		return res;
	}

	convertToWebP(file: Buffer): Promise<Buffer>{
		return sharp(file)
			.webp()
			.toBuffer();
	}
}
