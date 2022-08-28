<template>
  <div class="border-none outSide">
    <div class="left">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="帐号：">
          <el-input v-model="form.userNo" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-radio-group v-model="form.gander">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
            <el-radio :label="3">保密</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="手机：">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="签名：" class="textarea_pri">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()">保存</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <div class="img cc-display">
        <div class="oldimg">
          <img :src="userImg" alt="头像" />
        </div>
        <!-- 上传头像 -->
        <div v-if="showAvatar" class="newimg">
          <el-upload
            class="avatar-uploader"
            :action="upImgUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :data="{ remotePath: 'userAvatar' }"
            :headers="uploadHeaders"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <div class="item cc-display">
        <el-button
          v-if="!showAvatar"
          type="warning"
          round
          size="mini"
          @click="showAvatar = !showAvatar"
          >更换头像</el-button
        >
        <el-button
          v-else
          type="info"
          round
          size="mini"
          @click="showAvatar = !showAvatar"
          >取消</el-button
        >
      </div>
      <div class="item cc-display">
        <el-button type="primary" round size="mini" @click="changePassword"
          >密码</el-button
        >
      </div>
    </div>
    <div class="clear-float"></div>
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="原密码：" :label-width="formLabelWidth">
          <el-input
            v-model="password.oldPass"
            autocomplete="off"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码：" :label-width="formLabelWidth">
          <el-input
            v-model="password.newPass"
            autocomplete="off"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="请确认：" :label-width="formLabelWidth">
          <el-input
            v-model="password.confirm"
            autocomplete="off"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatePassword()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "PersonPage",
  props: {
    textinfo: String,
  },
  data() {
    return {
      // 修改按钮对话框
      dialogFormVisible: false,
      formLabelWidth: "120px",
      password: {
        oldPass: "",
        newPass: "",
        confirm: "",
      },
      // 用户头像
      userImg: "",
      // 上传文件
      imageUrl: "",
      uploadHeaders: {
        Authorization: this.$store.state.user.token,
      },
      // 用户信息表单
      form: {
        userNo: "",
        password: "",
        userName: "",
        gander: "",
        email: "",
        phone: "",
        desc: "",
      },
      // 展示更换头像
      showAvatar: false,
    };
  },
  mounted() {
    // 头像图片
    this.userImg =
      this.$store.state.user.userInfo.remoteImgDomain +
      this.$store.state.user.userInfo.userImg;
    this.form.userNo = this.$store.state.user.userInfo.userNo;
    this.form.userName = this.$store.state.user.userInfo.userName;
    this.form.email = this.$store.state.user.userInfo.email;
    this.form.phone = this.$store.state.user.userInfo.phone;
    this.form.gander = this.$store.state.user.userInfo.gander;
    this.form.desc = this.$store.state.user.userInfo.desc;

    this.$myglobalop.rmLoading();
  },
  computed: {
    upImgUrl() {
      return process.env.baseUrl + "api/systemService/uploadImg";
    },
  },
  methods: {
    // 点击保存按钮
    onSubmit() {
      this.$uapi.user.updateInfo(this.form).then((res) => {
        this.messageInfo(res.data);
      });
    },

    // 点击密码按钮
    changePassword() {
      this.dialogFormVisible = true;
    },

    // 更新密码
    updatePassword() {
      this.$uapi.user.updatePassword(this.password).then((res) => {
        this.messageInfo(res.data);
        if (res.data && res.data.errCode == "2000") {
          this.dialogFormVisible = false;
        }
      });
    },

    // 信息提示
    messageInfo(val) {
      if (val.errCode == "2000") {
        this.$notify({
          title: "成功",
          message: val.errMsg,
          type: "success",
        });
      } else {
        this.$notify({
          title: "失败",
          message: val.errMsg,
          type: "error",
        });
      }
    },

    // 头像上传相关
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      if (res.errCode == "2000") {
        this.$uapi.user
          .updateInfo({
            userNo: this.$store.state.user.userInfo.userNo,
            userImg: res.data,
          })
          .then((ress) => {
            if (ress.data && ress.data.errCode == "2000") {
              this.showAvatar = false;
              this.$notify({
                title: "成功",
                message: "头像更新成功！",
                type: "success",
                position: "top-left",
              });
              this.userImg =
                this.$store.state.user.userInfo.remoteImgDomain +
                "/" +
                res.data;
            } else {
              this.$notify({
                title: "错误",
                message: "头像更新失败！",
                type: "error",
                position: "top-left",
              });
            }
          });
      }
    },
    beforeAvatarUpload(file) {
      console.log(file.type);
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG|PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style scoped lang="less">
.outSide {
  width: 100%;
  height: 100%;
  padding: 30px;
  background-color: #fff;

  .left {
    float: left;
    width: 50%;
    height: 100%;
  }

  .right {
    float: right;
    width: 50%;
    height: 100%;

    .img {
      width: 100%;
      height: 120px;

      .oldimg {
        img {
          width: 120px;
          height: 120px;
          border-radius: 60px;
        }
      }

      .newimg {
        margin-left: 10px;
        width: 100px;
        height: 100px;
        border-radius: 60px;
        border: 1px dashed #ccc;
      }
    }

    .item {
      width: 100%;
      height: 50px;
    }
  }
}

.outSide /deep/ .el-form-item__label {
  letter-spacing: 2px;
  text-shadow: 0px 0px 3px #dadbdc;
}

.outSide /deep/ .el-input__inner {
  letter-spacing: 1px;
}

.outSide /deep/ .el-dialog__title {
  letter-spacing: 2px;
  text-shadow: 0px 0px 3px #dadbdc;
}

.textarea_pri /deep/ .el-textarea__inner {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif,
    "微软雅黑";
  letter-spacing: 1px;
}

// 图片上传
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 98px;
  height: 98px;
  line-height: 98px;
  text-align: center;
}
.avatar {
  width: 98px;
  height: 98px;
  border-radius: 50px;
  display: block;
}
</style>
