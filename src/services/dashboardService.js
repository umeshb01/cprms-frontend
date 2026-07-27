/**
 * dashboardService.js
 *
 * Mock service layer for Dashboard stats and analytics.
 */

export async function getDashboardStats() {
  await new Promise((r) => setTimeout(r, 400))
  return {
    totalRecommendations: 128,
    todaysEntries: 4,
    pendingRecords: 12,
  }
}

export async function getYearlyTrend() {
  await new Promise((r) => setTimeout(r, 400))
  return [
    { year: '2080', count: 20 },
    { year: '2081', count: 35 },
    { year: '2082', count: 50 },
    { year: '2083', count: 23 },
  ]
}

export async function getProvinceDistribution() {
  await new Promise((r) => setTimeout(r, 400))
  return [
    { province: 'Koshi', count: 15 },
    { province: 'Madhesh', count: 12 },
    { province: 'Bagmati', count: 40 },
    { province: 'Gandaki', count: 18 },
    { province: 'Lumbini', count: 22 },
    { province: 'Karnali', count: 8 },
    { province: 'Sudurpashchim', count: 13 },
  ]
}
