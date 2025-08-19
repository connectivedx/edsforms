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
      data[key] = data[key].join(",");
    }
  });
  globals.functions.submitForm(data, true, "application/json");
}

/**
 * Calculate the number of days between two dates.
 * @param {*} endDate
 * @param {*} startDate
 * @returns {number} returns the number of days between two dates
 */
function days(endDate, startDate) {
  const start = typeof startDate === "string" ? new Date(startDate) : startDate;
  const end = typeof endDate === "string" ? new Date(endDate) : endDate;

  // return zero if dates are valid
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return 0;
  }

  const diffInMs = Math.abs(end.getTime() - start.getTime());
  return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
}

// Global cache so functions can stay synchronous
let providerCache = {
  values: [],
  labels: [],
  loaded: false,
};

// 🔹 Preload API data
export async function preloadProviders() {
  try {
    let apiUrl =
      "https://apim.workato.com/venuv0/eds-forms-endpoints-v1/getProviders";
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "api-token":
          "72e9157ec3edb8b64bbe109917633d5c32348386bc443900cc4a7dcf074069d1",
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const responseJSON = await response.json();
    const providers = responseJSON.providers || [];

    // Map providers → dropdown format
    providerCache.values = providers.map((p, i) => p.id || i.toString());
    providerCache.labels = providers.map((p) => p.name || "Unknown");
    providerCache.loaded = true;
  } catch (err) {
    console.error("❌ Error loading providers:", err);
  }
}

/**
 * @name fetchProviderValues
 * @returns {string[]} - Array of option values
 */
function fetchProviderValues() {
  return providerCache.loaded ? providerCache.values : [];
}

/**
 * @name fetchProviderLabels
 * @returns {string[]} - Array of option labels
 */
function fetchProviderLabels() {
  return providerCache.loaded ? providerCache.labels : [];
}

// eslint-disable-next-line import/prefer-default-export
export {
  getFullName,
  days,
  submitFormArrayToString,
  fetchProviderValues,
  fetchProviderLabels,
};
