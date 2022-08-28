# 表结构说明

## so_config --- 配置信息表
```sql
CREATE TABLE `so_config` (
	`id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
	`key` CHAR(20) NULL DEFAULT NULL COMMENT '关键字' COLLATE 'utf8_bin',
	`value` CHAR(50) NULL DEFAULT NULL COMMENT '值' COLLATE 'utf8_bin',
	`name` VARCHAR(255) NULL DEFAULT NULL COMMENT '名称' COLLATE 'utf8_bin',
	`group` CHAR(20) NULL DEFAULT NULL COMMENT '分组' COLLATE 'utf8_bin',
	`isMust` INT(11) NULL DEFAULT NULL COMMENT '是否必须，必须则不可删除',
	`about` VARCHAR(255) NULL DEFAULT NULL COMMENT '更多说明' COLLATE 'utf8_bin',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8_bin'
ENGINE=InnoDB
AUTO_INCREMENT=5
;
```

## so_all_content --- 网站主要内容表：文章、课程等的概要信息
```sql
CREATE TABLE `so_all_content` (
	`id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '自增id',
	`title` VARCHAR(100) NULL DEFAULT NULL COMMENT '标题' COLLATE 'utf8_bin',
	`content` VARCHAR(255) NULL DEFAULT NULL COMMENT '内容' COLLATE 'utf8_bin',
	`author` CHAR(20) NULL DEFAULT NULL COMMENT '作者' COLLATE 'utf8_bin',
	`readTimes` INT(11) NULL DEFAULT NULL COMMENT '阅读/观看次数',
	`discussTimes` INT(11) NULL DEFAULT NULL COMMENT '评论次数',
	`type` CHAR(10) NULL DEFAULT NULL COMMENT '类型' COLLATE 'utf8_bin',
	`createdTime` DATETIME NULL DEFAULT NULL COMMENT '创建时间',
	`updateTime` DATETIME NULL DEFAULT NULL COMMENT '更新时间',
	`deletedTime` DATETIME NULL DEFAULT NULL COMMENT '删除时间',
	`status` INT(11) NULL DEFAULT NULL COMMENT '状态',
	`extrai` VARCHAR(10) NULL DEFAULT NULL COMMENT '一级分类' COLLATE 'utf8_bin',
	`extraii` VARCHAR(255) NULL DEFAULT NULL COMMENT '地址' COLLATE 'utf8_bin',
	`extraiii` VARCHAR(10) NULL DEFAULT NULL COMMENT '备用' COLLATE 'utf8_bin',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8_bin'
ENGINE=InnoDB
AUTO_INCREMENT=16
;
```

### so_article --- 文章内容
```sql
CREATE TABLE `so_article` (
	`id` INT(11) NOT NULL AUTO_INCREMENT, COMMENT '自增id',
	`article_id` INT(11) NOT NULL COMMENT '文章id',
	`article` LONGTEXT NULL DEFAULT NULL COMMENT '内容' COLLATE 'utf8_bin',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8_bin'
ENGINE=InnoDB
AUTO_INCREMENT=19
;
```

## so_video_chapter --- 课程视频数据
```sql
CREATE TABLE `so_video_chapter` (
	`id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
	`videoId` INT(11) NULL DEFAULT NULL COMMENT '视频ID',
	`part` INT(11) NULL DEFAULT NULL COMMENT '视频分卷',
	`partName` VARCHAR(20) NULL DEFAULT NULL COMMENT '卷名' COLLATE 'utf8_bin',
	`chapter` INT(11) NULL DEFAULT NULL COMMENT '视频分节',
	`chapterName` VARCHAR(30) NULL DEFAULT NULL COMMENT '节名' COLLATE 'utf8_bin',
	`linkUrl` VARCHAR(255) NULL DEFAULT NULL COMMENT 'url地址' COLLATE 'utf8_bin',
	`extrai` VARCHAR(20) NULL DEFAULT NULL COMMENT '备用一' COLLATE 'utf8_bin',
	`extraii` VARCHAR(20) NULL DEFAULT NULL COMMENT '备用二' COLLATE 'utf8_bin',
	`extraiii` VARCHAR(20) NULL DEFAULT NULL COMMENT '备用三' COLLATE 'utf8_bin',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8_bin'
ENGINE=InnoDB
AUTO_INCREMENT=14
;
```