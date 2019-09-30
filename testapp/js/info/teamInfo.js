//
//  teamInfo.js
//  Split
//
//  Created by Mumakil on 2019. 3. 13..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import CommonInfo from 'info/commonInfo';

export const TEAMINFO_CONTAINER = 'teamInfo';
export const TEAMINFO_TEAMID    = 'teamId';
export const TEAMINFO_MEMBERTYPE    = 'membertype';
export const TEAMINFO_NAME      = 'name';
export const TEAMINFO_PHONE     = 'phone';
export const TEAMINFO_TYPE      = 'type';
export const TEAMINFO_RATIO     = 'ratio';
export const TEAMINFO_ISSTAMP   = 'isStamp';

export const TEAMINFO_TYPEMAIN  = 'main';
export const TEAMINFO_TYPEOTHER = 'other';
export const TEAMINFO_MEMBERTYPE_ARTIST = 'artist';
export const TEAMINFO_MEMBERTYPE_LABEL  = 'label';
export const TEAMINFO_MEMBERTYPE_DISTRIBUTION   = 'distribution';

/**
 * @protocol TeamInfo
 * @date 2019/03/18
 * @brief 팀 정보
 */
export default class TeamInfo extends CommonInfo {
    constructor() {
        super();

        this.teamId = '';
        this.name = '';
        this.phone = '';
        this.memberType = TEAMINFO_MEMBERTYPE_ARTIST;
        this.type = TEAMINFO_TYPEMAIN;
        this.ratio = 0;
        this.isStamp = false;
    }

    /**
     * dictionary 객체에서 데이터 값을 가져와서 변수에 넣음 
     * @param dict 정보 객체
     */
    parseFromDictionary(dict) {
        if( dict.hasOwnProperty(TEAMINFO_TEAMID) )
            this.teamId = dict[TEAMINFO_TEAMID];
        
        if( dict.hasOwnProperty(TEAMINFO_NAME) )
            this.name = dict[TEAMINFO_NAME];
        
        if( dict.hasOwnProperty(TEAMINFO_PHONE) )
            this.phone = dict[TEAMINFO_PHONE];
            
        if( dict.hasOwnProperty(TEAMINFO_TYPE) )
            this.type = dict[TEAMINFO_TYPE];
        
        if( dict.hasOwnProperty(TEAMINFO_RATIO) )
            this.ratio = dict[TEAMINFO_RATIO];

        if( dict.hasOwnProperty(TEAMINFO_ISSTAMP) )
            this.isStamp = dict[TEAMINFO_ISSTAMP];

        if( dict.hasOwnProperty(TEAMINFO_MEMBERTYPE) )
            this.memberType = dict[TEAMINFO_MEMBERTYPE];
    }

    /**
     * array로 구성된 dictionary 객체에서 데이터 값을 가져와서 변수에 넣음 
     * @param dict 정보 객체
     * @param containerKey 리스트 키
     * @returns trackInfo 리스트
     */
    static listParseFromDictionary(dict, containerKey) {
        if( !dict.hasOwnProperty(containerKey) )
            return null;

        var results = [];
        var items = dict[containerKey];
        
        for( var i = 0; i < items.length; i++ ) {
            var itemDict = items[i];
            var item = new TeamInfo();
            item.parseFromDictionary(itemDict);
            results.push(item);
        }

        return results;
    }
}