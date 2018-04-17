﻿import { MessageBox } from 'element-ui'
import CLODOP from 'CLODOP'
import getCLodop from 'getCLodop'
var CreatedOKLodop7766 = null
function needCLodop () {
  try {
    var ua = navigator.userAgent
    if (ua.match(/Windows\sPhone/i) != null) {
      return true
    }
    if (ua.match(/iPhone|iPod/i) != null) {
      return true
    }
    if (ua.match(/Android/i) != null) {
      return true
    }
    if (ua.match(/Edge\D?\d+/i) != null) {
      return true
    }
    var verTrident = ua.match(/Trident\D?\d+/i)
    var verIE = ua.match(/MSIE\D?\d+/i)
    var verOPR = ua.match(/OPR\D?\d+/i)
    var verFF = ua.match(/Firefox\D?\d+/i)
    var x64 = ua.match(/x64/i)
    if ((verTrident == null) && (verIE == null) && (x64 !== null)) {
      return true
    }
    if (verFF !== null) {
      verFF = verFF[0].match(/\d+/)
      if ((verFF[0] >= 42) || (x64 !== null)) {
        return true
      }
    }
    if (verOPR !== null) {
      verOPR = verOPR[0].match(/\d+/)
      if (verOPR[0] >= 32) return true
    }
    if ((verTrident == null) && (verIE == null)) {
      var verChrome = ua.match(/Chrome\D?\d+/i)
      if (verChrome !== null) {
        verChrome = verChrome[0].match(/\d+/)
        if (verChrome[0] >= 42) return true
      }
    }
    return false
  } catch (err) {
    return true
  }
}
if (needCLodop()) {
  // var head = document.head || document.getElementsByTagName('head')[0] || document.documentElement
  // var oscript = document.createElement('script')
  // oscript.src = 'http://localhost:8000/CLodopfuncs.js?priority=1'
  // head.insertBefore(oscript, head.firstChild)
  // oscript = document.createElement('script')
  // oscript.src = 'http://localhost:18000/CLodopfuncs.js?priority=0'
  // head.insertBefore(oscript, head.firstChild)
}
export function getLodop (oOBJECT, oEMBED) {
  // var strHtmInstall = "<br><font color='#FF00FF'>打印控件未安装!点击这里<a href='install_lodop32.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>"
  // var strHtmUpdate = "<br><font color='#FF00FF'>打印控件需要升级!点击这里<a href='install_lodop32.exe' target='_self'>执行升级</a>,升级后请重新进入。</font>"
  // var strHtm64_Install = "<br><font color='#FF00FF'>打印控件未安装!点击这里<a href='install_lodop64.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>"
  // var strHtm64_Update = "<br><font color='#FF00FF'>打印控件需要升级!点击这里<a href='install_lodop64.exe' target='_self'>执行升级</a>,升级后请重新进入。</font>"
  // var strHtmFireFox = "<br><br><font color='#FF00FF'>（注意：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它）</font>"
  // var strHtmChrome = "<br><br><font color='#FF00FF'>(如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行以上安装）</font>"
  // var strCLodopInstall = "<br><font color='#FF00FF'>CLodop云打印服务(localhost本地)未安装启动!点击这里<a href='CLodop_Setup_for_Win32NT.exe' target='_self'>执行安装</a>,安装后请刷新页面。</font>"
  // var strCLodopUpdate = "<br><font color='#FF00FF'>CLodop云打印服务需升级!点击这里<a href='CLodop_Setup_for_Win32NT.exe' target='_self'>执行升级</a>,升级后请刷新页面。</font>"
  var LODOP
  try {
    var isIE = (navigator.userAgent.indexOf('MSIE') >= 0) || (navigator.userAgent.indexOf('Trident') >= 0)
    if (needCLodop()) {
      try {
        LODOP = getCLodop()
      } catch (err) {
        down('出错' + err)
      }
      if (!LODOP && document.readyState !== 'complete') {
        down('C-Lodop没准备好，请稍后再试！')
        return
      }
      if (!LODOP) {
        if (isIE) {
          down('CLodop云打印服务(localhost本地)未安装启动!点击下载安装!安装后请刷新页面。', 'CLodop_Setup_for_Win32NT.exe')
        } else {
          down('CLodop云打印服务(localhost本地)未安装启动!点击下载安装!安装后请刷新页面。', 'CLodop_Setup_for_Win32NT.exe')
        }
        return
      } else {
        if (CLODOP.CVERSION < '2.0.9.0') {
          if (isIE) down('CLodop云打印服务需升级,点击下载安装执行升级!安装后请刷新页面。', 'CLodop_Setup_for_Win32NT.exe')
          else {
            down('CLodop云打印服务需升级,点击下载安装执行升级!安装后请刷新页面。', 'CLodop_Setup_for_Win32NT.exe')
          }
        }
        if (oEMBED && oEMBED.parentNode) oEMBED.parentNode.removeChild(oEMBED)
        if (oOBJECT && oOBJECT.parentNode) oOBJECT.parentNode.removeChild(oOBJECT)
      }
    } else {
      var is64IE = isIE && (navigator.userAgent.indexOf('x64') >= 0)
      if (oOBJECT !== undefined || oEMBED !== undefined) {
        if (isIE) LODOP = oOBJECT
        else LODOP = oEMBED
      } else if (CreatedOKLodop7766 == null) {
        LODOP = document.createElement('object')
        LODOP.setAttribute('width', 0)
        LODOP.setAttribute('height', 0)
        LODOP.setAttribute('style', 'position:absoluteleft:0pxtop:-100pxwidth:0pxheight:0px')
        if (isIE) LODOP.setAttribute('classid', 'clsid:2105C259-1E0C-4534-8141-A753534CB4CA')
        else LODOP.setAttribute('type', 'application/x-print-lodop')
        document.documentElement.appendChild(LODOP)
        CreatedOKLodop7766 = LODOP
      } else LODOP = CreatedOKLodop7766
      if ((LODOP == null) || (typeof LODOP.VERSION) === 'undefined') {
        if (navigator.userAgent.indexOf('Chrome') >= 0) {
          down('如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行以上安装')
        } else if (navigator.userAgent.indexOf('Firefox') >= 0) {
          down('注意：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它）')
        } else if (is64IE) {
          down('打印控件未安装!点击下载执行安装,安装后请刷新页面或重新进入。', 'install_lodop64.exe')
        } else if (isIE) {
          down('打印控件未安装!点击下载执行安装,安装后请刷新页面或重新进入。', 'install_lodop32.exe')
        } else {
          down('打印控件未安装!点击下载执行安装,安装后请刷新页面或重新进入。', 'install_lodop32.exe')
        }
        return LODOP
      }
    }
    if (LODOP.VERSION < '6.2.1.5') {
      if (needCLodop()) {
        down('CLodop云打印服务需升级,点击下载安装执行升级!安装后请刷新页面。', 'CLodop_Setup_for_Win32NT.exe')
      } else if (is64IE) {
        down('CLodop云打印服务需升级,点击下载安装执行升级!安装后请刷新页面。', 'install_lodop64.exe')
      } else if (isIE) {
        down('CLodop云打印服务需升级,点击下载安装执行升级!安装后请刷新页面。', 'install_lodop32.exe')
      } else {
        down('CLodop云打印服务需升级,点击下载安装执行升级!安装后请刷新页面。', 'install_lodop32.exe')
      }
      return LODOP
    }
    return LODOP
  } catch (err) {
    down('getLodop出错:' + err)
  }
}
function down (content, url) {
  MessageBox.confirm(content, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    if (url === undefined) return
    window.location.href = '/tool?download=' + url
  })
}
