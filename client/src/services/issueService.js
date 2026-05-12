import apiClient from '../api/apiClient'

export const issueService = {
  issueBook: async (data) => {
    const res = await apiClient.post('/issues/issue', data)
    return res.data
  },

  returnBook: async (issueId) => {
    const res = await apiClient.put(`/issues/return/${issueId}`)
    return res.data
  },
}
