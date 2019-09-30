/**
 * @protocol String
 * @date 2019/02/15
 * @brief 문자열
 */
export default class String {
    // constructor(props) {
    //     // super(props);
    //     this.randomGenerate = this.randomGenerate.bind(this);
    // }
    
    static randomGenerate(len) {
        var text = "";
        var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
    
        for( var i = 0; i < len; i++ )
            text += charset.charAt(Math.floor(Math.random() * charset.length));
        
        return text;
    }
}