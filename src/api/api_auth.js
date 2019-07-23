import axios from '@/utils/util_index.js'

export const getAuthList = ()=>{
  return axios({
    url:`rights/list`
  })
}

