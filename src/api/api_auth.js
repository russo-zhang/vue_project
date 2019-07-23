import axios from '@/utils/util_index.js'

export const getAuthList = ()=>{
  return axios({
    url:`rights/list`
  })
}

export const cancelAuth = (roleId,rightId)=>{
  return axios({
    url:`roles/${roleId}/rights/${rightId}`,
    method:"delete"
  })
}


