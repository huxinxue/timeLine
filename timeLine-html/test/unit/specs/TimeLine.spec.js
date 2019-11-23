import Vue from 'vue';
import TimeLine from '@/components/timeLine';
const Constructor = Vue.extend(TimeLine);
const vm = new Constructor().$mount();
vm.server = '/api/';
describe('timeLine.vue', () => {
  it('should return correct time (测试时间转换函数：getTime)', () => {
    var time = new Date().getTime();
    expect(vm.getTime(time)).to.be.equal('刚刚');
    time -= 60 * 1000 * 5;
    expect(vm.getTime(time)).to.be.equal('5分钟前');
    time -= 60 * 1000 * 60 * 5;
    expect(vm.getTime(time)).to.be.equal('5小时前');
    time = 1573383501960;
    expect(vm.getTime(time)).to.be.equal('2019-11-10');
  });
  it('should render correct contents and data (测试数据渲染是否正确)', () => {
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
  it('should request initial datas (测试初始化获取数据) \n\t\t function:init() \n\t\t request: /timeline', () => {
    var length = vm.lines.length;
    new Promise(function (resolve) {
      vm.init();
      resolve();
    }).then(() => {
      expect(vm.lines.length).to.be.equal(length + 1);
    });
  });
  it('should request more old data (测试加载更多) \n\t\t function: getMore() \n\t\t requeset: /timeline/getMore', () => {
    var length = vm.lines.length;
    new Promise(function (resolve) {
      vm.$el.querySelector('.more').click();
      resolve();
    }).then(() => {
      expect(vm.lines.length).to.be.equal(length + 1);
    });
  });
  it('should request new data (测试获取更新)  \n\t\t function: getUpdate() \n\t\t requeset: /timeline/update', () => {
    var length = vm.lines.length;
    new Promise(function (resolve) {
      vm.$el.querySelector('.update').click();
      resolve();
    }).then(() => {
      expect(vm.lines).to.have.length(length + 1);
    });
  });
  it('when time is null then throw TypeError \n\t\t getTime()异常检测：时间为null时抛出类型错误异常', () => {
    function shouldThrowErr () {
      vm.getTime(null);
    }
    expect(shouldThrowErr).to.throw('数据类型错误');
    expect(shouldThrowErr).to.throw(TypeError);
  });
  it('when time is not a number then throw TypeError \n\t\t getTime()异常检测：时间为非数字类型时抛出类型错误异常', () => {
    function shouldThrowErr () {
      vm.getTime('time');
    }
    expect(shouldThrowErr).to.throw('数据类型错误');
    expect(shouldThrowErr).to.throw(TypeError);
  });
  it('when time < 0 then throw error msg \n\t\t getTime()异常检测：时间为负数时抛出异常', () => {
    function shouldThrowErr () {
      vm.getTime(-1);
    }
    expect(shouldThrowErr).to.throw('参数错误：时间为负数');
  });
  it('when time is a future time then throw error msg \n\t\t getTime()异常检测：时间为未来时刻时抛出异常', () => {
    function shouldThrowErr () {
      vm.getTime(new Date().getTime() + 1000 * 600);
    }
    expect(shouldThrowErr).to.throw('参数错误：时间为未来时刻');
  });
});
