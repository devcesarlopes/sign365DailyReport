const { CONSTANTS } = require("../constants/constants");

/**
 * Retrieves integration by its ID.
 * @param {string} token - Authorization token.
 * @param {WfoDocument} wfoDocument - wfoDocument.
 * @returns {Promise<boolean>} - Promise resolving to the Uint8Array.
 * @throws {Error} - If the request fails or response status is not 200.
 */
async function createWfoDocument(token, wfoDocument) {
	const TAG = '[createWfoDocument]';
	try {
		const fetchResponse = await fetch(`${CONSTANTS.workForceOneUrl}/api/v1.2/EmployeeVisits`, {
			method: 'POST',
			headers: {
				'Authorization': token
			},
			body: JSON.stringify({
				"employeeKey": wfoDocument.employeeKey,
				"consultantKey": wfoDocument.consultantKey,
				"notes": wfoDocument.submission.expand?.template?.name ? wfoDocument.submission.expand.template.name : 'No Template',
				"visitDate": wfoDocument.visitDate,
				"type": wfoDocument.type,
				"path": wfoDocument.documentFileName,
				"document": wfoDocument.document
			}),
		});

		if (fetchResponse.status !== 200) {
			const requestError = await fetchResponse.text();
			console.log(`${TAG} HTTP=${fetchResponse.status}; Error in createWfoDocument ${wfoDocument.submission.name} Error=${requestError}`);
			if(fetchResponse.status === 417) {
				throw fetchResponse;
			}
			throw new Error(`${TAG} HTTP=${fetchResponse.status}; Error in createWfoDocument ${wfoDocument.submission.name} Error=${requestError}`);
		}
		console.log(`${TAG} HTTP=200; createWfoDocument: ${wfoDocument.submission.name}`);
		return true;
	} catch (error) {
		console.log(`${TAG} HTTP=FAILED;`);
		console.log(error);
		throw error;
	}
}

/**
 * Represents a WorkForceOne document.
 * @typedef {Object} WfoDocument
 * @property {number} [id] - The document ID.
 * @property {Submission} submission - The submission.
 * @property {IntegrationData} tag - The integration data tag.
 * @property {string} templateName - The template name.
 * @property {number} employeeKey - The employee key.
 * @property {number} consultantKey - The consultant key.
 * @property {string} description - The description.
 * @property {string} visitDate - The visit date.
 * @property {string} path - The path.
 * @property {string} type - The type.
 * @property {string} document - The document.
 * @property {string} userEmail - The user email.
 * @property {string} documentFileName - The document file name.
 */

module.exports = {
    createWfoDocument
};