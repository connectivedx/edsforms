/**
 * Get Full Name
 * @name getFullName Concats first name and last name
 * @param {string} firstname in Stringformat
 * @param {string} lastname in Stringformat
 * @return {string}
 */
function getFullName(firstname, lastname) {
  return `${firstname} ${lastname}`.trim();
}

/**
 * Custom submit function
 * @param {scope} globals
 */
function submitFormArrayToString(globals) {
  const data = globals.functions.exportData();
  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key])) {
      data[key] = data[key].join(',');
    }
  });
  globals.functions.submitForm(data, true, 'application/json');
}

/**
 * Calculate the number of days between two dates.
 * @param {*} endDate
 * @param {*} startDate
 * @returns {number} returns the number of days between two dates
 */
function days(endDate, startDate) {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;

  // return zero if dates are valid
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return 0;
  }

  const diffInMs = Math.abs(end.getTime() - start.getTime());
  return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
}

/**
 * @name fetchProviderValues
 * @param {string} apiUrl - REST endpoint URL
 * @param {scope} globals - (auto-injected, but not used here)
 * @returns {string[]} - Array of option values
 */
function fetchProviderValues(apiUrl, globals) {
  // Note: This is synchronous placeholder;
  // use a synchronous hardcoded or previously fetched list
  return ["Mercy Health Kings Mills", "Lindner Center of Hope", "Assurance Health"];
}

/**
 * @name fetchProviderLabels
 * @param {string} apiUrl - REST endpoint URL
 * @param {scope} globals - (auto-injected, but not used here)
 * @returns {string[]} - Array of option display names
 */
function fetchProviderLabels(apiUrl, globals) {
  // Same as values here – just labels
  return ["Mercy Health Kings Mills", "Lindner Center of Hope", "Assurance Health"];
}

// eslint-disable-next-line import/prefer-default-export
export { getFullName, days, submitFormArrayToString, fetchProviderValues, fetchProviderLabels };
