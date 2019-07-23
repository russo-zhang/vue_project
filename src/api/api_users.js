import axios from '@/utils/util_index.js'

export const login = (data) => {
  return axios({
    url: 'login',
    method: 'post',
    data
  })
}

export const getUsersData = (data) => {
  // var token = localStorage.getItem("vue_project_token_user_key")
  return axios({
    url: 'users',
    params: { ...data }
    // headers: { "Authorization": token } 单个添加请求头
  })
}

export const addUser = (data)=>{
  return axios({
    url:"users",
    method:"post",
    data
  }) 
}

export const editUser = (data)=>{
  return axios({
    url:`users/${data.id}`,
    method:"put",
    data
  }) 
}

export const delUserById = (id)=>{
  return axios({
    url:`users/${id}`,
    method:"delete",
  }) 
}

export const userState = (data)=>{
  return axios({
    url:`users/${data.uId}/state/${data.type}`,
    method:"put",
  }) 
}










