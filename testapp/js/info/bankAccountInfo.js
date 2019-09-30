//
//  bankAccountInfo.js
//  Split
//
//  Created by Mumakil on 2019. 4. 24..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import CommonInfo from 'info/commonInfo';

export const BANKACCOUNTINFO_CONTAINER      = 'bankAccountInfo';
export const BANKACCOUNTINFO_USERNAME       = 'userName';
export const BANKACCOUNTINFO_BANKCODE       = 'bankCode';
export const BANKACCOUNTINFO_BANKNAME       = 'bankName';
export const BANKACCOUNTINFO_BANKICONURL    = 'bankIconUrl';
export const BANKACCOUNTINFO_ACCOUNTNUMBER  = 'accountNumber';
export const BANKACCOUNTINFO_BALANCE        = 'balance';

/**
 * @protocol BankAccountInfo
 * @date 2019/04/24
 * @brief 은행 계좌 정보
 */
export default class BankAccountInfo extends CommonInfo {
    constructor() {
        super();

        this.userName = null;       // 계좌주
        this.bankCode = null;       // 은행 식별 코드
        this.bankName = null;       // 은행명
        this.bankIconUrl = null;    // 은행 아이콘 url
        this.accountNumber = null;  // 계좌번호
        this.balance = 0;           // 잔액
    }

    /**
     * dictionary 객체에서 데이터 값을 가져와서 변수에 넣음 
     * @param dict 정보 객체
     */
    parseFromDictionary(dict) {
        if( dict.hasOwnProperty(BANKACCOUNTINFO_USERNAME) )
            this.userName = dict[BANKACCOUNTINFO_USERNAME];

        if( dict.hasOwnProperty(BANKACCOUNTINFO_BANKCODE) )
            this.bankCode = dict[BANKACCOUNTINFO_BANKCODE];
        
        if( dict.hasOwnProperty(BANKACCOUNTINFO_BANKNAME) )
            this.bankName = dict[BANKACCOUNTINFO_BANKNAME];

        if( dict.hasOwnProperty(BANKACCOUNTINFO_BANKICONURL) )
            this.bankIconUrl = dict[BANKACCOUNTINFO_BANKICONURL];

        if( dict.hasOwnProperty(BANKACCOUNTINFO_ACCOUNTNUMBER) )
            this.accountNumber = dict[BANKACCOUNTINFO_ACCOUNTNUMBER];

        if( dict.hasOwnProperty(BANKACCOUNTINFO_BALANCE) )
            this.balance = dict[BANKACCOUNTINFO_BALANCE];
    }
}