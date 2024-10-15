import { PREFIX } from "./constants";

export const formatCardNumber = (creditCardNumber: string): string => {
	const lastFourDigits = creditCardNumber.substr(creditCardNumber.length - 4);
	return `xxxx xxxx xxxx ${lastFourDigits}`;
};

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const generateCardNumber = (): string => {
	const randomNumbers = Array.from({ length: 12 }, () =>
		Math.floor(Math.random() * 10),
	).join("");
	return `${PREFIX}${randomNumbers}`;
};
