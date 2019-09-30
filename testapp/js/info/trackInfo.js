//
//  trackInfo.js
//  Split
//
//  Created by Mumakil on 2019. 1. 18..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import CommonInfo from 'info/commonInfo';
import TeamInfo from 'info/teamInfo';

export const TRACKINFO_CONTAINER    = 'trackInfo';
export const TRACKINFO_TRACKID      = 'trackId';
export const TRACKINFO_TITLE        = 'title';
export const TRACKINFO_TRACKCODE    = 'trackCode';
export const TRACKINFO_CALCULATEDAY = 'calcultaeday';
export const TRACKINFO_STARTDATE    = 'startdate';
export const TRACKINFO_ENDDATE      = 'enddate';
export const TRACKINFO_TEAMLIST     = 'teamList';

/**
 * @protocol TrackInfo
 * @date 2019/03/18
 * @brief 곡 정보
 */
export default class TrackInfo extends CommonInfo {
    constructor() {
        super();

        this.trackId = '';
        this.title = '';
        this.trackCode = '';
        this.calculateDay = 0;
        this.startDate = null;
        this.endDate = null;
        this.teamList = [];
    }

    /**
     * dictionary 객체에서 데이터 값을 가져와서 변수에 넣음 
     * @param dict 정보 객체
     */
    parseFromDictionary(dict) {
        if( dict.hasOwnProperty(TRACKINFO_TRACKID) )
            this.trackId = dict[TRACKINFO_TRACKID];
        
        if( dict.hasOwnProperty(TRACKINFO_TITLE) )
            this.title = dict[TRACKINFO_TITLE];
        
        if( dict.hasOwnProperty(TRACKINFO_TRACKCODE) )
            this.trackCode = dict[TRACKINFO_TRACKCODE];

        if( dict.hasOwnProperty(TRACKINFO_CALCULATEDAY) )
            this.calculateDay = dict[TRACKINFO_CALCULATEDAY];

        if( dict.hasOwnProperty(TRACKINFO_STARTDATE) )
            this.startDate = dict[TRACKINFO_STARTDATE];

        if( dict.hasOwnProperty(TRACKINFO_ENDDATE) )
            this.endDate = dict[TRACKINFO_ENDDATE];

        if( dict.hasOwnProperty(TRACKINFO_TEAMLIST) )
            this.teamList = TeamInfo.listParseFromDictionary(dict, TRACKINFO_TEAMLIST);
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
            var track = new TrackInfo();
            track.parseFromDictionary(itemDict);
            results.push(track);
        }

        return results;
    }
}