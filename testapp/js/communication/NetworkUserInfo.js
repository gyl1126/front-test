import UserInfo from '../info/UserInfo'

var url = 'http://52.79.109.107:81';


/** 
 * 약관을 불러온다.
 *  
 * @param html 불러 올 약관 페이지경로 
 */

export const getHtmlPage = (html) => {
  return fetch(url + html)
  .then((response) => { console.log(response)
    return response
  })
  .catch((error) => {
    console.error(error);
  })
  .done();
}


/**
 * 휴대폰 번호 중복 체크 요청한다.
 * FIXED: 정책결정 필요
 * @param phoneNum 휴대폰번호
 */
export const getCheckExistPhone = (phoneNum) => {
  return fetch(url +phoneNum)
  .then((response) => response.json())
  .then((responseJson) => {
    console.log(responseJson)
  })
  .catch((error) => {
    console.error(error);
  })
  .done();
}


/**
 * 회원가입을 요청한다.
 * 
 * @param name 유저 이름
 * @param phone 휴대폰번호
 * @param advertise 광고 동의여부
 * @param marketing: 마케팅 동의여부
 * 
 */
export const requestSignUp = (name, pwd, phone, email,) => {
  fetch(url + '/user',
  {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_type: 0,
      password: pwd,
      name: name,
      phone: phone,
      email: email,
      birth_day: 0,
      gender: 0,
      advertise: true,
      marketing: true,     
    })
  }).then( (res)=> {
    console.log(res)
    // deviceStorage.saveKey("id_token", response.data.jwt);
    //this.props.navigation.navigate('Home')
}) 
  .catch((error) => {
    console.error(error);
  })
  .done();
}


/**
 * 기존 회원 로그인을 요청한다.
 * FIXED: 정책결정필요
 * 
 */

 export const requestLoginIn = (phone, pwd) =>{  
  return fetch(url +'/user/auth?phone='+ phone +'&password=' + pwd)
  .then((response) => response.json())
  .then((res) => {
    console.log(res);
    var userInfo = new UserInfo();
    userInfo.parseFromDictionary(res.data);
    console.log(userInfo.userID)   
  })
  .catch((error) => {
    console.error(error);
  })
  .done()
}

/**
 * 비밀번호를 재설정한다. 
 * @param password: 유저 비밀번호
 * 
 */
export const putUserPwd = (phone, userPwd) => {
  fetch( url + phone,
   {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password: userPwd,   
    })
  }).then(res=>res.json())
  .then((res) => {
    console.log(res)
  })  
  .catch((error) => {
    console.error(error);
  })
  .done();
}
