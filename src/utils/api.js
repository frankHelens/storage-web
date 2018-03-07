// this is aliased in webpack config based on server/client build

/* globals localStorage */

import axios from 'axios'
import moment from 'moment'
import md5 from 'md5'
import { Message } from 'element-ui'
import { URL, API } from './common'
import router from '@/router'

axios.defaults.baseURL = URL + API
axios.defaults.headers.common['Gddx-Access-AppId'] = 'web'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.delete['Content-Type'] = 'application/json'

function signFormat (props) {
  return md5(Object.keys(props).map(el => (el + '=' + props[el]).toLowerCase()).sort().join('&') + localStorage.token)
}

export function httpHeader (props, timeStamp) {
  let sign = {
    'Gddx-Access-Token': localStorage.token,
    'Gddx-Access-Version': '0.1.0'
  }
  return {
    ...props.headers,
    'Gddx-Access-Sign': signFormat({
      ...sign,
      ...props.params,
      ...props.data,
      'Gddx-Access-TimeStamp': timeStamp
    }),
    'Gddx-Access-TimeStamp': timeStamp,
    'Gddx-Access-Token': sign['Gddx-Access-Token'],
    'Gddx-Access-Version': sign['Gddx-Access-Version']
  }
}

export function fetch (props) {
  const timeStamp = moment().format('x')
  return axios({
    ...props,
    headers: httpHeader(props, timeStamp),
    params: {
      ...props.params,
      timeStamp: timeStamp
    }
  }).then(function (response) {
    if (response) {
      if (response.data.code === 0) {
        return response.data.data || response.data
      } else {
        throw Object({
          response: {
            status: response.data.code,
            statusText: response.data.message
          }
        })
      }
    }
  }).catch((error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      router.push('/login')
    }
    Message({
      type: 'error',
      showClose: true,
      message: error.response.status + ':' + error.response.statusText
    })
    return false
  })
}

export function fetchList (props) {
  return fetch({
    method: 'get',
    url: props.resource,
    params: {
      orderBy: props.orderBy,
      filterBy: props.filterBy,
      pageSize: props.pageSize,
      pageIndex: props.pageIndex
    }
  })
}

export function fetchItem (props) {
  return fetch({
    method: 'get',
    url: props.resource + '/' + props.id
  })
}

export function fetchCreate (props) {
  return fetch({
    method: 'post',
    url: props.resource,
    data: props.data
  })
}

export function fetchUpdate (props) {
  return fetch({
    method: 'put',
    url: props.resource + '/' + props.id,
    data: props.data
  })
}

export function fetchDelete (props) {
  return fetch({
    method: 'delete',
    url: props.resource + '/' + props.id,
    data: {}
  })
}

export function fetchBatchDelete (props) {
  return fetch({
    method: 'delete',
    url: props.resource,
    data: props.ids
  })
}

const httpGet = ({ url, params }) => {
  return fetch({
    method: 'get',
    url,
    params
  })
}

const httpPost = ({ url, data }) => {
  return fetch({
    method: 'post',
    url,
    data
  })
}

const httpPut = ({ url, data }) => {
  return fetch({
    method: 'put',
    url,
    data
  })
}

const httpPatch = ({ url, data }) => {
  return fetch({
    method: 'patch',
    url,
    data
  })
}

const httpDelete = ({ url }) => {
  return fetch({
    method: 'delete',
    url
  })
}

const httpBatchDelete = ({ url, data }) => {
  return fetch({
    method: 'delete',
    url: url,
    data: data
  })
}

const getRelation = ({ relations }) => {
  return fetch({
    method: 'get',
    url: '/relation',
    params: { relationList: relations }
  })
}

const api = {
  install (Vue, options) {
    Vue.prototype.$fetch = fetch
    Vue.prototype.$get = httpGet
    Vue.prototype.$post = httpPost
    Vue.prototype.$patch = httpPatch
    Vue.prototype.$put = httpPut
    Vue.prototype.$delete = httpDelete
    Vue.prototype.$batchDelete = httpBatchDelete
    Vue.prototype.$getRelation = getRelation
  }
}

export default api
