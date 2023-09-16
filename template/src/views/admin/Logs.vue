<template>
  <div class="content">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-input placeholder="关键字" v-model="keyword" @keyup.enter.native="getData(1)" clearable>
        </el-input>
      </el-col>
      <el-col :span="8">
        <el-date-picker
          v-model="searchTime"
          type="datetimerange"
          :picker-options="datePicker"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        >
        </el-date-picker>
        &nbsp;
        <el-checkbox v-model="checked">根据时间</el-checkbox>
        &nbsp;
      </el-col>
      <el-col :span="6">
        
        <el-button type="primary" @click="getData(1)">搜索</el-button>
      </el-col>
    </el-row>
    <div class="tools fixclear"></div>
    <el-table :data="result" style="width: 100%">
      <el-table-column prop="id" label="ID">
      </el-table-column>
      <el-table-column prop="name" label="用户">
        <template slot-scope="scope">
          <div>ID：{{ scope.row.admin_id }}；username：{{ scope.row.username }}</div>
          <div>{{ scope.row.nickname }}</div>
          <div>{{ scope.row.role_name }}</div>
        </template>
      </el-table-column>
      <el-table-column label="行为">
        <template slot-scope="scope">
          <div>{{ actions[scope.row.url] }}</div>
          <div style="color: #b7b7b7;font-size: 11px;">{{ scope.row.url }}</div>
        </template>
      </el-table-column>
      <el-table-column label="参数">
        <template slot-scope="scope">
          <div>{{ scope.row.info }}</div>
        </template>
      </el-table-column>
      <el-table-column label="关键数据">
        <template slot-scope="scope">
          <div>{{ scope.row.keyword }}</div>
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <div>{{ scope.row.create_time }}</div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="page" @current-change="getData" @size-change="sizeChange" background
      layout="total, sizes, prev, pager, next, jumper" :current-page="page" :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="pageSize" :total="total">
    </el-pagination>

  </div>
</template>
  
<script>
import { api } from "@/api/system";
import common from '@/util/common'
import {datePicker} from '@/util/mixins/datePicker'
export default {
  name: 'logs',
  mixins: [datePicker],
  data() {
    return {
      actions: [],
      keyword: '',
      result: [],
      total: 0,
      page: 1,
      pageSize: 10,
      checked: false,
      searchTime: [new Date(), new Date()]
    }
  },
  mounted() {
    let start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24);
    this.searchTime = [start, new Date()];
    this.getData()
  },
  methods: {
    sizeChange(size) {
      this.pageSize = size
      this.getData(1)
    },
    getData(page) {
      this.page = page
      let start = undefined
      let end  = undefined
      if (this.checked){
          start = common.formatDate(this.searchTime[0], "yyyy-MM-dd hh:mm:ss")
          end = common.formatDate(this.searchTime[1], "yyyy-MM-dd hh:mm:ss")
      }
      let params = {
        page: this.page,
        size: this.pageSize,
        keyword: this.keyword,
        start: start,
        end: end
      }
      api.getLogs(params, common.serialize(params)).then(res => {
        this.result = res.data.list
        this.total = res.data.total
        this.actions = res.data.actions
      });
    }
  }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.content {
  .page {
    margin: 10px 0;
  }

  .tools {
    margin: 10px 0;
  }
}
</style>
  