const { CONSTANTS } = require("../constants/constants");

/**
 * Retrieves integration by its ID.
 * @param {string} token - Authorization token.
 * @param {string} report - Authorization token.
 * @returns {Promise<string>} - Promise resolving to the Integration object.
 * @throws {Error} - If the request fails or response status is not 200.
 */
async function createDailyReport(token, report) {
	const TAG = '[createDailyReport]';

	const fetchResponse = await fetch(`${CONSTANTS.pocketbaseUrl}/api/collections/submissionDailyReport/records`, {
		method: 'POST',
		headers: new Headers({
			'content-type': 'application/json', 
			'Authorization': `Bearer ${token}`
		}),
		body: JSON.stringify({
			report: report,
		}),
	});

	if (fetchResponse.status !== 200) {
		const requestError = await fetchResponse.json();
		console.log(`${TAG} HTTP=${fetchResponse.status}; Error in createDailyReport Error=${requestError.message}`);
		return '';
	}
	const submissionDailyReport = await fetchResponse.json();
	console.log(`${TAG} HTTP=200; createDailyReport: ${submissionDailyReport.id}; Content: ${report}`);
	return submissionDailyReport.id;
}

module.exports = {
    createDailyReport
};