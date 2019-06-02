// 需求：修改一波配置，使线上资源可以访问。还需处理favicon的访问问题，目前还访问不到
const Database = require("./server/database");

// 链接数据库
const db = new Database();
db.connect();

// 启动server
const startServer = require("./server");
startServer();

// start crawler
const startCrawler = require("./server/crawler");
// startCrawler();
