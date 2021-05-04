export interface HhResponse{
	items: Item[];
	found: number;
	pages: number;
	per_page: number;
	page: number;
	clusters: Cluster[];
	// tslint:disable-next-line:no-any
	arguments?: any;
	alternate_url: string;
}

export interface Cluster {
	name: string;
	id: string;
	items: Item2[];
}

export interface Item2 {
	name: string;
	url: string;
	count: number;
}

export interface Item {
	id: string;
	premium: boolean;
	name: string;
	// tslint:disable-next-line:no-any
	department?: any;
	has_test: boolean;
	response_letter_required: boolean;
	///.....other props
}
