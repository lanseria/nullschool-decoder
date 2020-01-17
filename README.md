# nullSchool Decoder

## DOCKER pgsql 使用说明

### 启动

```bash
docker-compose up -d
```

如果要强制 `Compose` 停止并重新创建所有容器，请使用该 `--force-recreate` 标志。

## 结束

```bash
docker-compose down
```

默认情况下，唯一删除的内容是：

`Compose` 文件中定义的服务的容器
`networks` 在 `Compose` 文件部分中定义的网络
默认网络（如果使用）
定义为的网络和卷 `external` 永远不会被删除。
