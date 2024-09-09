const { CONSTANTS } = require("../constants/constants");

/**
 * Retrieves integration by its ID.
 * @returns {Promise<string>} - Promise resolving to the Uint8Array.
 * @throws {Error} - If the request fails or response status is not 200.
 */
async function fetchWorkForceOneToken() {
	const TAG = '[fetchWorkForceOneToken]'
	try {
		const fetchResponse = await fetch(`${CONSTANTS.workForceOneUrl}/api/Authentication/login`, {
			method: 'POST',
			body: JSON.stringify({
				userName: CONSTANTS.workForceOneAuthUserName,
				password: CONSTANTS.workForceOneAuthPassword,
			}),
		});

		if (fetchResponse.status !== 200) {
			throw new Error('Could not fetch WorkforceOne Token');
		}
		
		/** @type {WorkForceOneTokenResponse} */
		const body = await fetchResponse.json();
		console.log(`${TAG} HTTP=200; token: ${body.token.slice(0, 10)}...`);
		return body.token;
	} catch (error) {
		console.log(`${TAG} HTTP=FAILED;`);
		console.log(error);
		throw error;
	}
}

/**
 * Represents the response object for WorkForceOne token.
 * @typedef {Object} WorkForceOneTokenResponse
 * @property {string} token - The token.
 * @property {string} email - The email.
 * @property {string} fullName - The full name.
 * @property {string} userName - The username.
 * @property {number} roleId - The role ID.
 * @property {string} cname - The cname.
 */

module.exports = {
    fetchWorkForceOneToken
};