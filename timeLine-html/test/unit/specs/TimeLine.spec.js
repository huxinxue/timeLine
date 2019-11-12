import Vue from 'vue';
import TimeLine from '@/components/timeLine';

describe('timeLine.vue', () => {
  it('测试时间转换函数：getTime', () => {
    const Constructor = Vue.extend(TimeLine);
    const vm = new Constructor().$mount();
    var time = new Date().getTime();
    expect(vm.getTime(time + 1000 * 60)).to.be.equal('参数错误：未来时间');
    expect(vm.getTime(time)).to.be.equal('刚刚');
    time -= 60 * 1000 * 5;
    expect(vm.getTime(time)).to.be.equal('5分钟前');
    time -= 60 * 1000 * 60 * 5;
    expect(vm.getTime(time)).to.be.equal('5小时前');
    time = 1573383501960;
    expect(vm.getTime(time)).to.be.equal('2019-11-10');
    expect(vm.getTime(-1)).to.be.equal('参数错误：时间为负数');
  });
  it('测试数据渲染是否正确', () => {
    const Constructor = Vue.extend(TimeLine);
    const vm = new Constructor().$mount();
    new Promise(function (resolve) {
      vm.lines = [{
        name: 'user',
        issuedTime: 1573383501960,
        description: '正文',
        pic: 'https://testing-timeline.oss-cn-shanghai.aliyuncs.com/1.png'
      }];
      resolve();
    }).then(() => {
      expect(vm.$el.querySelector('.username').textContent).to.equal('user');
      expect(vm.$el.querySelector('.time').textContent).to.equal('2019-11-10');
      expect(vm.$el.querySelector('.content p').textContent).to.equal('正文');
      expect(vm.$el.querySelector('img').src).to.equal('https://testing-timeline.oss-cn-shanghai.aliyuncs.com/1.png');
    });
  });
  it('测试初始化获取数据的方法 : 获取到了2条数据 \n\t\t function:init() \n\t\t request: /timeline', () => {
    const Constructor = Vue.extend(TimeLine);
    const vm = new Constructor().$mount();
    new Promise(function (resolve) {
      vm.init();
      resolve();
    }).then(() => {
      expect(vm.lines.length).to.be.equal(2);
    });
  });
  it('测试加载更多的方法:获取到了2条数据 \n\t\t function: getMore() \n\t\t requeset: /timeline/getMore', () => {
    const Constructor = Vue.extend(TimeLine);
    const vm = new Constructor().$mount();
    new Promise(function (resolve) {
      vm.$el.querySelector('.more').click();
      resolve();
    }).then(() => {
      expect(vm.lines.length).to.be.equal(4);
    });
  });
  it('测试获取更新的方法 :获取到了2条数据 \n\t\t function: getUpdate() \n\t\t requeset: /timeline/update', () => {
    const Constructor = Vue.extend(TimeLine);
    const vm = new Constructor().$mount();
    new Promise(function (resolve) {
      vm.$el.querySelector('.update').click();
      resolve();
    }).then(() => {
      expect(vm.lines.length).to.be.equal(6);
    });
  });
});
