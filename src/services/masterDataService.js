/**
 * masterDataService.js
 *
 * Mock service layer for Master Data Management (Commissions, Services, Categories).
 */

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms))

let masterData = {
  commissions: ['Central PSC', 'Bagmati Province PSC', 'Koshi Province PSC'],
  services: ['Administration', 'Health', 'Education'],
  categories: ['Open', 'Inclusive'],
}

/**
 * Fetch master data array for a given type.
 *
 * @param {string} type - 'commissions' | 'services' | 'categories'
 * @returns {Promise<Array<string>>}
 */
export async function getMasterData(type) {
  await delay(300)
  if (!masterData[type]) {
    throw new Error(`Invalid master data type: "${type}"`)
  }
  return [...masterData[type]]
}

/**
 * Add a new item to the specified master data type.
 *
 * @param {string} type - 'commissions' | 'services' | 'categories'
 * @param {string} value - New item text
 * @returns {Promise<Array<string>>}
 */
export async function addMasterDataItem(type, value) {
  await delay(300)
  if (!masterData[type]) {
    throw new Error(`Invalid master data type: "${type}"`)
  }

  const trimmed = value.trim()
  if (!trimmed) {
    throw new Error('Item value cannot be empty.')
  }

  if (!masterData[type].includes(trimmed)) {
    masterData[type].push(trimmed)
  }

  return [...masterData[type]]
}

/**
 * Delete an item from the specified master data type.
 *
 * @param {string} type - 'commissions' | 'services' | 'categories'
 * @param {string} value - Item text to remove
 * @returns {Promise<Array<string>>}
 */
export async function deleteMasterDataItem(type, value) {
  await delay(300)
  if (!masterData[type]) {
    throw new Error(`Invalid master data type: "${type}"`)
  }

  masterData[type] = masterData[type].filter((item) => item !== value)
  return [...masterData[type]]
}
