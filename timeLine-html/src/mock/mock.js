import Mock from 'mockjs';

// 配置拦截 ajax 的请求时的行为，支持的配置项目有 timeout。
Mock.setup({
  timeout: '200 - 400'
});

// Mock.mock( url, post/get , 返回的数据)；
// 每次返回两条数据
Mock.mock(RegExp('/api/*'), 'get', function () {
  return Mock.mock({
    'data|2': [
      {
        name: 'user',
        issuedTime: (new Date().getTime() - (Math.random() * 100000000).toFixed(0)),
        description: '@string(20)',
        pic: 'https://testing-timeline.oss-cn-shanghai.aliyuncs.com/1.png'
      }
    ]
  });
}); // 初始化获取数据
