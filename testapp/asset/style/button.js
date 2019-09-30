import {StyleSheet} from 'react-native';
import ColorStyle from 'style/color';

const styles = StyleSheet.create({
    submit: {
        paddingTop:17,
        paddingBottom:17,
        paddingLeft:45,
        paddingRight:45,
        backgroundColor:ColorStyle.White,
        borderRadius:6,
        borderWidth:1,
        borderColor:ColorStyle.White
    },
    add: {
        width:'100%',
        height:'100%',
        backgroundColor:ColorStyle.NiceBlue3,
        alignItems:'center',
        justifyContent: 'center',
    },
    agreement: {
        left:30,
        right:30,
        paddingTop:15,
        paddingBottom:15,
        backgroundColor:ColorStyle.White,
        borderRadius:11,
        borderWidth:2,
        borderColor:ColorStyle.CoolBlue
    },
    confirm_disable: {
        paddingTop:15,
        paddingBottom:15,
        left:36,
        right:36,
        backgroundColor:ColorStyle.LightPeriwinkle,
        borderRadius:8,
        borderWidth:1,
        borderColor:ColorStyle.LightPeriwinkle
    },
    confirm: {
        paddingTop:15,
        paddingBottom:15,
        left:36,
        right:36,
        backgroundColor:ColorStyle.NiceBlue2,
        borderRadius:8,
        borderWidth:1,
        borderColor:ColorStyle.NiceBlue2
    },
    normal_white: {
        width: '100%',
        height: '100%',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor:ColorStyle.White,
        borderRadius:9,
    },
    normal_melon: {
        width: '100%',
        height: '100%',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor:ColorStyle.Melon,
        borderRadius:9,
    },
    default: {
        paddingTop:13.5,
        paddingBottom:13.5,
        paddingLeft:20,
        paddingRight:20,
        backgroundColor:ColorStyle.White,
        borderRadius:9,
        borderWidth:1,
        borderColor:ColorStyle.White
    },
    default_color: {
        paddingTop:13.5,
        paddingBottom:13.5,
        paddingLeft:20,
        paddingRight:20,
        backgroundColor:ColorStyle.Melon,
        borderRadius:9,
        borderWidth:1,
        borderColor:ColorStyle.Melon
    },
    small_color: {
        width:'100%',
        height:'100%',
        backgroundColor:ColorStyle.FrenchBlue,
        borderRadius:8,
        borderWidth:1,
        borderColor:ColorStyle.FrenchBlue,
        alignItems:'center',
        justifyContent: 'center',
    },
    small_white: {
        width:'100%',
        height:'100%',
        backgroundColor:ColorStyle.White,
        borderRadius:8,
        borderWidth:1,
        borderColor:ColorStyle.Wisteria,
        alignItems:'center',
        justifyContent: 'center',
    },
  });

export default styles;