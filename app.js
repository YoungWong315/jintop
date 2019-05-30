const Database = require("./database");

// 需求：修改一波配置，使线上资源可以访问。还需处理favicon的访问问题，目前还访问不到

// 链接数据库
const db = new Database();
db.connect();

// 启动server
require("./server");
