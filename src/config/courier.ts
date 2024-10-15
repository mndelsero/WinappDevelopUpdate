import { CourierClient } from "@trycourier/courier";
import { COURIER_CLIENT_KEY } from "../utils/constants";

type GenericObject = {
	[key: string]: string | number | boolean | GenericObject;
};

const courier = new CourierClient({ authorizationToken: COURIER_CLIENT_KEY });

const sendNotification = async (
	expoPushToken: string,
	template: string,
	data: GenericObject,
) => {
	try {
		const response = await courier.send({
			message: {
				to: {
					// @ts-ignore
					expo: {
						token: expoPushToken,
					},
				},
				template: template,
				data: data,
			},
		});
		console.log(response);
	} catch (error) {
		console.log(error);
	}
};

export default sendNotification;
