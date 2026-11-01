const fs = require('node:fs');
const path = require('node:path');
const jsonServer = require('json-server');

const root = path.resolve(__dirname, '..');
const database = path.join(root, 'db.json');
// 다음 ZIP을 덮어써도 이미 저장한 문의가 유지되도록 최초 실행에만 복사합니다.
if (!fs.existsSync(database))
  fs.copyFileSync(path.join(root, 'db.seed.json'), database, fs.constants.COPYFILE_EXCL);

const server = jsonServer.create();
server.use(jsonServer.defaults());
server.use(jsonServer.bodyParser);
server.use(jsonServer.router(database));
server
  .listen(3001, '127.0.0.1', () => {
    console.log('ZERO100 JSON Server: http://127.0.0.1:3001');
  })
  .on('error', (error) => {
    console.error(
      error.code === 'EADDRINUSE'
        ? '3001 포트가 사용 중입니다. 이전 개발 서버를 종료해 주세요.'
        : error.message,
    );
    process.exitCode = 1;
  });
