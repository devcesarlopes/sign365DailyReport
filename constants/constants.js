const CONSTANTS = {
	smtpToken: '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',
	smtpUrl: 'https://api.sendgrid.com/v3/mail/send',
	smtpSenderEmail: 'sam@sign365.com.au',
	pocketbaseWorkForceOneIntegrationId: '1y0ohllmmj4vk3e',
	pocketbaseAuthIdentity: 'sign365@services.com.au',
	pocketbaseAuthPassword: '@Test1234',
	pocketbaseUrl: 'https://api.sign365.com.au',
	workForceOneUrl: '',
	workForceOneFallbackEmail: '',
	workForceOneAuthUserName: '',
	workForceOneAuthPassword: '',
	acroformDayFieldName: 'sign365_dateDay_combobox_workforceConnect',
	acroformMonthFieldName: 'sign365_dateMonth_combobox_workforceConnect',
	acroformYearFieldName: 'sign365_dateYear_combobox_workforceConnect',
};

const LOGS = {
	fail: 'Fail',
	success: 'Success',
	notFoundRelationId: 'Make sure your WFO account is connected to your Sign365 account',
	notFoundEmployeeId: 'Tag not found',
}

module.exports = {
    CONSTANTS,
	LOGS
};
