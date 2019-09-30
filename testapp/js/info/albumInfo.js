//
//  albumInfo.js
//  Split
//
//  Created by Mumakil on 2019. 1. 18..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import CommonInfo from 'info/commonInfo';

export const ALBUMINFO_CONTAINER    = 'albumInfo';
export const ALBUMINFO_ALBUMID     = 'albumId';
export const ALBUMINFO_ALBUMNAME   = 'name';
export const ALBUMINFO_ARTIST      = 'artist';
export const ALBUMINFO_LABEL       = 'label';
export const ALBUMINFO_DISTRIBUTION    = 'distribution';
export const ALBUMINFO_ALBUMCODE   = 'albumCode';
export const ALBUMINFO_RELEASEDATE = 'releaseDate';
export const ALBUMINFO_COVERIMAGE  = 'coverImage';

/**
 * @protocol AlbumInfo
 * @date 2019/03/18
 * @brief 앨범 정보
 */
export default class AlbumInfo extends CommonInfo {
    constructor() {
        super();

        this.albumId = '';
        this.albumName = '';
        this.artist = '';
        this.label = '';
        this.distribution = '';
        this.albumCode = '';
        this.releaseDate = '';
        this.coverImage = null;
    }

    /**
     * dictionary 객체에서 데이터 값을 가져와서 변수에 넣음 
     * @param dict 정보 객체
     */
    parseFromDictionary(dict) {
        if( dict.hasOwnProperty(ALBUMINFO_ALBUMID) )
            this.albumId = dict[ALBUMINFO_ALBUMID];
        
        if( dict.hasOwnProperty(ALBUMINFO_ALBUMNAME) )
            this.albumName = dict[ALBUMINFO_ALBUMNAME];

        if( dict.hasOwnProperty(ALBUMINFO_ARTIST) )
            this.artist = dict[ALBUMINFO_ARTIST];

        if( dict.hasOwnProperty(ALBUMINFO_LABEL) )
            this.label = dict[ALBUMINFO_LABEL];

        if( dict.hasOwnProperty(ALBUMINFO_DISTRIBUTION) )
            this.distribution = dict[ALBUMINFO_DISTRIBUTION];

        if( dict.hasOwnProperty(ALBUMINFO_ALBUMCODE) )
            this.albumCode = dict[ALBUMINFO_ALBUMCODE];

        if( dict.hasOwnProperty(ALBUMINFO_RELEASEDATE) )
            this.releaseDate = dict[ALBUMINFO_RELEASEDATE];

        if( dict.hasOwnProperty(ALBUMINFO_COVERIMAGE) )
            this.coverImage = dict[ALBUMINFO_COVERIMAGE];
    }
}