import apiClient from '../api/apiClient'

export const memberService = {
  registerMember: async (data) => {
    const res = await apiClient.post('/members', data)
    return res.data
  },

  getMemberById: async (memberId) => {
    const res = await apiClient.get(`/members/${memberId}`)
    return res.data
  },

  getBooksIssuedToMember: async (memberId) => {
    const res = await apiClient.get(`/members/${memberId}/books`)
    return res.data
  },
}
