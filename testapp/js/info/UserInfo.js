import CommonInfo from 'info/commonInfo';

export const USERINFO_USERID       = 'user_id'
export const USERINFO_USERTYPE     = 'user_type';
export const USERINFO_PASSWORD     = 'password';
export const USERINFO_NAME         = 'name';
export const USERINFO_PHONE        = 'phone';
export const USERINFO_EMAIL        = 'email';
export const USERINFO_BIRTHDAY     = 'birth_day';
export const USERINFO_GENDER       = 'gender';
export const USERINFO_ADVERTISE    = 'advertise';
export const USERINFO_MARKETING    = 'marketing';

/**
 * @protocol UserInfo
 * @date 2019/09/27
 * @brief 유저 정보
 */
export default class UserInfo extends CommonInfo {
    constructor() {
        super();

        this.userID = '';
        this.userType = '';
        this.userPassword = '';
        this.userName = '';
        this.userPhone = '';
        this.userEmail = '';
        this.userBirthday = '';
        this.userGender = '';
        this.advertise = null;
        this.marketing = null;
    }

    /**
     * dictionary 객체에서 데이터 값을 가져와서 변수에 넣음 
     * @param dict 정보 객체
     */
    parseFromDictionary(dict) {

        if( dict.hasOwnProperty(USERINFO_USERID) )
            this.userID = dict[USERINFO_USERID];
        
        if( dict.hasOwnProperty(USERINFO_USERTYPE) )
            this.userType = dict[USERINFO_USERTYPE];
        
        if( dict.hasOwnProperty(USERINFO_PASSWORD) )
            this.userPassword = dict[USERINFO_PASSWORD];

        if( dict.hasOwnProperty(USERINFO_NAME) )
            this.userName = dict[USERINFO_NAME];

        if( dict.hasOwnProperty(USERINFO_PHONE) )
            this.userPhone = dict[USERINFO_PHONE];

        if( dict.hasOwnProperty(USERINFO_EMAIL) )
            this.userEmail = dict[USERINFO_EMAIL];

        if( dict.hasOwnProperty(USERINFO_BIRTHDAY) )
            this.userBirthday = dict[USERINFO_BIRTHDAY];

        if( dict.hasOwnProperty(USERINFO_GENDER) )
            this.userGender = dict[USERINFO_GENDER];

        if( dict.hasOwnProperty(USERINFO_ADVERTISE) )
            this.advertise = dict[USERINFO_ADVERTISE];

        if( dict.hasOwnProperty(USERINFO_MARKETING) )
            this.marketing = dict[USERINFO_MARKETING];
    }
}