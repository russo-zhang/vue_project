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

export const addRole = (data)=>{
  return axios({
    url:`roles`,
    method:"post",
    data
  })
}

export const delRole = (id)=>{
  return axios({
    url:`roles/${id}`,
    method:"delete",
  })
}