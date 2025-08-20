import { providersSample } from "./providers-sample.js";

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

/**
 * Load provider API data and build dropdown options
 * @param {*} block The form element where the dropdown is located
 */
export async function loadProviders(block) {
  let providers;
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

    // load provider data from API
    providers = await response.json().Providers;

    // // Map providers → dropdown format
    // providerCache.values = providers.map(
    //   (p, i) => p.group_number || i.toString()
    // );
    // providerCache.labels = providers.map((p) => p.provider_name || "Unknown");
    // providerCache.loaded = true;

    // build dropdown options
    // if (providers) {
    //   providers.map((provider) => {
    //     const option = document.createElement("option");
    //     option.value = provider.group_number;
    //     option.textContent = provider.provider_name;
    //     providerSelect.appendChild(option);
    //   });
  } catch (err) {
    console.error("❌ Error loading providers:", err);
    // load sample providers data
    providers = JSON.parse(providersSample).Providers;
  }

  // build dropdown options
  if (providers) {
    const providerSelect = block.querySelector("#dropdown-7e7d4adec2");
    providerSelect.innerHTML = "";

    // add default option
    const defaultOption = document.createElement("option");
    defaultOption.disabled = true;
    defaultOption.value = "";
    defaultOption.selected = true;
    defaultOption.textContent = "Search";
    providerSelect.appendChild(defaultOption);

    // add all options from data source
    providers.map((provider) => {
      const option = document.createElement("option");
      option.value = provider.group_number;
      option.textContent = provider.provider_name;
      providerSelect.appendChild(option);
    });
  } else {
    console.log("error building options");
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
