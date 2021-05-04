import { HttpService, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { API_URL, SALARY_CLUSTER_ID, SALARY_CLUSTER_NOT_FOUND_ERROR } from './hh.constants';
import { HhResponse } from './hh.models';
import { HhData } from '../top-page/top-page.model';

@Injectable()
export class HhService {
	private token: string;

	constructor(
		private readonly configService: ConfigService,
		private readonly httpService: HttpService
	) {
		this.token = this.configService.get('HH_TOKEN') ?? '';
	}

	async getData(text: string){
		try {
			const { data } = await this.httpService.get<HhResponse>(API_URL.vacancies, {
				params: {
					text,
					clusters: true
				},
				headers: {
					// FIXME: Add valid info for hh requests
					'User-Agent': 'InfoAboutSite (InfoAboutAuthor)',
					Authorization: 'Bearer ' + this.token
				}
			}).toPromise();
			return this.parseData(data);
		} catch (e) {
			Logger.error(e);
		}

	}

	private parseData(data: HhResponse): HhData {
		const salaryCluster = data.clusters.find(c => c.id == SALARY_CLUSTER_ID);
		if (!salaryCluster) {
			throw new Error(SALARY_CLUSTER_NOT_FOUND_ERROR);
		}

		const juniorSalary = this.getSalaryFromString(salaryCluster.items[1].name);
		const middleSalary = this.getSalaryFromString(salaryCluster.items[Math.ceil(salaryCluster.items.length / 2)].name);
		const seniorSalary = this.getSalaryFromString(salaryCluster.items[salaryCluster.items.length - 1].name);

		return {
			count: data.found,
			juniorSalary,
			middleSalary,
			seniorSalary,
			updatedAt: new Date()
		};
	}

	private getSalaryFromString(s: string): number {
		const numberRegExp = /(\d+)/g;
		const res = s.match(numberRegExp);
		if (!res){
			return 0;
		}
		return Number(res[0]);
	}
}
