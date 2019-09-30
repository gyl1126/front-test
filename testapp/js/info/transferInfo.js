//
//  transferInfo.js
//  Split
//
//  Created by Mumakil on 2019. 1. 18..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import CommonInfo from 'info/commonInfo';

import BankAccountInfo, {BANKACCOUNTINFO_CONTAINER} from 'info/bankAccountInfo';

export const TRANSFERINFO_CONTAINER     = 'transferInfo';
export const TRANSFERINFO_TRANSFERID    = 'transferId';
export const TRANSFERINFO_CURRENCY      = 'currency';
export const TRANSFERINFO_AMOUNT        = 'amount';
export const TRANSFERINFO_SENDERACCOUNT     = 'senderAccount';
export const TRANSFERINFO_SENDERBANKCODE    = 'senderBankCode';
export const TRANSFERINFO_RECEIVERACCOUNT     = 'receiverAccount';
export const TRANSFERINFO_RECEIVERBANKCODE    = 'receiverBankCode';

/**
 * @protocol TransferInfo
 * @date 2019/03/22
 * @brief 송금 정보
 */
export default class TransferInfo extends CommonInfo {
    constructor() {
        super();

        this.transferId = '';
        this.currency = null;
        this.amount = '';
        this.senderAccount = new BankAccountInfo;
        this.receiverAccount = new BankAccountInfo;
    }

    /**
     * dictionary 객체에서 데이터 값을 가져와서 변수에 넣음 
     * @param dict 정보 객체
     */
    parseFromDictionary(dict) {
        if( dict.hasOwnProperty(TRANSFERINFO_TRANSFERID) )
            this.transferId = dict[TRANSFERINFO_TRANSFERID];
        
        if( dict.hasOwnProperty(TRANSFERINFO_CURRENCY) )
            this.currency = dict[TRANSFERINFO_CURRENCY];

        if( dict.hasOwnProperty(TRANSFERINFO_AMOUNT) )
            this.amount = dict[TRANSFERINFO_AMOUNT];

        this.senderAccount.parseFromDictionary(dict);
        this.receiverAccount.parseFromDictionary(dict);
    }
}