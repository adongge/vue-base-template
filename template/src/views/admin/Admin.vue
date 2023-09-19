<template>
  <div class="content">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="用户名/昵称/模糊查找" v-model="keyword" @keyup.enter.native="getData(1)" clearable>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="getData(1)">搜索</el-button>
      </el-col>
    </el-row>
    <div class="tools fixclear">
      <el-button type="primary" icon="el-icon-plus" @click="toEdit(-1)">添加</el-button>
    </div>
    <el-table :data="result" style="width: 100%">
      <el-table-column label="ID">
        <template slot-scope="scope">
          <div>{{ scope.row.admin.admin_id }}</div>
        </template>
      </el-table-column>
      <el-table-column label="账号">
        <template slot-scope="scope">
          <div>{{ scope.row.admin.username }}</div>
        </template>
      </el-table-column>
      <el-table-column label="昵称">
        <template slot-scope="scope">
          <div>{{ scope.row.admin.nickname }}</div>
        </template>
      </el-table-column>
      <el-table-column label="角色">
        <template slot-scope="scope">
          <div>{{ scope.row.role.name }}</div>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-switch v-if="scope.row.admin.admin_id != 1" v-model="scope.row.admin.status" :active-value="0"
            :inactive-value="1" @change="statusChange(scope.$index)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope" v-if="scope.row.admin.admin_id != 1">
          <el-link type="primary" @click="toEdit(scope.$index)">
            <i class="el-icon-edit"></i> 编辑
          </el-link>
          |
          <el-link type="warning" @click="resetAdminPwd(scope.$index)">
            <i class="el-icon-lock"></i> 重置密码
          </el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="page" @current-change="getData" @size-change="sizeChange" background
      layout="total, sizes, prev, pager, next, jumper" :current-page="page" :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="pageSize" :total="total">
    </el-pagination>

    <el-dialog title="更新管理员" :visible.sync="dialogFormVisible" @close="diglogClose">
      <el-form :model="form">
        <el-form-item label="账号">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="form.role_id" value-key="id" filterable placeholder="请选择角色" @change="roleChange">
            <el-option v-for="item in role_list" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="0" :inactive-value="1">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
  
<script>
import { api } from "@/api/system"
import common from '@/util/common'
export default {
  name: 'admin',
  data() {
    return {
      token: '',
      keyword: '',
      result: [],
      total: 0,
      page: 1,
      pageSize: 10,
      dialogFormVisible: false,
      form: {
        username: '',
        nickname: '',
        role_id: 0
      },
      role_list: [],
      copy_text: ''
    }
  },
  mounted() {
    this.getData()
    this.token = common.getCookie(common.dataKey);
  },
  methods: {
    getRoleList() {
      api.getRoleList({
        page: 1,
        size: 1000
      }).then((res) => {
        this.role_list = res.data.list
      })
    },
    diglogClose() { },
    statusChange(index) {
      let item = this.result[index].admin
      this.$confirm('确定更新状态吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.updateAdminStatus({
          status: item.status,
          ids: [item.admin_id]
        }).then(res => {
          this.$message.success('更新成功');
        });
      }).catch(() => {
        this.$set(this.result[index].admin, 'status', (item.status == 1 ? 0 : 1))
      })
    },
    resetAdminPwd(index) {
      let item = this.result[index].admin
      this.$confirm('确定重置密码吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.resetAdminPwd({
          id: item.admin_id
        }).then(res => {
          if (res.data) {
            this.$confirm(`重置完成，新密码：${res.data}`, '密码重置成功！', {
              confirmButtonText: '复制',
              cancelButtonText: '知道了',
              type: 'warning'
            }).then(() => {
              navigator.clipboard.writeText(res.data).then(() => {
                this.$message.success(`已复制 ${res.data}`)
              })
            })
          }
        });
      }).catch(() => {

      })
    },
    save() {
      api.updateAdmin({
        admin_id: this.form.admin_id,
        role_id: this.form.role_id,
        username: this.form.username,
        nickname: this.form.nickname,
        status: this.form.status
      }).then(() => {
        this.dialogFormVisible = false
        this.$message.success('操作成功')
        this.getData()
      })
    },
    toEdit(index) {
      this.getRoleList()
      this.dialogFormVisible = true
      this.form = {
        admin_id: 0,
        role_id: 0,
        username: '',
        status: 0
      }
      if (index > -1) {
        this.form = common.deepClone(this.result[index].admin)
      }
    },
    sizeChange(size) {
      this.pageSize = size
      this.getData(1)
    },
    getData(page) {
      this.page = page
      let params = {
        page: this.page,
        size: this.pageSize,
        keyword: this.keyword
      }
      api.getAdminList(params, common.serialize(params)).then(res => {
        this.result = res.data.list
        this.total = res.data.total
      });
    },
    roleChange(e) {
      console.log(e, this.form)
      // this.form.role_id = e
      this.$set(this.form, 'role_id', e)
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
  