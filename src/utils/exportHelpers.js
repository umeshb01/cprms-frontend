/**
 * Export an array of objects to a downloadable CSV file.
 *
 * @param {Array<Object>} data - Array of row objects to convert to CSV.
 * @param {string} filename - Output filename (e.g., 'commission-report.csv').
 */
export function exportToCSV(data, filename = 'report.csv') {
  if (!data || data.length === 0) return

  // Extract column headers from the keys of the first object
  const headers = Object.keys(data[0]).join(',')

  // Map each object's values to comma-separated strings (wrapping in quotes to handle commas within values)
  const rows = data.map((row) =>
    Object.values(row)
      .map((val) => `"${String(val).replace(/"/g, '""')}"`)
      .join(',')
  )

  const csvContent = [headers, ...rows].join('\n')

  // Create a Blob representing the raw CSV content
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  // Create an anchor element to trigger browser download
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()

  // Clean up
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
