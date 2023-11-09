---
title: python搭建Minio图床
date: 2021-07-14 15:39:06
tags:
  - python
---

#### minioUpload.py

```python

import os
import time
import uuid
import sys
from minio import Minio
from minio.error import MinioException
import warnings
import urllib.request

warnings.filterwarnings('ignore')
images = sys.argv[1:]
# Minio url
minioHost = "修改为你的minio地址"
# 桶名称
bucketName = "blog"
# 桶地址
imageBucket = "http://" + minioHost + "/" + bucketName + "/"
# 桶内分组
name = ''
# 当前日期
date = time.strftime("%Y%m", time.localtime())
# 最终链接地址前缀
finalUrlPreSuffix = imageBucket + name + "/" + date + "/"
# 临时路径
tempPath = os.getcwd() + "/temp/"

# secure为True的话第一项会填充为https://
minioClient = Minio(minioHost,
                    access_key='minioadmin', secret_key='minioadmin', secure=False)
result = "Upload Success:\n"


# 下载网络图片到本地
def download(image_url):
    local_path = tempPath + image_url.split('/')[-1]
    urllib.request.urlretrieve(image_url, local_path)
    return local_path


# 　循环上传文件
for image in images:
    if os.path.isfile(image):
        file_type = os.path.splitext(image)[-1]
        new_file_name = str(uuid.uuid1()).replace('-', '') + file_type
    # 处理网络图片
    elif image.startswith("https://") or image.startswith("http://"):
        if image.endswith(".png") or image.endswith(".jpg") or image.endswith(".jpeg") or image.endswith(".gif"):
            url = image.split("/")
            if len(url) > 1:
                # 先把网图下载到本地
                image = download(image)
                new_file_name = url[-1]
            else:
                result = result + "error: file path is invalid!"
                continue
        else:
            result = result + "error: script code supports .png .jpg .jpeg .gif files!"
            continue
    else:
        result = result + "error: image is not a file and does not start with https or http!"
        continue
    try:
        minioClient.fput_object(bucket_name=bucketName, object_name=name + "/" + date + "/" + new_file_name,
                                file_path=image)
        if image.__contains__(tempPath):
            # 删除临时图片
            os.remove(image)
        result = result + finalUrlPreSuffix + new_file_name + "\n"
    except MinioException as err:
        result = result + "error: minio upload exception \n"

print(result)
```

