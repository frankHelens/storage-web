/* globals localStorage */

import { fetch } from './api'
import { encrypt } from './common'

export function login (username, password, callback) {
  fetch({
    method: 'post',
    url: 'login',
    data: {
      loginPassword: encrypt(password),
      loginName: username
    }
  }).then(function (data) {
    if (data) {
      localStorage.token = data.token
      callback()
    }
  })
}
export function setCurrentPage (page) {
  localStorage.currentPage = page
}
export function getCurrentPage (page) {
  return localStorage.currentPage
}
export function getToken () {
  return localStorage.token
}
export function getRealname () {
  return localStorage.realname
}
export function logout (callback) {
  delete localStorage.token
  if (callback) callback()
}
export function loggedIn () {
  return !!localStorage.token
}
export function getActions () {
  return localStorage.actions.split(',')
}

export function checkActions (action) {
  const actions = getActions()
  return actions.indexOf(action) >= 0
}

