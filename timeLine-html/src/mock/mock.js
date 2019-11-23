import Mock from 'mockjs';

// 配置拦截 ajax 的请求时的行为，支持的配置项目有 timeout。
Mock.setup({
  timeout: '200 - 400'
});

// Mock.mock( url, post/get , 返回的数据)；
// 每次返回两条数据

Mock.mock(RegExp('/api/timeline/more'), 'get', function () {
  return Mock.mock({
    'data|2': [
      {
        name: 'user',
        issuedTime: (new Date().getTime() - 80000000),
        description: Mock.Random.paragraph(1, 2),
        pic: Mock.mock('@boolean') ? null : 'https://testing-timeline.oss-cn-shanghai.aliyuncs.com/1.png'
      }
    ]
  });
}); // 初始化获取数据
Mock.mock(RegExp('/api/timeline/update'), 'get', function () {
  return Mock.mock({
    'data|1': [
      {
        name: 'user',
        issuedTime: new Date().getTime().toFixed(0),
        description: Mock.Random.paragraph(1, 2),
        pic: Mock.mock('@boolean') ? null : 'https://testing-timeline.oss-cn-shanghai.aliyuncs.com/1.png'
      }
    ]
  });
});
Mock.mock(RegExp('/api/timeline'), 'get', function () {
  return Mock.mock({
    'data|2': [
      {
        name: 'user',
        issuedTime: (new Date().getTime() - 10000000),
        description: Mock.Random.paragraph(1, 2),
        pic: 'https://testing-timeline.oss-cn-shanghai.aliyuncs.com/1.png'
      }
    ]
  });
});
