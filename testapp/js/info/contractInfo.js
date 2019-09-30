// //
// //  ContractInfo.js
// //  Split
// //
// //  Created by Mumakil on 2019. 1. 18..
// //  Copyright © 2019년 Melephant. All rights reserved.
// //


import CommonInfo from 'info/commonInfo';
import AlbumInfo, {ALBUMINFO_CONTAINER} from 'info/albumInfo';
import TrackInfo from 'info/trackInfo';
import TeamInfo from 'info/teamInfo';
import PerformanceInfo, {PERFORMANCEINFO_CONTAINER} from 'info/performanceInfo';

export const CONTRACTINFO_CONTAINER     = 'contractInfo';
export const CONTRACTINFO_TRACKLIST     = 'trackList';
export const CONTRACTINFO_TEAMLIST      = 'teamList';

/**
 * @protocol ContractInfo
 * @date 2019/03/18
 * @brief 계약 정보
 */
export default class ContractInfo extends CommonInfo {
    constructor() {
        super();

        this.albumInfo = new AlbumInfo;
        this.performanceInfo = new PerformanceInfo;

        this.trackList = [];
        this.teamList = [];
    }

    parseFromDictionary(dict) {
        this.albumInfo.parseFromDictionary(dict);

        if( dict.hasOwnProperty(PERFORMANCEINFO_CONTAINER) ) {
            this.performanceInfo.parseFromDictionary(dict[PERFORMANCEINFO_CONTAINER]);
        }

        if( dict.hasOwnProperty(CONTRACTINFO_TRACKLIST) ) {
            this.trackList = TrackInfo.listParseFromDictionary(dict, CONTRACTINFO_TRACKLIST);
        }

        if( dict.hasOwnProperty(CONTRACTINFO_TEAMLIST) ) {
            this.teamList = TeamInfo.listParseFromDictionary(dict, CONTRACTINFO_TEAMLIST);
        }
    }
}