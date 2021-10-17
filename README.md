# IOPatch
A patch solution for Objective-C runtime



笔记

* 解决super方法调用

直接调用C函数：objc_msgSendSuper



测试hook代码

```objective-c
@hook Demo1ViewController
- (void)viewDidLoad  {
    [super viewDidLoad];
    self.view.backgroundColor = [UIColor whiteColor];
}
@end
```



```objective-c
[UIApplication sharedApplication];
```







```json
{
  "args" : [
    [
      {
        "type" : "raw",
        "value" : {
          "name" : "UIApplication"
        }
      },
      {
        "type" : "raw",
        "value" : {
          "name" : "sharedApplication"
        }
      }
    ]
  ],
  "methodName" : "call",
  "target" : {
    "body" : [
      {
        "name" : "setSlot",
        "args" : [
          [
            {
              "literal" : "jscodes"
            }
          ],
          [
            {
              "name" : "squareBrackets"
            }
          ]
        ]
      },
      {
        "name" : ";"
      },
      {
        "name" : "setSlot",
        "args" : [
          [
            {
              "literal" : "blockSpec"
            }
          ],
          [
            {
              "name" : "curlyBrackets",
              "args" : [
                [
                  {
                    "literal" : "body"
                  },
                  {
                    "name" : ":",
                    "args" : [
                      [
                        {
                          "name" : "body"
                        }
                      ]
                    ]
                  }
                ],
                [
                  {
                    "literal" : "signature"
                  },
                  {
                    "name" : ":",
                    "args" : [
                      [
                        {
                          "literal" : "v@"
                        }
                      ]
                    ]
                  }
                ],
                [
                  {
                    "literal" : "options"
                  },
                  {
                    "name" : ":",
                    "args" : [
                      [
                        {
                          "name" : "curlyBrackets",
                          "args" : [
                            [
                              {
                                "literal" : "on_global"
                              },
                              {
                                "name" : ":",
                                "args" : [
                                  [
                                    {
                                      "literal" : true
                                    }
                                  ]
                                ]
                              }
                            ],
                            [
                              {
                                "name" : "jscodes"
                              }
                            ]
                          ]
                        }
                      ]
                    ]
                  }
                ]
              ]
            }
          ]
        ]
      },
      {
        "name" : ";"
      },
      {
        "name" : "$"
      },
      {
        "name" : "createBlock:",
        "args" : [
          [
            {
              "name" : "blockSpec"
            }
          ]
        ]
      },
      {
        "name" : "call"
      },
      {
        "name" : ";"
      },
      {
        "name" : "return",
        "args" : [
          [
            {
              "name" : "jscodes"
            },
            {
              "name" : "componentsJoinedByString:",
              "args" : [
                [
                  {
                    "literal" : ";"
                  }
                ]
              ]
            }
          ]
        ]
      }
    ],
    "paramNames" : [
      "body"
    ],
    "signature" : "@@@",
    "type" : "block",
    "name" : "doCode"
  },
  "containerAsValue" : true
}
```







最外面这一层的作用是？？？

```json
{
  "args": [
    [
      "type": "raw",
      "value": {},
    	"args": []
    ]
  ],
  "methodName": "call",
  "target": {
    "body": {},
    "paramNames": [],
    "signature": "@@@",
    "type": "block",
    "name": "doCode"
  },
  "containerAsValue": true
}

```



body

```
setSlot.jsCode[];
setSlot.blockSpec{}

```







blockSpec

```json
{
  "signature": "v@或者@@",
  "body": [
  	
  ],
  "name": "方法类型，非nil为方法，nil为block",
  "paramNames": [
  
  ],
  "options": {
    "on_global": true,
    "jscodes": [
      
    ]
  },
  "type": "block"
}
```



