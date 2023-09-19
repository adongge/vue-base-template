<template>
  <div class="content">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="名称/模糊查找" v-model="keyword" @keyup.enter.native="getData(1)" clearable>
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
      <el-table-column prop="id" label="ID">
      </el-table-column>
      <el-table-column prop="name" label="名称">
      </el-table-column>
      <el-table-column prop="description" label="描述">
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope" v-if="scope.row.id != 1">
          <el-switch v-model="scope.row.status" :active-value="0" :inactive-value="1"
            @change="statusChange(scope.$index)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope" v-if="scope.row.id != 1">
          <el-link type="primary" @click="toEdit(scope.$index)">
            <i class="el-icon-edit"></i> 编辑
          </el-link>
          |
          <el-link type="success" @click="toPermission(scope.$index)">
            <i class="el-icon-lock"></i> 权限修改
          </el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="page" @current-change="getData" @size-change="sizeChange" background
      layout="total, sizes, prev, pager, next, jumper" :current-page="page" :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="pageSize" :total="total">
    </el-pagination>

    <el-dialog title="更新角色" :visible.sync="dialogFormVisible" @close="diglogClose">
      <el-form :model="form">
        <el-form-item label="角色名称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色状态">
          <el-switch v-model="form.status" :active-value="0" :inactive-value="1">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>


    <el-dialog title="更新角色权限" :visible.sync="dialogPermissionVisible" :close-on-click-modal="false">
      <el-form :model="form">
        <el-form-item label="角色名称">
          <el-input v-model="form.name" readonly></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="form.description" readonly></el-input>
        </el-form-item>
        <el-form-item label="角色权限">

        </el-form-item>

      </el-form>
      <el-tree ref="roleTree" :data="permission" :props="{ children: 'children', label: 'name' }" node-key="id"
        default-expand-all show-checkbox check-strictly :expand-on-click-node="false" :check-on-click-node="true"
        @check="onNodeCheck" @check-change="onNodeCheckChange">
        <template v-slot="{ data }">{{ data.name }}</template>
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPermissionVisible = false">取 消</el-button>
        <el-button type="primary" @click="savePermission">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>
  
<script>
import { api } from "@/api/system"
import common from '@/util/common'
export default {
  name: 'role',
  data() {
    return {
      token: '',
      keyword: '',
      result: [],
      total: 0,
      page: 1,
      pageSize: 10,
      dialogFormVisible: false,
      form: {},
      dialogPermissionVisible: false,
      permission: []
    }
  },
  mounted() {
    this.token = common.getCookie(common.dataKey)
    this.keyword = this.$route.query.keyword
    this.getData()
  },
  methods: {
    diglogClose() { },
    save() {
      api.updateRole({
        id: this.form.id,
        name: this.form.name,
        status: this.form.status,
        description: this.form.description,
      }).then(() => {
        this.dialogFormVisible = false
        this.$message.success('操作成功')
        this.getData()
      })
    },
    statusChange(index) {
      let item = this.result[index]
      this.$confirm('确定更新状态吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.updateRoleStatus({
          status: item.status,
          ids: [item.id]
        }).then(res => {
          this.$message.success('更新成功');
        });
      }).catch(() => {
        this.$set(this.result[index], 'status', (item.status == 1 ? 0 : 1))
      })
    },
    toEdit(index) {
      this.dialogFormVisible = true
      this.form = {
        id: 0,
        name: '',
        status: 0
      }
      if (index > -1) {
        this.form = this.result[index]
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
      api.getRoleList(params, common.serialize(params)).then(res => {
        this.result = res.data.list
        this.total = res.data.total
      });
    },
    toPermission(index) {
      if (index > -1) {
        this.form = this.result[index]
      }
      this.dialogPermissionVisible = true
      api.getAllPermission().then((res) => {
        this.permission = res.data
        api.getRolePermission({id:this.form.id}).then((result)=> {
          console.log(result.data)
          result.data.forEach(id => {
            this.$refs.roleTree.setChecked(id, true)
          })
        })
      })
    },
    onNodeCheck(data, { checkedKeys }) {
      // console.log('onNodeCheck', data.name, checkedKeys)
      if (checkedKeys.includes(data.id)) {
        this.selectChildren(data)
      }
    },
    onNodeCheckChange(data, checked) {
      // console.log('onNodeCheckChange', data.name, checked)
      if (checked) {
        if (data.parent_id !== 0) {
          this.$refs.roleTree.setChecked(data.parent_id, true) // Check Parent
        }
      } else {
        // 特殊处理 - 一级菜单下的二级菜单无勾选时，一级菜单不勾选（注意：依赖接口定义的树状层级 type 0, 1, 2 来判断）
        if (data.type === 1) {
          let checkedKeys = this.$refs.roleTree.getCheckedKeys()
          let sameLevelKeys = this.permission.find(item => item.id === data.parent_id).children.map(item => item.id)
          let sameLevelCheckedKeys = sameLevelKeys.filter(key => checkedKeys.includes(key))
          if (sameLevelCheckedKeys.length === 0) {
            this.$refs.roleTree.setChecked(data.parent_id, false)
          }
        }
        if (data.children) {
          data.children.map(item => {
            this.$refs.roleTree.setChecked(item.id, false) // UnCheck Children
          })
        }
      }
    },
    selectChildren(data) {
      data &&
        data.children &&
        data.children.map(item => {
          this.$refs.roleTree.setChecked(item.id, true)
          if (data.children) {
            this.selectChildren(item)
          }
        })
    },
    savePermission() {
      let ids = this.$refs.roleTree.getCheckedNodes(false, true).map(o => o.id)
      api.updateRolePermission({
        role_id: this.form.id,
        permission_ids: ids
      }).then((res)=>{
        this.$message.success('操作成功！')
        this.getData()
        this.dialogPermissionVisible = false
      })
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
  