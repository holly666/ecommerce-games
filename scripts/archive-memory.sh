#!/bin/bash
# 记忆归档脚本
# 将超过30天的旧记忆文件压缩归档

MEMORY_DIR="/Users/holly/.openclaw/workspace/memory"
ARCHIVE_DIR="$MEMORY_DIR/archive"
DAYS=30

# 创建归档目录
mkdir -p "$ARCHIVE_DIR"

# 找出超过30天的 .md 文件（排除主题文件）
find "$MEMORY_DIR" -name "*.md" -mtime +$DAYS ! -name "备孕.md" ! -name "投资.md" ! -name "教学.md" ! -name "健康.md" ! -name "MEMORY.md" | while read file; do
    filename=$(basename "$file" .md)
    # 压缩为 tar.gz
    tar -czf "$ARCHIVE_DIR/${filename}.tar.gz" -C "$MEMORY_DIR" "$filename.md" 2>/dev/null
    # 删除原文件
    rm -f "$file"
    echo "归档: $filename.md -> ${filename}.tar.gz"
done

echo "归档完成！"
ls -la "$ARCHIVE_DIR"
