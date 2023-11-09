---
title: c++加载dll
date: 2023-09-01 11:51:00
tags:
  - cpp
---



> 假定给定的dll(func.dll)中存在以下函数，dll放置当前执行程序所在目录
>
> `int Func(double *, int, double *, int, bool)`



##### func.h

```c
//
// Created by knight on 2023/9/1.
//

#pragma once

#include <string>

typedef int (*Func)(double *, int, double *, int, bool);

class DllLoader {
public:
    DllLoader();
    ~DllLoader();

    bool loadDll();
    [[nodiscard]] Func getFunc() const;

private:
    Func func;
};
```



##### func.cpp

```cpp
//
// Created by knight on 2023/9/1.
//

#include "func.h"

#include <iostream>
#include <stdexcept>
#include <Windows.h>

HINSTANCE hDLL;

DllLoader::DllLoader() : func(nullptr) {}

DllLoader::~DllLoader() {
    // 在析构函数中释放 DLL
    if (hDLL != nullptr) {
        FreeLibrary(hDLL);
    }
}

bool DllLoader::loadDll() {
    try {
        std::string exePath(MAX_PATH + 1, '\0');
        DWORD result = GetModuleFileName(nullptr, &exePath[0], exePath.size());
        if (result == 0) {
            throw std::runtime_error("Failed to get the path of the executable.");
        }
        exePath.resize(result);

        std::string dllPath = exePath.substr(0, exePath.find_last_of("\\/") + 1) + "func.dll";

        hDLL = LoadLibrary(dllPath.c_str());
        if (hDLL == nullptr) {
            throw std::runtime_error("Failed to load the DLL.");
        }

        func = (Func)GetProcAddress(hDLL, "Func");
        if (func == nullptr) {
            throw std::runtime_error("Failed to load the Func.");
        }
    } catch (const std::exception& e) {
        std::cout << "Error: " << e.what() << std::endl;
        return false;
    }
    return true;
}

Func DllLoader::getFunc() const {
    return func;
}

```

