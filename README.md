# OCPatch
[TOC]



A patch solution for Objective-C runtime



热修复框架，需要解决下面三个主要问题

* patch通道
* patch数据协议
* patch运行时



## OCS支持的语法

### (1) 基本语法

#### a. 数据类型 (Data Type)

定义数据类型的rule，如下

整型类型

```properties
integer_encoding = 'char' { return 'c' }
/
'short' { return 's' }
/
'int' { return 'i' }
/
'long' extra:(SPACE 'long') {
  return extra ? 'q' : 'l'
}
/
'unsigned' SPACE encoding:integer_encoding {
  return encoding.toUpperCase()
}
```

> 单测代码，见integer_encoding.pegjs





> type encoding的正确性，参考Tests_typeEncoding的测试代码





#### a. 参数列表

```properties
```





### (2) OC语法



#### a. block

OC的block，如下

```objective-c
```



(2) 



## patch通道



patch通道，主要指patch下发通过哪种方式触达到端上。

OCPatch支持内置2种通道，以及能很方便到适配外部的数据通道。

内置的两种通道分别是：调试通道和业务通道

* 调试通道，就是在开发阶段过程中，自建临时server，OCPatch会自动开启http client去尝试链接这个服务器。
* 业务通道，就是在线上环境，服务端提供一个socket链接url，OCPatch可以连接这个服务器地址。



## patch数据协议



```json
{
  "op": "data",
  "params": {
    "args": [],
    "methodName": "call",
    "target": {},
    "containerAsValue": true,
    "ast": [],
    "noReturn": true,
    "mainQueue": false
  },
  "query": "",
  "name": ""
}
```



name:函数名，可为nil



反序列化

以target的数据为例

```json
{
	"body": [],
	"paramNames": [],
  "signature": "v@",
  "type": "block",
  "name": "setupHomePageDataFunctions"
}
```



**Deserialize Methods**

```objective-c
- (id)deserialize_raw:(NSDictionary *)dict;
- (id)deserialize_object:(NSDictionary *)dict;
- (Class)deserialize_class:(NSDictionary *)dict;
- (Protocol *)deserialize_protocol:(NSDictionary *)dict;
- (NSValue *)deserialize_struct:(NSDictionary *)dict;
- (instancetype)deserialize_weiwo:(NSDictionary *)dict;
- (NSBlock *)deserialize_block:(NSDictionary *)dict;
- (TBWeiwoCFunction *)deserialize_function:(NSDictionary *)dict;
```

支持上面几种数据对象的序列化







