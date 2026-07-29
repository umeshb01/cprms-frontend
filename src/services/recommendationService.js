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
// In-memory data store (acts like a database table with soft deletion)
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
    isDeleted: false,
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
    isDeleted: false,
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
    group: 'Civil Engineering',
    subGroup: 'Building & Architecture',
    level: 'Gazetted Third Class',
    position: 'Sub-Engineer',
    recommendationDate: '2081-04-18',
    fiscalYear: '2080/081',
    commission: 'Public Service Commission',
    category: 'Inclusive — Adibasi/Janajati',
    remarks: 'Category verification confirmed by commission.',
    isDeleted: false,
  },
  {
    id: 4,
    recommendationNumber: 'REC-2081-004',
    candidateName: 'Anita Thapa Magar',
    permanentAddress: 'Butwal, Lumbini Province',
    fatherName: 'Karna Bahadur Thapa',
    motherName: 'Maya Thapa',
    grandfatherName: 'Bir Bahadur Thapa',
    gender: 'Female',
    service: 'Nepal Education Service',
    group: 'School Education',
    subGroup: 'Secondary',
    level: 'Gazetted Third Class',
    position: 'Secondary Level Teacher',
    recommendationDate: '2081-05-10',
    fiscalYear: '2080/081',
    commission: 'Public Service Commission',
    category: 'Open Competition',
    remarks: 'Posted to Western Regional Directorate.',
    isDeleted: false,
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
    isDeleted: false,
  },
]

// Auto-increment counter
let _nextId = _recommendations.length + 1

// ---------------------------------------------------------------------------
// Service functions
// ---------------------------------------------------------------------------

/**
 * Fetch all active recommendations (hides soft-deleted records).
 *
 * @returns {Promise<Array>} Resolves with non-deleted recommendation objects.
 */
export async function getRecommendations() {
  await delay(500)
  return _recommendations.filter((r) => !r.isDeleted)
}

/**
 * Fetch a single recommendation by its ID.
 *
 * @param {number|string} id
 * @returns {Promise<Object>} Resolves with the matching recommendation.
 * @throws Will throw an error if no record is found or if deleted.
 */
export async function getRecommendationById(id) {
  await delay(300)
  const record = _recommendations.find((r) => r.id === Number(id) && !r.isDeleted)
  if (!record) {
    throw new Error(`Recommendation with id "${id}" not found.`)
  }
  return { ...record }
}

/**
 * Create a new recommendation.
 *
 * @param {Object} data  Fields matching the recommendation schema (id is auto-generated).
 * @returns {Promise<Object>} Resolves with the newly created recommendation.
 */
export async function createRecommendation(data) {
  await delay(600)
  const newRecord = {
    ...data,
    id: _nextId++,
    isDeleted: false,
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
  const index = _recommendations.findIndex((r) => r.id === Number(id) && !r.isDeleted)
  if (index === -1) {
    throw new Error(`Recommendation with id "${id}" not found.`)
  }
  _recommendations[index] = { ..._recommendations[index], ...updates }
  return { ..._recommendations[index] }
}

/**
 * Soft-delete a recommendation by ID (marks isDeleted = true, keeps in database for audit).
 *
 * @param {number|string} id
 * @returns {Promise<{ success: boolean, id: number }>}
 * @throws Will throw an error if no record is found.
 */
export async function deleteRecommendation(id) {
  await delay(500)
  const index = _recommendations.findIndex((r) => r.id === Number(id))
  if (index !== -1) {
    _recommendations[index].isDeleted = true
    return { success: true, id: Number(id) }
  }
  throw new Error(`Recommendation with id "${id}" not found.`)
}

/**
 * Search recommendations by candidateName, service, and commission filters.
 *
 * @param {Object} filters
 * @returns {Promise<Array>}
 */
export async function searchRecommendations(filters = {}) {
  await delay(400)

  return _recommendations.filter((r) => {
    if (r.isDeleted) return false

    const matchesName =
      !filters.candidateName ||
      r.candidateName.toLowerCase().includes(filters.candidateName.toLowerCase())

    const matchesService =
      !filters.service ||
      r.service.toLowerCase().includes(filters.service.toLowerCase())

    const matchesCommission =
      !filters.commission || r.commission === filters.commission

    return matchesName && matchesService && matchesCommission
  })
}

/**
 * Generate aggregated report data grouped by a specific field (excluding deleted records).
 *
 * @param {string} reportType - 'commission' | 'service' | 'category' | 'gender'
 * @returns {Promise<Array<{ label: string, count: number }>>}
 */
export async function getReportData(reportType = 'commission') {
  await delay(400)

  const groupByMap = {
    commission: 'commission',
    service: 'service',
    category: 'category',
    gender: 'gender',
  }

  const groupByField = groupByMap[reportType] || 'commission'

  const counts = {}
  _recommendations.forEach((r) => {
    if (r.isDeleted) return
    const key = r[groupByField] || 'Unspecified'
    counts[key] = (counts[key] || 0) + 1
  })

  return Object.entries(counts).map(([label, count]) => ({ label, count }))
}

/**
 * Public search for citizens — filter by candidate name or recommendation number.
 *
 * @param {Object} filters - { name?: string, recNumber?: string }
 * @returns {Promise<Array>}
 */
export async function publicSearch(filters = {}) {
  await delay(400)

  return _recommendations.filter((r) => {
    if (r.isDeleted) return false

    const matchesName =
      !filters.name ||
      r.candidateName.toLowerCase().includes(filters.name.toLowerCase())

    const matchesRecNumber =
      !filters.recNumber ||
      r.recommendationNumber.toLowerCase().includes(filters.recNumber.toLowerCase())

    return matchesName && matchesRecNumber
  })
}
