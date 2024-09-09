const { CONSTANTS } = require("../constants/constants");

/**
 * Retrieves Pocketbase token.
 * @returns {Promise<string>} - Promise resolving to the Pocketbase Token.
 * @throws {Error} - If the request fails or response status is not 200.
 */
async function fetchPocketbaseToken() {
	const TAG = '[fetchPocketbaseToken]';

	try {
		const formData = new FormData();
		formData.append('identity', CONSTANTS.pocketbaseAuthIdentity);
		formData.append('password', CONSTANTS.pocketbaseAuthPassword);

		const fetchResponse = await fetch(`${CONSTANTS.pocketbaseUrl}/api/collections/user/auth-with-password`, {
			method: 'POST',
			body: formData,
		});

		if (fetchResponse.status !== 200) {
			throw new Error('Could not fetchPocketbaseToken');
		}

		/** @type {PocketbaseLoginResponse} */
		const body = await fetchResponse.json();
		console.log(`${TAG} HTTP=200; token: ${body.token.slice(0, 10)}...`);
		return body.token;
	} catch (error) {
		console.log(TAG, error);
		throw error;
	}
}

/**
 * Represents a Pocketbase login response.
 * @typedef {Object} PocketbaseLoginResponse
 * @property {Object} record - Record object.
 * @property {string} token - Authorization token.
 */

module.exports = {
    fetchPocketbaseToken
};