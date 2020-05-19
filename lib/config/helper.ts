import * as CryptoJS from 'crypto-js';
import { secret } from '../config/database';
import { format} from 'date-fns';

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

	export function formatDate(dateString: string) {
		const reportingDate =  dateString.split('/');
		return format(new Date(+reportingDate[2], +reportingDate[0] - 1, +reportingDate[1]), 'yyyy-MM-dd');
	}
} 