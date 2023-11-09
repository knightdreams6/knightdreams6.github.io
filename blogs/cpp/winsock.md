---
title: winSocketServer
date: 2023-09-01 14:47
tags:
  - cpp
---



> windows平台 socket server



##### winSocketServer.h

```c
//
// Created by knight on 2023/9/1.
//

#pragma once

class WinSocket {
public:
    WinSocket();
    ~WinSocket();

    bool Start(int port);
    void Stop() const;
    [[nodiscard]] SOCKET Accept() const;

private:
    SOCKET serverSocket;

    static bool Initialize();
    static void Cleanup();
};
```



##### winSocketServer.cpp

```cpp
//
// Created by knight on 2023/9/1.
//

#include <winsock.h>
#include <iostream>
#include "winSocketServer.h"

WinSocket::WinSocket(): serverSocket(INVALID_SOCKET) {};

WinSocket::~WinSocket() {
    Stop();
}

bool WinSocket::Start(int port) {
    if (!Initialize()) {
        std::cout << "Failed to initialize winsock" << std::endl;
        return false;
    }

    serverSocket = socket(AF_INET, SOCK_STREAM, 0);
    if (serverSocket == INVALID_SOCKET) {
        std::cout << "Failed to create socket" << std::endl;
        Cleanup();
        return false;
    }

    // 设置 Socket 地址信息
    sockaddr_in serverAddr{};
    serverAddr.sin_family = AF_INET;
    serverAddr.sin_port = htons(port);
    serverAddr.sin_addr.s_addr = INADDR_ANY;

    if (bind(serverSocket, (struct sockaddr*)&serverAddr, sizeof(serverAddr)) == SOCKET_ERROR) {
        std::cout << "Failed to bind socket" << std::endl;
        Cleanup();
        return false;
    }

    if (listen(serverSocket, SOMAXCONN) == SOCKET_ERROR) {
        std::cout << "Failed to listen" << std::endl;
        Cleanup();
        return false;
    }

    std::cout << "Server started, waiting for client connections..." << std::endl;
    return true;
}

void WinSocket::Stop() const {
    closesocket(serverSocket);
    Cleanup();
}

bool WinSocket::Initialize() {
    WSADATA wsaData;
    return WSAStartup(MAKEWORD(2, 2), &wsaData) == 0;
}

void WinSocket::Cleanup() {
    WSACleanup();
}

SOCKET WinSocket::Accept() const {
    SOCKET clientSocket = accept(serverSocket, nullptr, nullptr);
    if (clientSocket == INVALID_SOCKET) {
        return INVALID_SOCKET;
    }
    return clientSocket;
}

```



##### main

```cpp
int main() {
    // 初始化serverSocket
    bool startSocketFlag = winSocket.Start(端口号);
    if (!startSocketFlag) {
        return 1;
    }
    
	while (true) {
        SOCKET clientSocket = winSocket.Accept();
        if (clientSocket == INVALID_SOCKET) {
            continue;
        }

        // todo 处理与客户端的数据交互

        closesocket(clientSocket);
    }
}
```



##### 如何对tcp链接身份进行认证？

```cpp
/**
 * 身份认证信息读取
 * @param clientSocket
 * @return 身份认证信息字符串标识
 */
std::string identity(SOCKET clientSocket) {
    char identityBuffer[10];
    memset(identityBuffer, 0, sizeof(identityBuffer));
    recv(clientSocket, identityBuffer, sizeof(identityBuffer) - 1, 0);
    std::string identityStr(identityBuffer);
    return identityStr;
}
```



##### 如何处理tcp粘包？

> 规定每包的长度与头尾

```cpp
const int PACKET_LENGTH = 2407;
const char PACKET_START[] = {0x4d, 0x45, 0x50};
const char PACKET_END[] = {0x53, 0x4C, 0x44};

void packet(int clientSocket) {
     std::vector<char> buffer(PACKET_LENGTH);
     std::vector<char> receivedData;
     int dataSize = 0;
    
     while (true) {
        int bytesRead = recv(clientSocket, buffer.data(), PACKET_LENGTH, 0);
        if (bytesRead <= 0) {
            break;
        }
        // 追加接收到的数据到 receivedData
        receivedData.insert(receivedData.end(), buffer.begin(), buffer.begin() + bytesRead);
        dataSize += bytesRead;
        // 查找完整的包
        int headerIndex;  // 头部索引，用于记录找到的包的起始位置
        int packetSize;  // 包大小，用于记录找到的包的长度
        // // 如果数据大小比包长度小则继续接收
        if (dataSize < PACKET_LENGTH) {
            continue;
        }
        // 查找完整的包
        for (int i = 0; i < dataSize - PACKET_LENGTH; ++i) {
            if (receivedData[i] == PACKET_START[0] && receivedData[i + 1] == PACKET_START[1] &&
                receivedData[i + 2] == PACKET_START[2]) {
                // 找到了包起始位置
                headerIndex = i;
                packetSize = i + PACKET_LENGTH;

                // 在剩余数据中查找结束标记
                for (int j = packetSize; j <= dataSize - PACKET_LENGTH; ++j) {
                    if (receivedData[j] == PACKET_END[0] && receivedData[j + 1] == PACKET_END[1] &&
                        receivedData[j + 2] == PACKET_END[2]) {
                        // 找到了包的结束标记
                        packetSize = j + PACKET_LENGTH;
                        break;
                    }
                }

                // 处理完整的包
                if (packetSize - headerIndex == PACKET_LENGTH) {
                    
                    // todo 处理接收到的包数据
                    
                    // 更新接收到的数据和数据大小
                    receivedData.erase(receivedData.begin(), receivedData.begin() + packetSize);
                    dataSize = static_cast<int>(receivedData.size());
					
                    // 如果处理完数据比包长度小则结束该循环
                    if (dataSize < PACKET_LENGTH) {
                        break;
                    }

                    // 重新检查剩余数据中是否存在完整的包
                    i = -1;
                }
            }
        }
     }
}

```

