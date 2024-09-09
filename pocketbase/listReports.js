const { CONSTANTS } = require("../constants/constants");

/**
 * Retrieves submissions.
 * @param {string} token - Authorization token.
 * @param {Date} date - Created date of Reports format 2021-12-23.
 * @returns {Promise<Report[]>} - Promise resolving to the Submission List.
 * @throws {Error} - If the request fails or response status is not 200.
 */
async function listPocketbaseReports(token, date) {
	const TAG = '[listPocketbaseReports]: '
	let page = 1;
	let totalPages = 1;

	/** @type {Report[]} */
	const reports = [];
	try {
		while (page <= totalPages) {
			const fetchResponse = await fetch(`${CONSTANTS.pocketbaseUrl}/api/collections/submissionDailyReport/records?page=${page}&perPage=500&filter=(created>='${date}')`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (fetchResponse.status !== 200) {
				throw new Error('Could not listPocketbaseReports');
			}

			/** @type {ReportResponse} */
			const submissionsFromPage = await fetchResponse.json();
			totalPages = submissionsFromPage.totalPages;
			reports.push(...submissionsFromPage.items);
			page++;
			console.log(`${TAG} created>='${date}' HTTP=200; Submissions Length: ${reports.length};`);
		}
		return reports;
	} catch (error) {
		console.log(TAG, error);
		throw error;
	}
}

/**
 * Represents a report response.
 * @typedef {Object} ReportResponse
 * @property {number} page - Page number.
 * @property {number} perPage - Items per page.
 * @property {number} totalItems - Total number of items.
 * @property {number} totalPages - Total number of pages.
 * @property {Report[]} items - Array of reports.
 */

/**
 * Represents a Report.
 * @typedef {Object} Report
 * @property {string} id - report ID.
 * @property {string} created - Creation timestamp.
 * @property {string} updated - Last update timestamp.
 * @property {string} report - report.
 */

module.exports = {
    listPocketbaseReports
};
