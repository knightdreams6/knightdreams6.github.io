---
title: oauth2
date: 2021-12-30 20:46:13
tags:
  - oauth2
  - protocol
---

文档地址：http://www.rfcreader.com/#rfc6749

#### 1、介绍

在传统的客户端-服务器身份验证模型中，客户端通过使用资源所有者的凭据向服务器进行身份验证来请求服务器上的访问受限资源（受保护资源）。为了向第三方应用程序提供受限资源的访问，资源所有者与第三方共享其凭据。这会产生几个问题和限制：

* 第三方应用程序需要存储资源所有者的凭据以备将来使用，通常是明文密码。
* 服务器需要支持密码认证，尽管密码存在固有的安全弱点
* 第三方应用程序获得对资源所有者受保护资源的过于广泛的访问，使资源所有者无法限制持续时间或访问有限的资源子集
* 资源所有者不能在不撤销对所有第三方的访问权限的情况下撤销对单个第三方的访问权限，并且必须通过更改第三方密码来实现
* 任何第三方应用程序的泄露都会导致最终用户的密码和受改密码保护的所有数据泄露。
  * OAuth通过引入授权层将客户端的角色与资源所有者的角色分开来解决这些问题。
  * 在OAuth中，客户端请求访问由资源所有者控制并由资源服务器托管的资源，并获得一组与资源所有者不同的凭据。客户端不是使用资源所有者的凭据来访问受保护的资源，而是获取访问令牌（一个表示特定范围、生命周期和其它访问数据的字符串）。
  * 访问令牌由授权服务器在资源所有者的批准下颁发给第三方客户端。客户端使用访问令牌访问由资源服务器托管的受保护资源。例如最终用户（资源所有者）可以授予打印服务（客户端）访问存储在照片共享服务（资源服务器）中的受保护照片的权限，而无需与打印服务共享他她的用户名和密码。相反，她直接向照片共享服务（授权服务器）信任的服务器进行身份认证，该服务器颁发打印服务委托特定的凭据（访问令牌）。该规范用于HTTP，在HTTP以外的任何协议上使用OAuth都超出了范围

##### 1.1 角色

OAuth 定义了四个角色：

* 资源所有者：能够授予对受保护资源的访问权限的实体。当资源所有者是个人时，它被称为最终用户。
* 资源服务器：托管受保护资源的服务器，能够使用访问令牌接受和响应受保护资源请求。
* 客户端：代表经资源所有者授权发出受保护资源请求的应用程序。术语“客户端”并不意味着任何特定的实现特征（例如，应用程序是否在服务器、桌面或其他设备上执行）。
* 授权服务器：在成功验证资源所有者并获得授权后，向客户端颁发访问令牌的服务器。授权服务器和资源服务器之间的交互超出了本规范的范围。授权服务器可以是与资源服务器相同的服务器，也可以是单独的实体。单个授权服务器可以发布多个资源服务器接受的访问令牌。



##### 1.2 协议流程

```
  +--------+                               +---------------+
     |        |--(A)- Authorization Request ->|   Resource    |
     |        |                               |     Owner     |
     |        |<-(B)-- Authorization Grant ---|               |
     |        |                               +---------------+
     |        |
     |        |                               +---------------+
     |        |--(C)-- Authorization Grant -->| Authorization |
     | Client |                               |     Server    |
     |        |<-(D)----- Access Token -------|               |
     |        |                               +---------------+
     |        |
     |        |                               +---------------+
     |        |--(E)----- Access Token ------>|    Resource   |
     |        |                               |     Server    |
     |        |<-(F)--- Protected Resource ---|               |
     +--------+                               +---------------+
```

图中描述了四个角色之间的交互，包括以下步骤

1. 客户端向资源所有者请求授权，这可以直接向资源所有者提出授权请求，或最好通过授权间接服务器作为中介
2. 客户端收到授权许可，这是一个代表资源所有者授权的凭证，使用本文件中定义的四种授权类型之一表示规范或使用扩展授权类型。这授权授予类型取决于所使用的方法客户端请求授权和支持的类型授权服务器
3. 客户端通过身份验证请求访问令牌授权服务器并提供授权许可
4. 授权服务器对客户端进行认证并验证授权许可，如果有效，则颁发访问令牌
5. 客户端从资源中请求受保护的资源服务器并通过提供访问令牌进行身份验证
6. 资源服务器验证访问令牌，如果有效，服务于请求



##### 1.3 授权许可 Authorization Grant

授权许可是代表资源的凭证所有者使用的授权（访问其受保护的资源）客户端获取访问令牌。该规范定义了四个授权类型 --- authorization code， implicit， resource owner password credentials 和 client credentials -- 以及可扩展性定义其它类型的机制



###### 1.3.1 授权码 Authorization code

授权码通过授权服务器获取，作为客户端和资源所有者之间的中介。代替直接从资源所有者、客户端请求授权将资源所有者定向到授权服务器，它反过来指导资源所有者将授权码返回客户端。

在资源所有者引导客户端之前授权码，授权服务器对资源所有者并获得授权。因为资源所有者仅与授权服务器进行身份验证，资源所有者的凭据永远不会与客户端共享。

授权码提供了一些重要的安全优势，例如验证客户端的能力，以及将访问令牌直接传输到客户端，无需通过资源所有者的用户代理传递它，并可能将其暴露给其他人，包括资源所有者。



###### 1.3.2 隐式  Implicit

