/**
 * recommendationService.js
 *
 * Mock service layer for Recommendation data.
 * All functions return Promises that resolve after a simulated network delay.
 *
 * When the real backend is ready, replace only the internals of each function
 * (swap the mock delay + in-memory data for actual fetch/axios calls).
 * The function signatures, names, and return shapes stay exactly the same.
 */

// ---------------------------------------------------------------------------
// Simulated network delay helper
// ---------------------------------------------------------------------------
const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms))

// ---------------------------------------------------------------------------
// In-memory data store (acts like a database table)
// ---------------------------------------------------------------------------
let _recommendations = [
  {
    id: 1,
    recommendationNumber: 'REC-2081-001',
    candidateName: 'Ram Prasad Sharma',
    permanentAddress: 'Kathmandu, Bagmati Province',
    fatherName: 'Hari Prasad Sharma',
    motherName: 'Sita Devi Sharma',
    grandfatherName: 'Govinda Prasad Sharma',
    gender: 'Male',
    service: 'Nepal Administrative Service',
    group: 'Administration',
    subGroup: 'General Administration',
    level: 'Gazetted Second Class',
    position: 'Under Secretary',
    recommendationDate: '2081-03-15',
    fiscalYear: '2080/081',
    commission: 'Public Service Commission',
    category: 'Open Competition',
    remarks: 'Recommended after written and interview process.',
  },
  {
    id: 2,
    recommendationNumber: 'REC-2081-002',
    candidateName: 'Sunita Adhikari',
    permanentAddress: 'Pokhara, Gandaki Province',
    fatherName: 'Bishnu Adhikari',
    motherName: 'Kamala Adhikari',
    grandfatherName: 'Tekraj Adhikari',
    gender: 'Female',
    service: 'Nepal Health Service',
    group: 'Medical',
    subGroup: 'General Practice',
    level: 'Non-Gazetted First Class',
    position: 'Medical Officer',
    recommendationDate: '2081-04-02',
    fiscalYear: '2080/081',
    commission: 'Public Service Commission',
    category: 'Women Quota',
    remarks: 'Selected under women inclusive category.',
  },
  {
    id: 3,
    recommendationNumber: 'REC-2081-003',
    candidateName: 'Bikash Tamang',
    permanentAddress: 'Sindhupalchok, Bagmati Province',
    fatherName: 'Dhan Bahadur Tamang',
    motherName: 'Phul Maya Tamang',
    grandfatherName: 'Bal Bahadur Tamang',
    gender: 'Male',
    service: 'Nepal Engineering Service',
    group: 'Civil',
    subGroup: 'Irrigation',
    level: 'Non-Gazetted Second Class',
    position: 'Sub-Engineer',
    recommendationDate: '2081-04-20',
    fiscalYear: '2080/081',
    commission: 'Public Service Commission',
    category: 'Inclusive — Adibasi/Janajati',
    remarks: 'Qualified through technical examination.',
  },
  {
    id: 4,
    recommendationNumber: 'REC-2081-004',
    candidateName: 'Anita Thapa Magar',
    permanentAddress: 'Rupandehi, Lumbini Province',
    fatherName: 'Khadga Bahadur Thapa',
    motherName: 'Rupa Thapa',
    grandfatherName: 'Indra Bahadur Thapa',
    gender: 'Female',
    service: 'Nepal Education Service',
    group: 'Teaching',
    subGroup: 'Secondary Education',
    level: 'Non-Gazetted First Class',
    position: 'Secondary Level Teacher',
    recommendationDate: '2081-05-10',
    fiscalYear: '2080/081',
    commission: 'Public Service Commission',
    category: 'Open Competition',
    remarks: '',
  },
  {
    id: 5,
    recommendationNumber: 'REC-2081-005',
    candidateName: 'Narayan Bhandari',
    permanentAddress: 'Surkhet, Karnali Province',
    fatherName: 'Prem Bhandari',
    motherName: 'Laxmi Bhandari',
    grandfatherName: 'Tika Ram Bhandari',
    gender: 'Male',
    service: 'Nepal Judicial Service',
    group: 'Legal',
    subGroup: '',
    level: 'Gazetted Third Class',
    position: 'Section Officer (Legal)',
    recommendationDate: '2081-05-25',
    fiscalYear: '2080/081',
    commission: 'Judicial Service Commission',
    category: 'Open Competition',
    remarks: 'Pending document verification.',
  },
]

// Auto-increment counter
let _nextId = _recommendations.length + 1

// ---------------------------------------------------------------------------
// Service functions
// ---------------------------------------------------------------------------

/**
 * Fetch all recommendations.
 *
 * @returns {Promise<Array>} Resolves with an array of recommendation objects.
 */
export async function getRecommendations() {
  await delay(500)
  // Return a shallow copy so external mutations don't affect the store
  return [..._recommendations]
}

/**
 * Fetch a single recommendation by its ID.
 *
 * @param {number|string} id
 * @returns {Promise<Object>} Resolves with the matching recommendation.
 * @throws Will throw an error if no record is found.
 */
export async function getRecommendationById(id) {
  await delay(300)
  const record = _recommendations.find((r) => r.id === Number(id))
  if (!record) {
    throw new Error(`Recommendation with id "${id}" not found.`)
  }
  return { ...record }
}

/**
 * Create a new recommendation.
 *
 * @param {Object} data  Fields matching the recommendation schema (id is auto-generated).
 * @returns {Promise<Object>} Resolves with the newly created recommendation (including generated id).
 */
export async function createRecommendation(data) {
  await delay(600)
  const newRecord = {
    ...data,
    id: _nextId++,
  }
  _recommendations.push(newRecord)
  return { ...newRecord }
}

/**
 * Update an existing recommendation by ID.
 *
 * @param {number|string} id
 * @param {Object} updates  Partial fields to update.
 * @returns {Promise<Object>} Resolves with the updated recommendation.
 * @throws Will throw an error if no record is found.
 */
export async function updateRecommendation(id, updates) {
  await delay(500)
  const index = _recommendations.findIndex((r) => r.id === Number(id))
  if (index === -1) {
    throw new Error(`Recommendation with id "${id}" not found.`)
  }
  _recommendations[index] = { ..._recommendations[index], ...updates }
  return { ..._recommendations[index] }
}

/**
 * Delete a recommendation by ID.
 *
 * @param {number|string} id
 * @returns {Promise<{ success: boolean, id: number }>}
 * @throws Will throw an error if no record is found.
 */
export async function deleteRecommendation(id) {
  await delay(400)
  const index = _recommendations.findIndex((r) => r.id === Number(id))
  if (index === -1) {
    throw new Error(`Recommendation with id "${id}" not found.`)
  }
  _recommendations.splice(index, 1)
  return { success: true, id: Number(id) }
}
