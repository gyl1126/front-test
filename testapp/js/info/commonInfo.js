//
//  CommonInfo.js
//  Split
//
//  Created by Mumakil on 2019. 3. 13..
//  Copyright © 2019년 Melephant. All rights reserved.
//

export default class CommonInfo {
    constructor() {
        
    }
    
    // 데이터 유무 체크
    // 유틸 형변환 등

//     /**
//  멤버 변수 가운데 지정된 key값들에 해당하는 변수에 대해서만 dictionary를 구성하여 반환한다.
//  @param keys dictionary로 추출할 key값들. 이 값에 지정된 key값들에 대해서만 dictionary로 반환한다. 만일 key정보가 없으면 dictionary에 포함하지 않고, value 정보가 없으면 null 객체로 대체한다.
//  @return key값과 value값으로 구성되어 있는 dictionary. 반환할 값이 없으면 빈 dictionary를 반환한다.
//  */
// - (NSDictionary *)dictionaryForKeys:(NSArray *)keys
// {
//     NSMutableDictionary *dictionary = [NSMutableDictionary dictionary];
//     NSDictionary *baseDictionary = [self dictionaryAll];
    
//     for (NSString *key in keys) {
//         if ([baseDictionary.allKeys containsObject:key]) {
//             [dictionary setObject:[baseDictionary objectForKey:key] forKey:key];
//         }
//     }
    
//     return dictionary;
// }

// /**
//  모든 멤버 변수에 대해서 dictionary를 구성하여 반환한다.
//  @return key값과 value값으로 구성되어 있는 dictionary. 만일 새로 정의된 데이터 클래스가 멤버변수로 지정되어 있을 경우, 해당 멤버 변수의 dictionary를 얻어와 이를 현재의 dictionary에 추가해 준다. 수평적으로 구성한다. 모든 key-value 관계는 1차원적 관계를 가진다. 반환할 값이 없으면 빈 dictionary를 반환한다.
//  */
// - (NSDictionary *)dictionaryAll
// {
//     NSMutableDictionary *dictionary = [NSMutableDictionary dictionaryWithDictionary:[self dictionaryOnlyPrimitiveType]];

//     NSArray *dictionariesExtra = [self dictionariesExceptPrimitiveType];
    
//     for (NSDictionary *dictionaryExtra in dictionariesExtra) {
//         [dictionary addEntriesFromDictionary:dictionaryExtra];
//     }
    
//     return dictionary;
// }
}

