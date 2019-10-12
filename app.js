const startApp = async () => {
  // 链接数据库
  const dbInstance = require('./server/database')
  await dbInstance.connect()

  // 打开集群
  /* const cluster = require('cluster')
  const numCPUs = require('os').cpus().length
  const startCluster = () => {
    if (cluster.isMaster) {
      console.log(`主进程 ${process.pid} 正在运行`)
  
      // 衍生工作进程
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
      }
  
      cluster.on('exit', (worker, code, signal) => {
        console.log(`工作进程 ${worker.process.pid} 已退出`)
      })
    } else {
      // 启动server
      const startServer = require('./server')
      startServer()
      console.log(`工作进程 ${process.pid} 已启动`)
    }
  }
  startCluster() */

  // 启动server
  const startServer = require('./server')
  await startServer()

  // start crawler
  require('./server/crawler')
}

startApp()
