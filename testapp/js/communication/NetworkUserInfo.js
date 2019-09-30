import UserInfo from '../info/UserInfo'

var url = 'http://52.79.109.107:81';


//외부에서 사용하기위한 객체
export const loginInfo = new UserInfo();






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
 * FIEXED 이메일 사용유무
 * 
 * @param name 유저 이름
 * @param phone 휴대폰번호
 * @param email 이메일
 * @param advertise 광고 동의여부
 * @param marketing: 마케팅 동의여부
 * 
 */
export const requestSignUp = (name, pwd, phone, advertise, marketing) => {
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
      email: '',
      birth_day: 0,
      gender: 0,
      advertise: advertise,
      marketing: marketing,     
    })
  }).then( (res)=> {
    console.log(res)
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
 * @param phone 유저휴대폰번호
 * @param pwd 유저비밀번호
 * 
 */

 export const requestLoginIn = (phone, pwd) =>{  
  return fetch(url +'/user/auth?phone='+ phone +'&password=' + pwd)
  .then((response) => response.json())
  .then((res) => {
    loginInfo.parseFromDictionary(res.data);
    console.log(loginInfo);
  })
  .catch((error) => {
    console.error(error);
  })
  .done()
}

/**
 * (비밀번호를 알고있는 경우) 비밀번호를 재설정한다. 
 * 
 * 
 * @param type 유저타입 
 * @param password: 유저 비밀번호
 * @param newpassword: 변경할 유저 비밀번호
 * @param phone: 휴대폰번호
 * @param email: 이메일번호
 * @param birthday: 생일
 * @param gender: 성별
 * 
 */
export const putUserPwd = (  password, newpassword, phone, gender) => {
  fetch( url + '/user',
   {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
     // user_type: type,
    // name: name,
      password: password,
      new_password: newpassword,     
      phone: phone,
      gender: gender,  
     // email: email,
     // birth_day: birthday,
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
