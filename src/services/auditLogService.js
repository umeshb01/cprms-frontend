/**
 * auditLogService.js
 *
 * Mock service layer for Audit Log entries (SRD §8).
 * Read-only security event audit trail.
 */

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms))

const _auditLogs = [
  {
    id: 1,
    user: 'admin@cprms.gov.np',
    office: 'Public Service Commission',
    date: '2081-05-28',
    time: '10:14:22',
    ipAddress: '10.0.4.15',
    activity: 'Login',
  },
  {
    id: 2,
    user: 'officer.sharma@cprms.gov.np',
    office: 'Bagmati Province PSC',
    date: '2081-05-28',
    time: '10:32:05',
    ipAddress: '10.0.4.88',
    activity: 'Record Created',
  },
  {
    id: 3,
    user: 'officer.sharma@cprms.gov.np',
    office: 'Bagmati Province PSC',
    date: '2081-05-28',
    time: '11:05:40',
    ipAddress: '10.0.4.88',
    activity: 'Document Uploaded',
  },
  {
    id: 4,
    user: 'admin@cprms.gov.np',
    office: 'Public Service Commission',
    date: '2081-05-28',
    time: '11:45:12',
    ipAddress: '10.0.4.15',
    activity: 'Record Updated',
  },
  {
    id: 5,
    user: 'auditor.gurung@cprms.gov.np',
    office: 'Koshi Province PSC',
    date: '2081-05-28',
    time: '12:10:00',
    ipAddress: '10.0.8.21',
    activity: 'Login',
  },
  {
    id: 6,
    user: 'officer.thapa@cprms.gov.np',
    office: 'Gandaki Province PSC',
    date: '2081-05-28',
    time: '14:22:19',
    ipAddress: '10.0.6.42',
    activity: 'Record Deleted',
  },
  {
    id: 7,
    user: 'admin@cprms.gov.np',
    office: 'Public Service Commission',
    date: '2081-05-28',
    time: '15:50:33',
    ipAddress: '10.0.4.15',
    activity: 'Record Updated',
  },
  {
    id: 8,
    user: 'officer.thapa@cprms.gov.np',
    office: 'Gandaki Province PSC',
    date: '2081-05-28',
    time: '16:40:11',
    ipAddress: '10.0.6.42',
    activity: 'Document Uploaded',
  },
]

/**
 * Fetch read-only audit log entries with optional activity filtering.
 *
 * @param {Object} filters - { activity?: string }
 * @returns {Promise<Array>}
 */
export async function getAuditLogs(filters = {}) {
  await delay(400)

  return _auditLogs.filter((log) => {
    if (!filters.activity) return true
    return log.activity === filters.activity
  })
}
