export type BusinessResponse = Business[];
export type ProductResponse = Product[];

export type Business = {
	id: number;
	name: string;
	description: string;
	logo: string;
	banner: string;
	address: string;
	latitude: number;
	longitude: number;
	status: string;
	open:boolean;
	userId: string;
	categoryId: string;
	country: string;
	created_at: string;
	updated_at: string;
	deletedAt: string;
	distance: string;
};

export type Distance = {
	value: number;
	text: string;
};
export type Customization = {
	id: string;
	name: string;
	price: number;
	ischecked: boolean;
	
	
};

export type Product = {
	id: string;
	name: string;
	description: string;
	image: string;
	unitPrice: number;
	active: boolean;
	stock: number;
	categoryId: string;
	businessId: number;
	createdAt: string;
	updatedAt: string;
	deletedAt: string;
	addons:Array<T>;
	
};

export type Subscription = {
	id: number;
	userId: string;
	businessId: number;
	credits: number;
	active: boolean;
	created_at: string;
	updated_at: string;
	deleted_at: string;
};

export type Discount = {
	id: number;
	business_id: number;
	code: string;
	discount: number;
	created_at: Date;
	active: boolean;
	deleted: boolean;
};

export type Award = {
	id: number;
	name: string;
	description: string;
	point_cost: number;
	type: number;
	discount: number | null;
	created_at: Date;
	active: boolean;
	deleted: boolean;
	Products: Product;
	image: string;
};
