const { listPocketbaseSubmissions } = require('./listSubmissions');
const { listPocketbaseReports } = require('./listReports');
const { formatDate } = require('../hooks/date');

/**
 * Retrieves Daily Submission Report.
 * @returns {Promise<string>} - Promise resolving to the Daily Submission Report.
 * @throws {Error} - If the request fails or response status is not 200.
 */
async function dailySubmissionReport(pocketbaseToken, date) {
	const TAG = '[dailySubmissionReport]';

	try {
		date = formatDate(date);
		const pocketbaseReports = await listPocketbaseReports(
			pocketbaseToken,
			date
		  );
		if (pocketbaseReports.length > 0) {
			throw new Error('Reports already Exist for this date.');
		}
		const pocketbaseSubmissions = await listPocketbaseSubmissions(
		  pocketbaseToken,
		  date
		);

		let report = `
DAILY SUBMISSION REPORT BOT
Date: ${formatDate(new Date())}

Total submissions in filter created>='${formatDate(date)}': ${pocketbaseSubmissions.length} Submissions Found
`;
		for (let i = 0; i < pocketbaseSubmissions.length; i++) {
		report += `
Submission ID: ${pocketbaseSubmissions[i].id}
Submission Name: ${pocketbaseSubmissions[i].name}
Created: ${pocketbaseSubmissions[i].created}
SubmissionDateTime: ${pocketbaseSubmissions[i].submissionDateTime}
Tags: [
	${pocketbaseSubmissions[i].tags.map(t => `{${t.integrationDataKey}, ${t.integrationDataValue}, Submitted to WFO: ${pocketbaseSubmissions[i].expand.integrationDataSync.find(ids => ids.integrationDataKey === t.integrationDataKey) ? pocketbaseSubmissions[i].expand.integrationDataSync.find(ids => ids.integrationDataKey === t.integrationDataKey)?.message : 'NOT SENT TO SUBMISSION'}}\n`)}
]
`
		}
		return report;
	} catch (error) {
		console.log(TAG, error);
		throw error;
	}
}

module.exports = {
    dailySubmissionReport
};