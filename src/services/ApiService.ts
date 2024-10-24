import { API_URL, Status } from "@/utils/constants";
import {
	Award,
	BusinessResponse,
	Discount,
	ProductResponse,
	Subscription,
} from "@/utils/types";
import apisauce, { ApisauceInstance } from "apisauce";


import { generateCardNumber } from "@/utils/helpers";
import { err } from "react-native-svg";

interface PropsBusinesses {
	token: string,
	latitude: number,
	longitude: number,
	category?: string,
}

export default class ApiService {




	// async existCode(id: number, user_id: string): Promise<any | null> {
	// 	const { data, error } = await this.client
	// 		.from("GeneratedCodes")
	// 		.select("*")
	// 		.eq("discount_code_id", id)
	// 		.eq("user_id", user_id)
	// 		.eq("active", true);

	// 	if (error) {
	// 		console.log(error);
	// 		throw error;
	// 	}

	// 	if (data.length > 0) {
	// 		const expireAt = new Date(data[0].expireAt);
	// 		const hasExpire = expireAt < new Date();
	// 		if (hasExpire) {
	// 			await this.client
	// 				.from("GeneratedCodes")
	// 				.update({ active: false })
	// 				.eq("id", data[0].id);
	// 			return null;
	// 		}

	// 		return data[0];
	// 	}

	// 	return null;
	// }
	// async generateQrCode(id: number) {
	// 	console.log(id);
	// 	const { data, error } = await this.client
	// 		.from("GeneratedCodes")
	// 		.insert([{ discount_code_id: id }])
	// 		.returns()
	// 		.select("*");
	// 	if (error) {
	// 		console.log(error);
	// 		throw error;
	// 	}

	// 	const qr = await fetch(
	// 		"https://nskabxlhjggmvpxjqeie.supabase.co/functions/v1/winap-generate-qr",
	// 		{
	// 			method: "POST",
	// 			headers: { Authorization: `Bearer ${API_URL}` },
	// 			body: JSON.stringify({ code_id: data[0].id }),
	// 		},
	// 	);
	// 	const qrData = await qr.json();

	// 	return qrData;
	// }

	async getBusinesses(address: string, token: string): Promise<BusinessResponse> {

		const near = await fetch(
			`https://nskabxlhjggmvpxjqeie.supabase.co/functions/v1/business-by-address?address=${address}`,
			{
				method: "POST",
				headers: { Authorization: `Bearer ${token}` },
				body: JSON.stringify({ address }),
			},
		);

		const data = await near.json();

		return data.near.filter((business: any) => !!business);
	}









	// async getProducts(businessId: number): Promise<ProductResponse> {
	// 	const { data, error } = await this.client
	// 		.from("Products")
	// 		.select("*")
	// 		.eq("business_id", businessId);

	// 	if (error) {
	// 		console.log(error);
	// 		throw error;
	// 	}
	// 	return data;
	// } 



	/* ========================activar y desactivar negocios a favoritos========================= */