隐式授权是经过优化的简化授权码流程，对于使用脚本语言在浏览器中实现的客户端，例如作为 JavaScript. 在隐式流中，而不是发出客户端一个授权码，客户端直接获得一个访问令牌。

（作为资源所有者授权的结果）。资助类型是隐式的，因为没有中间凭证（例如授权代码）被发布（随后用于获取访问令牌）。

在隐式授权流程中发布访问令牌时，授权服务器不对客户端进行身份验证。在一些在这种情况下，可以通过重定向 URI 验证客户端身份用于将访问令牌传递给客户端。访问令牌可能向资源所有者或其他有权访问的应用程序公开资源所有者的用户代理。

隐式授权提高了一些人的反应能力和效率客户端（例如作为浏览器内应用程序实现的客户端），因为它减少了获得所需的往返次数访问领了。但是，应该权衡这种便利使用隐式授权的安全影响。



###### 1.3.3 资源所有者密码凭证 Resource Owner Password Credentials

资源所有者密码凭证（即用户名和密码）可以直接用作授权许可来获得访问权限令牌。凭证应该只在有高资源所有者和客户之间的信任程度（例如，客户端是设备操作系统的一部分或具有高特权应用程序），并且当其他授权授予类型不是可用（例如授权码）

即使这种授权类型需要客户端直接访问资源所有者凭证，使用资源所有者凭据用于单个请求并交换访问令牌。这授予类型可以消除客户端存储供将来使用的资源所有者凭据，通过交换具有长期访问令牌或刷新令牌的凭据



###### 1.3.4 客户端凭证 Client Credentials

客户端凭据（或其他形式的客户端身份验证）可以当授权范围为仅限于客户端控制下的受保护资源或先前经授权安排的受保护资源服务器。客户端凭据用作权限授权，通常是客户代表自己行事时（客户也就是资源所有者）或正在请求访问受保护的资源局域事先安排的授权服务器



##### 1.4 Access Token

访问令牌时用于访问受保护资源的凭据。一个访问令牌是一个字符串，表示颁发给客户。该字符串通常对客户端不透明。tokens代表访问的特定范围和持续时间，由资源所有者、资源服务器、授权服务器强制执行并授权

令牌可以表示用于检索授权的标识符信息或可以自包含授权信息在一个可验证的方式（即，由一些数据和一个签名）。额外的身份认证凭据，超出了本规范的范围，可能需要为了客户端使用令牌

访问令牌提供了一个抽象层，取代了不同的具有单个授权结构（例如，用户名和密码）资源服务器理解的令牌。这种抽象使颁发比授权授予更严格的访问令牌用于获取它们，以及消除资源服务器的需要了解广泛的身份验证方法。

访问令牌可以有不同的格式、结构和方法基于资源利用率（例如，加密属性）服务器安全要求。访问令牌属性和
用于访问受保护资源的方法超出了范围



##### 1.5 Refresh Token

刷新令牌是用于获取访问令牌的凭据。刷新令牌由授权服务器颁发给客户端，并且用于在当前访问令牌变得无效或过期时获取新的访问令牌，或获取额外的具有相同或更窄的范围（访问令牌可能比资源授权有更短的生命周期和权限）访问令牌。发布刷新令牌时可选的，由授权服务器配置，如果授权服务器发布刷新令牌，与访问令牌一起下发。

刷新令牌是一个字符串，表示授予给资源所有者的客户端。字符串通常是不透明的客户端。令牌表示用于检索的标识符

授权信息。与访问令牌不同，刷新令牌仅用于授权服务器，从不发送到资源服务器

```
  +--------+                                           +---------------+
  |        |--(A)------- Authorization Grant --------->|               |
  |        |                                           |               |
  |        |<-(B)----------- Access Token -------------|               |
  |        |               & Refresh Token             |               |
  |        |                                           |               |
  |        |                            +----------+   |               |
  |        |--(C)---- Access Token ---->|          |   |               |
  |        |                            |          |   |               |
  |        |<-(D)- Protected Resource --| Resource |   | Authorization |
  | Client |                            |  Server  |   |     Server    |
  |        |--(E)---- Access Token ---->|          |   |               |
  |        |                            |          |   |               |
  |        |<-(F)- Invalid Token Error -|          |   |               |
  |        |                            +----------+   |               |
  |        |                                           |               |
  |        |--(G)----------- Refresh Token ----------->|               |
  |        |                                           |               |
  |        |<-(H)----------- Access Token -------------|               |
  +--------+           & Optional Refresh Token        +---------------+
```

刷新访问令牌步骤

1. 客户端通过身份认证请求访问令牌授权服务器并提供授权许可
2. 授权服务器对客户端进行身份验证并验证授权许可，如果有效，则颁发访问令牌
3. 客户端通过访问令牌向资源发出受保护的资源请求
4. 资源服务器验证访问令牌，如果有效则服务于请求
5. 重复3、4步，直到访问令牌过期。如果客户端直到访问令牌已过期，它跳到步骤7，否则，它会发出另一个受保护资源请求
6. 由于访问令牌无效，资源服务器返回无效的令牌错误
7. 客户端通过身份验证向授权服务器请求一个新的访问令牌。客户端身份验证要求客户端类型在授权服务器的策略中
8. 授权服务器对客户端进行认证并验证刷新令牌，如果有效，则发出一个新的访问令牌（和可选的，一个新的刷新令牌）

> 步骤 3、4、5、6 不在该规范中
