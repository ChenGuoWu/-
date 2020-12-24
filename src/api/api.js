import axios from '@/config/httpConfig'

export function getlist(params) {
    return axios.get( '/api/list', params)
}
export function changelist(params) {
    return axios.post( '/api/list', params)
}
export function editList(params) {
    return axios.post( '/api/edit', params)
}
export function saveList(params) {
    return axios.put( '/api/save', params)
}
export function deleteList(params) {
    return axios.post( '/api/del', params)
}
export function dirList(params) {
    return axios.post( '/api/dir', params)
}
