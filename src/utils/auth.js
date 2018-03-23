/* globals localStorage */

import { fetch } from './api'
import { encrypt } from './common'
import menus from './menu'

export function login (username, password, callback) {
  fetch({
    method: 'put',
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

export const pathFormat = (menus) => {
  let paths = {}
  menus.map(menu => {
    if (menu.parentId) {
      const pMenu = menus.find(pMenu => pMenu.id === menu.parentId)
      if (pMenu) {
        const pMenuPath = pMenu.url
        if (!paths[pMenuPath]) {
          paths[pMenuPath] = []
        }
        paths[pMenuPath].push(menu.url)
      }
    }
  })
  return paths
} // 输入全部有权限的路径，输出全部有权限的路径的父子关系，用于路由跳转

export const pathRedirect = (to) => {
  // if (!localStorage.token) {
  //   return '/login'
  // }
  const paths = JSON.parse(localStorage.paths) // 获取路径的父子关系
  const { matched } = to
  const path = matched[matched.length - 1].path // 获取跳转路径
  if (path === '') {
    return Object.keys(paths)[0]
  } // 如果路径为空，跳转到第一条路径
  return paths[path][0]
} // 输入父模块路径，自动计算拥有的权限的子模块路径

export const getAccount = (callback) => {
  if (!localStorage.realName) {
    // fetch({
    //   method: 'get',
    //   url: 'rbac/user/get'
    // }).then(response => {
    //   localStorage.userId = response.id
    //   localStorage.realname = response.name
    //   localStorage.paths = JSON.stringify(pathFormat(response.menus.filter(item => item.type !== 'BUTTON')))
      // localStorage.actions = response.menus.filter(item => item.type === 'BUTTON').map(item => {
      //   return item.url
      // })
    //   callback(response)
    // })
    localStorage.realname = '系统管理员'
    localStorage.paths = JSON.stringify(pathFormat(menus.filter(item => item.type !== 'BUTTON')))
    localStorage.actions = menus.filter(item => item.type === 'BUTTON').map(item => {
      return item.url
    })
  }
} // 输入父模块路径，自动计算拥有的权限的子模块路径

export function setCurrentNav (nav) {
  localStorage.currentNav = JSON.stringify(nav)
}
export function getCurrentNav () {
  return JSON.parse(localStorage.currentNav)
}