```json
{
  "op" : "data",
  "params" : {
    "args" : [

    ],
    "methodName" : "call",
    "target" : {
      "body" : [
        {
          "name" : "once",
          "args" : [
            [
              {
                "name" : "_cmd"
              }
            ],
            [
              {
                "name" : "Weiwo"
              },
              {
                "name" : "declareCFunctions:",
                "args" : [
                  [
                    {
                      "literal" : {
                        "UIImageJPEGRepresentation" : "@@d"
                      }
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
                "name" : "dataFunctions"
              },
              {
                "name" : "weiwo_setSubscript:value:",
                "args" : [
                  [
                    {
                      "literal" : "screenshot"
                    }
                  ],
                  [
                    {
                      "name" : "Weiwo"
                    },
                    {
                      "name" : "createBlock:",
                      "args" : [
                        [
                          {
                            "literal" : {
                              "body" : [
                                {
                                  "name" : "setSlot",
                                  "args" : [
                                    [
                                      {
                                        "literal" : "image"
                                      }
                                    ],
                                    [
                                      {
                                        "name" : "$"
                                      },
                                      {
                                        "name" : "class"
                                      },
                                      {
                                        "name" : "shotView:",
                                        "args" : [
                                          [
                                            {
                                              "name" : "UIApplication"
                                            },
                                            {
                                              "name" : "sharedApplication"
                                            },
                                            {
                                              "name" : "keyWindow"
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
                                  "name" : "setSlot",
                                  "args" : [
                                    [
                                      {
                                        "literal" : "data"
                                      }
                                    ],
                                    [
                                      {
                                        "name" : "UIImageJPEGRepresentation",
                                        "args" : [
                                          [
                                            {
                                              "name" : "image"
                                            }
                                          ],
                                          [
                                            {
                                              "literal" : 0.20000000000000001
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
                                  "name" : "return",
                                  "args" : [
                                    [
                                      {
                                        "name" : "curlyBrackets",
                                        "args" : [
                                          [
                                            {
                                              "literal" : "Data"
                                            },
                                            {
                                              "name" : ":",
                                              "args" : [
                                                [
                                                  {
                                                    "name" : "data"
                                                  }
                                                ]
                                              ]
                                            }
                                          ],
                                          [
                                            {
                                              "literal" : "Content-Type"
                                            },
                                            {
                                              "name" : ":",
                                              "args" : [
                                                [
                                                  {
                                                    "literal" : "image\/jpeg"
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
                              ],
                              "paramNames" : [

                              ],
                              "signature" : "@@",
                              "type" : "block"
                            }
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
                "name" : "dataFunctions"
              },
              {
                "name" : "weiwo_setSubscript:value:",
                "args" : [
                  [
                    {
                      "literal" : "device_info"
                    }
                  ],
                  [
                    {
                      "name" : "Weiwo"
                    },
                    {
                      "name" : "createBlock:",
                      "args" : [
                        [
                          {
                            "literal" : {
                              "body" : [
                                {
                                  "name" : "setSlot",
                                  "args" : [
                                    [
                                      {
                                        "literal" : "bundle"
                                      }
                                    ],
                                    [
                                      {
                                        "name" : "NSBundle"
                                      },
                                      {
                                        "name" : "mainBundle"
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
                                        "literal" : "data"
                                      }
                                    ],
                                    [
                                      {
                                        "name" : "curlyBrackets",
                                        "args" : [
                                          [
                                            {
                                              "literal" : "bundleIdentifier"
                                            },
                                            {
                                              "name" : ":",
                                              "args" : [
                                                [
                                                  {
                                                    "name" : "bundle"
                                                  },
                                                  {
                                                    "name" : "bundleIdentifier"
                                                  }
                                                ]
                                              ]
                                            }
                                          ],
                                          [
                                            {
                                              "literal" : "bundleDisplayName"
                                            },
                                            {
                                              "name" : ":",
                                              "args" : [
                                                [
                                                  {
                                                    "name" : "bundle"
                                                  },
                                                  {
                                                    "name" : "infoDictionary"
                                                  },
                                                  {
                                                    "name" : "weiwo_getSubscript:",
                                                    "args" : [
                                                      [
                                                        {
                                                          "literal" : "CFBundleDisplayName"
                                                        }
                                                      ]
                                                    ]
                                                  },
                                                  {
                                                    "name" : "?:",
                                                    "args" : [
                                                      [
                                                        {
                                                          "name" : "bundle"
                                                        },
                                                        {
                                                          "name" : "infoDictionary"
                                                        },
                                                        {
                                                          "name" : "weiwo_getSubscript:",
                                                          "args" : [
                                                            [
                                                              {
                                                                "literal" : "CFBundleName"
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
                                          ],
                                          [
                                            {
                                              "literal" : "weiwoVersion"
                                            },
                                            {
                                              "name" : ":",
                                              "args" : [
                                                [
                                                  {
                                                    "name" : "$"
                                                  },
                                                  {
                                                    "name" : "version"
                                                  }
                                                ]
                                              ]
                                            }
                                          ],
                                          [
                                            {
                                              "literal" : "platform"
                                            },
                                            {
                                              "name" : ":",
                                              "args" : [
                                                [
                                                  {
                                                    "name" : "$"
                                                  },
                                                  {
                                                    "name" : "platform"
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
                                  "name" : "if",
                                  "args" : [
                                    [
                                      {
                                        "name" : "NSClassFromString",
                                        "args" : [
                                          [
                                            {
                                              "literal" : "BDTrackerSDK"
                                            }
                                          ]
                                        ]
                                      }
                                    ],
                                    [
                                      {
                                        "name" : "data"
                                      },
                                      {
                                        "name" : "weiwo_setSubscript:value:",
                                        "args" : [
                                          [
                                            {
                                              "literal" : "did"
                                            }
                                          ],
                                          [
                                            {
                                              "name" : "BDTrackerSDK"
                                            },
                                            {
                                              "name" : "deviceID"
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
                                  "name" : "return",
                                  "args" : [
                                    [
                                      {
                                        "name" : "curlyBrackets",
                                        "args" : [
                                          [
                                            {
                                              "literal" : "Data"
                                            },
                                            {
                                              "name" : ":",
                                              "args" : [
                                                [
                                                  {
                                                    "name" : "data"
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
                              ],
                              "paramNames" : [

                              ],
                              "signature" : "@@",
                              "type" : "block"
                            }
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
      ],
      "paramNames" : [

      ],
      "signature" : "v@",
      "type" : "block",
      "name" : "setupHomePageDataFunctions"
    },
    "containerAsValue" : true
  }
}
```









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



## AppImperator2



npm install --legacy-peer-deps

https://stackoverflow.com/questions/64936044/fix-the-upstream-dependency-conflict-installing-npm-packages





