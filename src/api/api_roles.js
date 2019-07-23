import axios from '@/utils/util_index.js'

export const getAllRoles = ()=>{
  return axios({
    url:`roles`,
    method:"get",
  })
}

export const divideRole = (data)=>{
  return axios({
    url:`users/${data.id}/role`,
    method:"put",
    data
  })
}