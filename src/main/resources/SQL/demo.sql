/*
Navicat MySQL Data Transfer

Source Server         : 本机数据库
Source Server Version : 50610
Source Host           : localhost:3306
Source Database       : demo

Target Server Type    : MYSQL
Target Server Version : 50610
File Encoding         : 65001

Date: 2018-06-10 17:33:40
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for my_table
-- ----------------------------
DROP TABLE IF EXISTS `my_table`;
CREATE TABLE `my_table` (
  `id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for t_u_account
-- ----------------------------
DROP TABLE IF EXISTS `t_u_account`;
CREATE TABLE `t_u_account` (
  `id` int(11) NOT NULL,
  `name` varchar(32) CHARACTER SET utf8 NOT NULL,
  `psw` varchar(32) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for t_u_node
-- ----------------------------
DROP TABLE IF EXISTS `t_u_node`;
CREATE TABLE `t_u_node` (
  `id` int(11) NOT NULL COMMENT '主键',
  `parent` int(11) NOT NULL DEFAULT '0' COMMENT '传承',
  `name` varchar(16) NOT NULL COMMENT '名',
  `info` varchar(255) DEFAULT NULL COMMENT '个人信息',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_u_root
-- ----------------------------
DROP TABLE IF EXISTS `t_u_root`;
CREATE TABLE `t_u_root` (
  `id` int(11) NOT NULL,
  `xu` int(11) NOT NULL DEFAULT '0' COMMENT '序 id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_u_xu
-- ----------------------------
DROP TABLE IF EXISTS `t_u_xu`;
CREATE TABLE `t_u_xu` (
  `id` int(11) NOT NULL,
  `xu` varchar(8) CHARACTER SET utf8 NOT NULL COMMENT '序名'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL DEFAULT '',
  `address` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
