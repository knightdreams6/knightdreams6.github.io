---
title: kubectl常用命令
date: 2024-06-18
tags:
  - k8s
---



### 查看资源列表

##### 1.查看所有命名空间中的 Pod

```shell
kubectl get pods --all-namespaces
```

##### 2.查看指定命名空间中的所有资源

```shell
kubectl get pods -n <namespace>
```

##### 3.查看节点信息

```shell
kubectl get nodes
```



### 查看和管理单个资源

##### 1.查看单个 Pod 的详细信息

```shell
kubectl describe pod <pod-name> -n <namespace>
```

##### 2.查看单个 Deployment 的详细信息

```shell
kubectl describe deployment <deployment-name> -n <namespace>
```

##### 3.查看单个 Service 的详细信息

```shell
kubectl describe service <service-name> -n <namespace>
```



### 日志调试

##### 1.查看 Pod 的实时日志

```shell
kubectl logs -f <pod-name> -n <namespace>
```

##### 2.查看 Pod 的日志（带时间戳）

```shell
kubectl logs --timestamps <pod-name> -n <namespace>
```

##### 3.查看 Pod 的前 N 行日志

```shell
kubectl logs --tail=<number> <pod-name> -n <namespace>
```



### 执行操作

##### 1.执行进入 Pod 的 shell

```shell
kubectl exec -it <pod-name> -n <namespace> -- /bin/sh
```

##### 2.执行在 Pod 内部运行的命令

```shell
kubectl exec -it <pod-name> -n <namespace> -- <command>
```

##### 3.执行在 Deployment 中滚动更新

```shell
kubectl rollout restart deployment <deployment-name> -n <namespace>
```



### 删除资源

##### 1.删除 Pod

```shell
kubectl delete pod <pod-name> -n <namespace>
```

##### 2.删除 Deployment

```shell
kubectl delete deployment <deployment-name> -n <namespace>
```

##### 3.删除 Service

```shell
kubectl delete service <service-name> -n <namespace>
```



### 扩展和缩减

##### 1.扩展 Deployment 的副本数量

```shell
kubectl scale deployment <deployment-name> --replicas=<number> -n <namespace>
```

##### 2.缩减 Deployment 的副本数量

```shell
kubectl scale deployment <deployment-name> --replicas=0 -n <namespace>
```



### 配置和更新

##### 1.应用配置文件

```shell
kubectl apply -f <filename>.yaml
```

##### 2.更新 Deployment 的镜像版本

```shell
kubectl set image deployment/<deployment-name> <container-name>=<image-name>:<tag> -n <namespace>
```



### 部署

##### 1.查看历史部署版本

```shell
kubectl rollout history deployment <deployment-name> -n <namespace>
```

##### 2.回滚到指定版本

```shell
kubectl rollout undo deployment <deployment-name> -n <namespace> --to-revision=<version>
```