import { COMMISSIONS } from '../utils/constants'

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms))

let fakeUsers = [
  {
    id: 1,
    name: 'Ram Bahadur',
    email: 'admin@psc.gov.np',
    role: 'SUPER_ADMIN',
    office: COMMISSIONS[0] || 'Public Service Commission',
    status: 'active',
  },
  {
    id: 2,
    name: 'Sita Sharma',
    email: 'bagmati@psc.gov.np',
    role: 'OFFICE_ADMIN',
    office: COMMISSIONS[3] || 'Nepal Police Service Commission',
    status: 'active',
  },
]

/**
 * Fetch all users.
 *
 * @returns {Promise<Array>}
 */
export async function getUsers() {
  await delay(400)
  return [...fakeUsers]
}

/**
 * Create a new user.
 *
 * @param {Object} data - { name, email, role, office }
 * @returns {Promise<Object>}
 */
export async function createUser(data) {
  await delay(400)
  const newUser = {
    id: Date.now(),
    status: 'active',
    ...data,
  }
  fakeUsers.push(newUser)
  return { ...newUser }
}

/**
 * Delete a user by ID.
 *
 * @param {number|string} id
 * @returns {Promise<{ success: boolean, id: number }>}
 */
export async function deleteUser(id) {
  await delay(400)
  const index = fakeUsers.findIndex((u) => u.id === Number(id))
  if (index !== -1) {
    fakeUsers.splice(index, 1)
    return { success: true, id: Number(id) }
  }
  throw new Error(`User with id "${id}" not found.`)
}
