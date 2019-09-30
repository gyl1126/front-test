//
//  performanceInfo.js
//  Split
//
//  Created by Mumakil on 2019. 9. 16..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import CommonInfo from 'info/commonInfo';

export const PERFORMANCEINFO_CONTAINER      = 'performanceInfo';
export const PERFORMANCEINFO_TYPE           = 'type';
export const PERFORMANCEINFO_PERFORMANCEID  = 'performanceId';
export const PERFORMANCEINFO_TITLE          = 'title';
export const PERFORMANCEINFO_ARTIST         = 'artist';
export const PERFORMANCEINFO_LABEL          = 'label';
export const PERFORMANCEINFO_DISTRIBUTION   = 'distribution';
export const PERFORMANCEINFO_STARTDATE      = 'startdate';
export const PERFORMANCEINFO_ENDDATE        = 'enddate';
export const PERFORMANCEINFO_CONTRACTSTARTDATE  = 'contractstartdate';
export const PERFORMANCEINFO_CONTRACTENDDATE  = 'contractenddate';
export const PERFORMANCEINFO_TEAMLIST       = 'teamList';
export const PERFORMANCEINFO_COVERIMAGE     = 'coverImage';

export const PERFORMANCEINFO_TYPE_ARTIST    = 'artist';
export const PERFORMANCEINFO_TYPE_LABEL     = 'label';
export const PERFORMANCEINFO_TYPE_DISTRIBUTION  = 'distribution';

/**
 * @protocol PerformanceInfo
 * @date 2019/09/16
 * @brief 공연 정보
 */
export default class AlbumInfo extends CommonInfo {
    constructor() {
        super();

        this.type = '';
        this.performanceId = '';
        this.title = '';
        this.artist = '';
        this.label = '';
        this.distribution = '';
        this.startdate = '';
        this.enddate = '';
        this.contractStartdate = '';
        this.contractEnddate = '';
        this.teamList = [];
        this.coverImage = null;
    }

    /**
     * dictionary 객체에서 데이터 값을 가져와서 변수에 넣음 
     * @param dict 정보 객체
     */
    parseFromDictionary(dict) {
        if( dict.hasOwnProperty(PERFORMANCEINFO_TYPE) )
            this.type = dict[PERFORMANCEINFO_TYPE];

        if( dict.hasOwnProperty(PERFORMANCEINFO_PERFORMANCEID) )
            this.performanceId = dict[PERFORMANCEINFO_PERFORMANCEID];
        
        if( dict.hasOwnProperty(PERFORMANCEINFO_TITLE) )
            this.title = dict[PERFORMANCEINFO_TITLE];

        if( dict.hasOwnProperty(PERFORMANCEINFO_ARTIST) )
            this.artist = dict[PERFORMANCEINFO_ARTIST];

        if( dict.hasOwnProperty(PERFORMANCEINFO_LABEL) )
            this.label = dict[PERFORMANCEINFO_LABEL];

        if( dict.hasOwnProperty(PERFORMANCEINFO_DISTRIBUTION) )
            this.distribution = dict[PERFORMANCEINFO_DISTRIBUTION];

        if( dict.hasOwnProperty(PERFORMANCEINFO_STARTDATE) )
            this.startdate = dict[PERFORMANCEINFO_STARTDATE];
        
        if( dict.hasOwnProperty(PERFORMANCEINFO_ENDDATE) )
            this.enddate = dict[PERFORMANCEINFO_ENDDATE];

        if( dict.hasOwnProperty(PERFORMANCEINFO_CONTRACTSTARTDATE) )
            this.contractStartdate = dict[PERFORMANCEINFO_CONTRACTSTARTDATE];
        
        if( dict.hasOwnProperty(PERFORMANCEINFO_CONTRACTENDDATE) )
            this.contractEnddate = dict[PERFORMANCEINFO_CONTRACTENDDATE];

        if( dict.hasOwnProperty(PERFORMANCEINFO_TEAMLIST) )
            this.teamList = TeamInfo.listParseFromDictionary(dict, PERFORMANCEINFO_TEAMLIST);
        
        if( dict.hasOwnProperty(PERFORMANCEINFO_COVERIMAGE) )
            this.coverImage = dict[PERFORMANCEINFO_COVERIMAGE];
    }
}