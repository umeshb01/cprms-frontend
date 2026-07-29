import { useState } from 'react'

/**
 * Custom React hook for client-side array pagination.
 *
 * @param {Array} items - Full list of items to paginate.
 * @param {number} pageSize - Number of items per page (default: 5).
 * @returns {{ paginatedItems: Array, currentPage: number, setCurrentPage: Function, totalPages: number }}
 */
export function usePagination(items = [], pageSize = 5) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
  const startIndex = (currentPage - 1) * pageSize
  const paginatedItems = items.slice(startIndex, startIndex + pageSize)

  return { paginatedItems, currentPage, setCurrentPage, totalPages }
}
