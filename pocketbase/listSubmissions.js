const { CONSTANTS } = require("../constants/constants");

/**
 * Retrieves submissions.
 * @param {string} token - Authorization token.
 * @param {Date} date - Created date of Submissions format 2021-12-23.
 * @returns {Promise<Submission[]>} - Promise resolving to the Submission List.
 * @throws {Error} - If the request fails or response status is not 200.
 */
async function listPocketbaseSubmissions(token, date) {
	const TAG = '[listPocketbaseSubmissions]: '
	let page = 1;
	let totalPages = 1;

	/** @type {Submission[]} */
	const submissions = [];
	try {
		while (page <= totalPages) {
			const fetchResponse = await fetch(`${CONSTANTS.pocketbaseUrl}/api/collections/submission/records?expand=template,integrationDataSync&page=${page}&perPage=500&filter=(created>='${date}')`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (fetchResponse.status !== 200) {
				throw new Error('Could not listPocketbaseSubmissions');
			}

			/** @type {SubmissionResponse} */
			const submissionsFromPage = await fetchResponse.json();
			totalPages = submissionsFromPage.totalPages;
			submissions.push(...submissionsFromPage.items);
			page++;
			console.log(`${TAG} created>='${date}' HTTP=200; Submissions Length: ${submissions.length};`);
		}
		return submissions;
	} catch (error) {
		console.log(TAG, error);
		throw error;
	}
}

/**
 * Represents a submission response.
 * @typedef {Object} SubmissionResponse
 * @property {number} page - Page number.
 * @property {number} perPage - Items per page.
 * @property {number} totalItems - Total number of items.
 * @property {number} totalPages - Total number of pages.
 * @property {Submission[]} items - Array of submissions.
 */

/**
 * Represents a submission.
 * @typedef {Object} Submission
 * @property {string} id - Submission ID.
 * @property {string} created - Creation timestamp.
 * @property {string} updated - Last update timestamp.
 * @property {string} user - User.
 * @property {string} organisation - Organisation.
 * @property {string} name - Name.
 * @property {string} submissionDateTime - Submission date and time.
 * @property {string} template - Template.
 * @property {number} redoneCount - Redone count.
 * @property {string} file - File.
 * @property {IntegrationData[]} tags - Tags.
 * @property {number} consumeCount - Consume count.
 * @property {string} localId - Local ID.
 * @property {string} parent - Parent.
 * @property {string} uid - UID.
 * @property {Object} [expand] - Expand object.
 * @property {Object} [expand.template] - Template object.
 * @property {string} [expand.template.id] - Template ID.
 * @property {string} [expand.template.name] - Template name.
 * @property {IntegrationDataSync[]} [expand.integrationDataSync] - Integration data sync array.
 */

module.exports = {
    listPocketbaseSubmissions
};
