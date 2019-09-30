/**
 * @protocol Util
 * @date 2019/03/19
 * @brief 유틸
 */
export default class SplitUtil {
    /**
     * 특정 길이의 임의 문자열 반환
     * @param len 길이
     * @return 문자열
     */
    static randomGenerate(len) {
        var text = "";
        var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
    
        for( var i = 0; i < len; i++ )
            text += charset.charAt(Math.floor(Math.random() * charset.length));
        
        return text;
    }
    /**
     * date의 요일 반환
     * @param date 날짜
     * @return 요일 문자열 
     */
    static getDayFromDate(date) {
        var daysStr = ['일', '월', '화', '수', '목', '금', '토'];
        return daysStr[date.getDay()];
    }

    /**
     * 숫자 콤마 표시
     * @param value 원본 숫자 
     */
    static numberWithCommas(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}