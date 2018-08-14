/**
 * @desc login modules
 * @author simbawu
 * @date 2018-08-14
 */

const app = getApp();
import {getToken, getTokenSilent} from './request.js';
import {appKey} from '../config/config.js';

function login(callBack) {
  if (!app.globalData.token) {
    myLogin(callBack);
  } else {
    // token存在直接执行回调
    typeof callBack === 'function' && callBack();
  }
}

function myLogin(callBack) {
  my.getAuthCode({
    scopes: 'auth_base',
    success: (res) => {
      console.log('auth_base', res.authCode);
      getUserTokenSilent(res.authCode, callBack);
    }
  });
}

function myAuthLogin(callBack) {
  my.getAuthCode({
    scopes: 'auth_user',
    success: (res) => {
      console.log('auth_user', res.authCode);
      getUserToken(res.authCode, callBack);
    },
    fail(error){
      console.log('fail',error);
      my.alert({
        title: '温馨提示',
        content: '朋友，你好！为了给您提供更加优质的服务，我们需要得到您的授权',
        buttonText: '立即授权',
        success: () => {
          myAuthLogin(callBack);
        },
      });
    },
    complete(){
      console.log('complete');
    }
  });
}

function getUserToken(code, callBack) {
  let data = {
    code: code,
    app_key: appKey
  };

  getToken(data).then(res => {
    handleToken(res.token, callBack);
  });
}

function getUserTokenSilent(code, callBack) {
  let data = {
    code: code,
    app_key: appKey
  };

  getTokenSilent(data).then(res => {
    let token = res && res.token;
    if (token) {
      handleToken(token, callBack);
    } else {
      myAuthLogin(callBack);
    }
  })
}

function handleToken(token, callBack) {
  app.globalData.token = token;
  typeof callBack === "function" && callBack();
}

export default login;
