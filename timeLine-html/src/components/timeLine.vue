<template>
  <div class="wrap" id="timeLine">
    <div class="head flex flex-between">
      <h2>
        TIME LINE
      </h2>
      <div>
        <button class="btn update" @click="getUpdate()">更新</button>
      </div>
    </div>
    <hr />
    <div class="body">
      <div v-for="(line, idx) in lines" :key="idx" class="aline">
        <div class="flex flex-between">
          <span class="username">{{line.name}}</span>
          <span class="time">{{getTime(line.issuedTime)}}</span>
        </div>
        <div class="flex flex-start content">
          <p>{{line.description}}</p>
        </div>

        <div class="flex flex-start">
          <div class="img-box" v-if="line.pic!=null">
            <img :src="line.pic" alt="图片" />
          </div>
        </div>
      </div>
      <div>
        <button class="btn more" @click="getMore()">点击加载更多</button>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/http/api.js';
export default {
  name: 'timeLine',
  data () {
    return {
      server: '/api/',
      lines: []
    };
  },
  methods: {
    init: function () {
      var timeline = this;
      api
        .get(this.server + 'timeline')
        .then(response => {
          timeline.lines = response.data;
          console.log(JSON.stringify(timeline.lines));
        })
        .catch(err => {
          console.log(JSON.stringify(err));
        });
    },
    getTime: function (time) {
      if (time < 0) return '参数错误：时间为负数';
      var date = new Date().getTime() - time;
      if (date < 0) return '参数错误：未来时间';
      date = date / (1000 * 60);
      if (date < 1) {
        return '刚刚';
      } else if (date < 60) {
        return date.toFixed(0) + '分钟前';
      } else if (date < 24 * 60) {
        return (date / 60).toFixed(0) + '小时前';
      } else {
        var day = new Date(time);
        return (
          day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate()
        );
      }
    },
    getMore: function () {
      var timeline = this;
      api
        .get(this.server + 'timeline/more')
        .then(response => {
          timeline.lines = timeline.lines.concat(response.data);
        })
        .catch(err => {
          console.log(JSON.stringify(err));
        });
    },
    getUpdate: function () {
      var timeline = this;
      api
        .get(this.server + 'timeline/update')
        .then(response => {
          timeline.lines = response.data.concat(timeline.lines);
        })
        .catch(err => {
          console.log(JSON.stringify(err));
        });
    }
  },
  mounted () {
    this.init();
  }
};
</script>
<style scoped>
.wrap {
  width: 360px;
  margin: 50px auto;
  border: 1px #aaa solid;
  padding: 5px;
  height: 600px;
}
.flex {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
}
.flex-between {
  justify-content: space-between;
}
.flex-start {
  justify-content: flex-start;
}
.head {
  height: 10%;
  margin: 0 2%;
}
.time {
  font-size: 12px;
}
.btn {
  border-radius: 5px;
  padding: 5px 15px;
  background-color: #fff;
  border: #aaa 1px solid;
}
.update {
  width: auto;
}
.btn:hover {
  background-color: #222;
  color: #fff;
  cursor: pointer;
}
.body {
  margin: 5px;
  max-height: 83%;
  overflow: auto;
  padding: 5px;
}
.content {
  font-size: 14px;
  text-align: left;
  text-indent: 2em;
  word-break: break-all;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
.aline {
  margin: 10px 0;
}
.aline:not(:last-child) {
  border-bottom: 1px #aaa dashed;
}
.img-box {
  height: auto;
  margin: 5px;
  max-width: 100%;
  max-height: 100%;
}
.img-box img {
  max-width: 100%;
  max-height: 100%;
}
.more {
  width: 100%;
}
</style>