	async AddAndRemoveFavorite(businessId: string, token: string) {
		try {
			console.log('antes de mandarse favoritos', businessId);

			businessId = businessId.toString();

			const response = await fetch(`${API_URL}/favourite_business`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ businessId }), // Enviar como objeto JSON
			});

			console.log('después de mandarse la favoritos', response);

			if (!response.ok) {
				// Manejar errores HTTP
				const errorData = await response.json();
				console.error('Error en la favoritos:', errorData);
				throw new Error(`Error ${response.status}: ${response.statusText}`);
			}

			return response.json();
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	/* ========================Obtener todos los negocios favoritos=========================  */


	async getFavorites(token: string) {
		try {
			const response = await fetch(
				`${API_URL}/favourite_businesses?active=true`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);
			const data = await response.json();
			return data;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}




	/* ========================Obtener todas las suscripciones=========================  */

	async getSubscriptions(
		token: string,
	) {
		const response = await fetch(
			`${API_URL}/me/subscriptions`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		const data = await response.json();
		return data;
	}

	/* ========================Suscribirse a un negocio========================= */

	async subscribe(businessId: string, AuthToken: string) {
		try {
			console.log('antes de mandarse la suscripcion', businessId);

			const response = await fetch(`${API_URL}/subscription`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${AuthToken}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ businessId }), // Enviar como objeto JSON
			});

			console.log('despues de mandarse la suscripcion', response);

			if (!response.ok) {
				// Manejar errores HTTP
				const errorData = await response.json();
				console.error('Error en la suscripción:', errorData);
				throw new Error(`Error ${response.status}: ${response.statusText}`);
			}

			return response.json();
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	// async getDiscounts(
	// 	businessId: number,
	// 	type: "award" | "gift",
	// 	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	// ): Promise<Award[] | any> {
	// 	if (type === "award") {
	// 		const { data, error } = await this.client
	// 			.from("DiscountCodes")
	// 			.select("* Products(*)")
	// 			.eq("business_id", businessId)
	// 			.neq("point_cost", 0);
	// 		if (error) {
	// 			console.log(error);
	// 			throw error;
	// 		}
	// 		return data;
	// 	}

	// 	const { data, error } = await this.client
	// 		.from("DiscountCodes")
	// 		.select("* Products(*)")
	// 		.eq("business_id", businessId)
	// 		.eq("point_cost", 0);

	// 	if (error) {
	// 		console.log(error);
	// 		throw error;
	// 	}
	// 	return data;
	// }

	// async getOrders(userId: string, status: Status[], business_id: number) {
	// 	return fetch(
	// 		"https://",
	// 		{
	// 			method: "POST",
	// 			headers: {
	// 				Authorization: `Bearer ${API_URL}`,
	// 				"Content-Type": "application/json",
	// 			},
	// 			body: JSON.stringify({ user_id: userId, status, business_id }),
	// 		},
	// 	).then((res) => res.json());
	// }

	async createOrder(order: any, token: any) {

		try {
			console.log('antes de mandarse la suscripcion', order);

			const response = await fetch(
				`${API_URL}/order`,
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify(order),
				})
			console.log(response.status)
			const result = await response.json()
			const ordered = result.data.order
			

			

			return ordered;
		} catch (error) {
			console.log(error);
			throw error;
		}

	}

	async getClientOrderById(token: string, OrderId: string) {
		try {
			const near = await fetch(`${API_URL}/me/order?id=${OrderId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log(near.status)
			const response = await near.json();
			console.log(response)



			return response.data.order;

		} catch (error) {
			throw error
		}
	}




	/* ========================Obtener toda las Categorías de los negocios=============== */

	async getAllCategoriesBusinesses(accessToken: string) {
		try {
			const response = await fetch(`${API_URL}/business/categories`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			const data = await response.json();
		

			if (data && data.status === "success") {
				return data;
			}
		} catch (error) {
			if (error instanceof SyntaxError) {
				console.error('Invalid JSON response:', error);
			} else {
				console.error('Other error:', error);
			}
		}
	}



	// ========================Obtener todas las categorías de los productos=========================
	async getAllCategoriesProducts(accessToken: string) {
		try {
			const response = await fetch(`${API_URL}/product/categories`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			const data = await response.json();
			

			if (data && data.status === "success") {
				return data;
			}
		} catch (error) {
			if (error instanceof SyntaxError) {
				console.error('Invalid JSON response:', error);
			} else {
				console.error('Other error:', error);
			}
		}
	}




	// ========================Obtener negocios por categoría=========================
	async getBusinessesByLocationAndCategory(
		{ token, latitude, longitude, category }: PropsBusinesses,
	): Promise<BusinessResponse> {
		const response = await fetch(
			`${API_URL}/business/nearby?latitude=${latitude}&longitude=${longitude}${category ? `&categoryId=${category}` : ''}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		const data = await response.json();
		

		return data;
	}


	// ========================Obtener productos por negocios=========================

	async getProductsByBusinessId(
		{ token, businessId }: { token: string; businessId: string },
	) {
		try {
			const response = await fetch(`${API_URL}/products/business?id=${businessId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const data = await response.json();
			

			if (data && data.status === "success") {
				return data;
			}
		} catch (error) {
			if (error instanceof SyntaxError) {
				console.error('Invalid JSON response:', error);
			} else {
				console.error('Other error:', error);
			}
		}
	}








	// obtener addons de producto con id de addon


	async getAddonsById(
		token: string,
	) {
		try {
			const response = await fetch(`${API_URL}/addon?id=56e2d247-97f8-4008-ac6f-a51c06f66dbc`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const data = await response.json();
			

			if (data && data.status === "success") {
				return data.data.addon;
			}
		} catch (error) {
			if (error instanceof SyntaxError) {
				console.error('Invalid JSON response:', error);
			} else {
				console.error('Other error:', error);
			}
		}
	}


	// obtener addons de producto con id de producto


	async getAddonsByProductId(
		{ token, businessId }: { token: string; businessId: string },
	) {
		try {
			const response = await fetch(`${API_URL}/products/business?id=${businessId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const data = await response.json();
			

			if (data && data.status === "success") {
				return data;
			}
		} catch (error) {
			if (error instanceof SyntaxError) {
				console.error('Invalid JSON response:', error);
			} else {
				console.error('Other error:', error);
			}
		}
	}






}






