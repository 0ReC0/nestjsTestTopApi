export class Mfile {
	constructor(file: Express.Multer.File | Mfile) {
		const newFileName = file.originalname.replace(/\s+/g, '-').toLowerCase();
		this.originalname = newFileName;
		this.buffer = file.buffer;
	}

	originalname: string;
	buffer: Buffer;
}
