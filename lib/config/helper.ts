import * as CryptoJS from 'crypto-js';
import { secret } from '../config/database';

export namespace Helper {
	export function encryptData(data) {
		try {
			return CryptoJS.AES.encrypt(JSON.stringify(data), secret).toString();
		} catch (e) {
			console.log(e);
		}
	}

	export function decryptData(data) {
		try {
			const bytes = CryptoJS.AES.decrypt(data, secret);
			if (bytes.toString()) {
				return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
			}
			return data;
		} catch (e) {
			console.log(e);
		}
	}
} 