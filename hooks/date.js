/**
 * Retrieves boolean if is Valid Date Format.
 * @param {any} dateString - Date or string.
 * @returns {boolean} - true if is valid date.
 */
function isValidDateFormat(dateString) {
    // Regular expression to match the YYYY-MM-DD format
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    // Check if the string matches the format
    if (!regex.test(dateString)) {
        return false;
    }

    // Parse the date to check if it's a valid date
    const date = new Date(dateString);
    const isValidDate = dateString === date.toISOString().split('T')[0];

    return isValidDate;
}

/**
 * Retrieves boolean if is Valid Date Format.
 * @param {any} date - Date or string.
 * @returns {string} - date in valid format 'YYYY-MM-DD'.
 * @throws {Error} - If the request fails
 */
function formatDate(date) {
	if(date instanceof Date) {
		let year = date.getFullYear();
		let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
		let day = String(date.getDate()).padStart(2, '0');

		return `${year}-${month}-${day}`;
	} else if (typeof date === 'string') {
		if (!isValidDateFormat(date)){
			throw new Error('DATE IS IN INVALID FORMAT');
		}
		return date;
	} else {
        throw new Error('DATE IS IN INVALID FORMAT');
    }
}

/**
 * Retrieves Extended time from Date.getTime() in number.
 * @param {ms} number - Date or string.
 * @returns {string} - date in extended format.
 */
function convertMilliseconds(ms) {
    let hours = Math.floor(ms / (1000 * 60 * 60));
    let minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((ms % (1000 * 60)) / 1000);
    let milliseconds = ms % 1000;

    let result = [];

    if (hours > 0) result.push(`${hours} hours`);
    if (minutes > 0) result.push(`${minutes} minutes`);
    if (seconds > 0) result.push(`${seconds} seconds`);
    if (milliseconds > 0) result.push(`${milliseconds} milliseconds`);

    return result.length > 0 ? result.join(' ') : '0 milliseconds';
}

module.exports = {
    formatDate,
    convertMilliseconds
};
