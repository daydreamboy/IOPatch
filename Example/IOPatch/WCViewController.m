//
//  WCViewController.m
//  IOPatch
//
//  Created by 晨凉 on 09/05/2021.
//  Copyright (c) 2021 晨凉. All rights reserved.
//

#import "WCViewController.h"
#import <TBWeiwo/TBWeiwo.h>
#import <TBWeiwo/TBWeiwo+Internal.h>
//#import "TBWeiwo+Internal.h"

#define STR_OF_JSON(...) @#__VA_ARGS__

@interface WCViewController ()

@end

@implementation WCViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
    self.view.backgroundColor = [UIColor whiteColor];
    
//    NSString *JSONString = STR_OF_JSON(
//       {"args":[[{"type":"raw","value":{"name":"UIApplication"}},{"type":"raw","value":{"name":"sharedApplication"}}]],"methodName":"call","target":{"body":[{"name":"setSlot","args":[[{"literal":"jscodes"}],[{"name":"squareBrackets"}]]},{"name":";"},{"name":"setSlot","args":[[{"literal":"blockSpec"}],[{"name":"curlyBrackets","args":[[{"literal":"body"},{"name":":","args":[[{"name":"body"}]]}],[{"literal":"signature"},{"name":":","args":[[{"literal":"v@"}]]}],[{"literal":"options"},{"name":":","args":[[{"name":"curlyBrackets","args":[[{"literal":"on_global"},{"name":":","args":[[{"literal":true}]]}],[{"name":"jscodes"}]]}]]}]]}]]},{"name":";"},{"name":"$"},{"name":"createBlock:","args":[[{"name":"blockSpec"}]]},{"name":"call"},{"name":";"},{"name":"return","args":[[{"name":"jscodes"},{"name":"componentsJoinedByString:","args":[[{"literal":";"}]]}]]}],"paramNames":["body"],"signature":"@@@","type":"block","name":"doCode"},"containerAsValue":true}
//    );
//    
//    id JSONObject = [NSJSONSerialization JSONObjectWithData:[JSONString dataUsingEncoding:NSUTF8StringEncoding] options:kNilOptions error:nil];
//    
//    [[TBWeiwo sharedInstance] _callWithParams:JSONObject];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
