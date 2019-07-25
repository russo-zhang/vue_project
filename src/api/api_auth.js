import axios from '@/utils/util_index.js'

export const getAuthList = ()=>{
  return axios({
    url:`rights/list`
  })
}

export const getAuthTree = ()=>{
  return axios({
    url:`rights/tree`
  })
}

export const cancelAuth = (roleId,rightId)=>{
  return axios({
    url:`roles/${roleId}/rights/${rightId}`,
    method:"delete"
  })
}

export const grantAuth = (roleId,rids)=>{
  return axios({
    url:`roles/${roleId}/rights`,
    method:"post",
    data:{rids}
  })
}

export const getLeftMenus = ()=>{
  return axios({
    url:`menus`,
  })
}



