<template>
  <el-header class="cc-display" style="height: 70px">
    <el-row
      :gutter="0"
      :class="[
        'border-none',
        widhtType == '80' ? 'so_middle_80' : 'so_middle_100',
      ]"
    >
      <el-col :span="6">
        <div class="sc-display height100 to-index" @click="toIndex">
          <div class="inside cc-display" title="前往首页">
            <el-image
              :src="'/imgs/webheader/logo_book_g.png'"
              style="width: 28px; height: 28px; margin: 6px 10px 0 0"
            >
            </el-image>
            <span
              class="font-s-26 font-w-4 span-l-1"
              style="text-shadow: 3px 3px 3px #cacbcc"
              >静航知识网</span
            >
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="cc-display height100">
          <div style="width: 100%; max-width: 500px">
            <el-input
              placeholder="请输入内容"
              v-model="searchInput"
              class="input-with-select myselect"
              @keyup.enter.native="searchSubmit()"
            >
              <el-select
                v-model="searchSelect"
                slot="prepend"
                placeholder="请选择"
              >
                <el-option label="全部" value="1"></el-option>
                <el-option label="课程" value="2"></el-option>
                <el-option label="讲师" value="3"></el-option>
              </el-select>
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="searchSubmit()"
              ></el-button>
            </el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="ec-display height100">
          <div
            class="cc-display"
            style="position: relative; height: 30px; cursor: pointer"
            @mouseenter="fnSonMenuShow"
            @mouseleave="fnSonMenuShow"
          >
            <div>
              <span
                class="font-s-18 useraccount font-ls-2"
                style="text-shadow: 3px 3px 3px #cacbcc"
                >{{
                  $store.state.user.userInfo.userName
                    ? $store.state.user.userInfo.userName
                    : "请登录"
                }}</span
              >
            </div>
            <div class="userbox cc-display">
              <i class="el-icon-user-solid font-s-20 font-c-4"></i>
            </div>
            <div class="logout" v-if="menuShow">
              <div class="gle cc-display"><div class="top"></div></div>
              <div class="menu font-ls-4 font-s-16">
                <div class="item cc-display" @click="toAccount()">
                  <i class="el-icon-user"></i>
                  用户
                </div>
                <div class="item cc-display" @click="toIndex()">
                  <i class="el-icon-house"></i>
                  首页
                </div>
                <div class="item cc-display" @click="toSelectClass()">
                  <i class="el-icon-bank-card"></i>
                  选课
                </div>
                <div
                  v-if="$store.state.user.isLoginFlag"
                  class="item cc-display"
                  @click="logOut()"
                >
                  <i class="el-icon-switch-button"></i>
                  退出
                </div>
                <div v-else class="item cc-display" @click="isUserLogin()">
                  <i class="el-icon-thumb"></i>
                  登录
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <transition name="el-fade-in-linear">
      <LoginBox v-if="$store.state.user.isLoginBox" />
    </transition>
  </el-header>
</template>

<script>
import LoginBox from "@/components/block/LoginBox.vue";

export default {
  /**
   * 组件名称
   */
  name: "CpnWebHeader",

  props: {
    widhtType: {
      type: String,
      default: "80",
    },
  },

  /**
   * 使用的子组件
   */
  components: {
    LoginBox,
  },

  /**
   * 组件响应式数据
   */
  data() {
    return {
      searchInput: "",
      searchSelect: "1",
      userName: "",
      menuShow: false,
    };
  },

  /**
   * 组件方法
   */
  methods: {
    /**
     * @method isUserLogin && 用户登录框是否展示
     * @author jeq && 2020-11-23
     */
    isUserLogin() {
      if (!this.$store.state.user.isLoginFlag) {
        this.$store.commit("user/changeIsLoginBox", true); // vuex 登录框是否展示
        // 获取验证码
        this.$uapi.verifyCode.send().then((res) => {
          // console.log(res);
          this.$store.commit("user/setVerifyCode", res.data.data);
        });
      }
    },

    /**
     * @method searchSubmit && 搜索框输入值存储内存
     */
    searchSubmit() {
      // this.$router.push("/search/" + this.searchInput);
      this.$store.commit("user/changeSearchInputText", this.searchInput);
      this.$myglobalop.showLoading(this, "/search/" + this.searchInput);
    },

    /**
     * @method toIndex 跳转到首页
     */
    toIndex() {
      // this.$router.push("/");
      this.$myglobalop.showLoading(this, "/");
    },

    toSelectClass() {
      // this.$router.push("/select_class/common");
      this.$myglobalop.showLoading(this, "/select_class/common");
    },

    /**
     * @method fnSonMenuShow 菜单是否展示
     */
    fnSonMenuShow() {
      this.menuShow = !this.menuShow;
    },

    /**
     * @method toAccount 到用户页面
     */
    toAccount() {
      // console.log(localStorage.getItem("userPage"));
      let userPage = localStorage.getItem("userPage");
      if (userPage) {
        // this.$router.push("/account/" + userPage);
        this.$myglobalop.showLoading(this, "/account/" + userPage);
      } else {
        this.$store.commit("user/changeAccountPage", "firstpage");
        // this.$router.push("/account/firstpage");
        this.$myglobalop.showLoading(this, "/account/firstpage");
      }
    },

    /**
     * @method logOut 退出登录
     */
    logOut() {
      this.$uapi.get("api/loginService/logout").then((res) => {
        // 需要添加 -> 登出结果判断
        // console.log(res)
        this.$store.commit("user/changeIsLogin", {
          flag: false,
          userInfo: {
            userName: "请登录",
            remoteImgDomain: this.$store.state.user.userInfo.remoteImgDomain,
          },
        });
        // 清除本地缓存
        localStorage.removeItem("userInfo");
      });
    },
  },

  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
// 搜索框的下拉项样式
.el-select /deep/ .el-input {
  width: 80px !important;
}

// 退出
//
.logout {
  position: absolute;
  top: 30px;
  right: 0px;

  .gle {
    position: relative;
    width: 100%;
    height: 8px;

    .top {
      width: 0;
      height: 0;
      border-bottom: 8px solid #aaabac;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
    }
  }

  .menu {
    width: 120px;
    box-shadow: 0 0 5px #aaabac;
    background-color: #fff;
    border-radius: 4px;
    overflow: hidden;
    color: #555;

    .item {
      height: 40px;
      width: 100%;
      cursor: pointer;

      &:hover {
        background-color: #f2f2f2;
        // color: #000;
        font-weight: 600;
      }
    }
  }
}

.el-header {
  padding: 0 20px;
  background-color: #fff;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1800;
}

.el-row {
  height: 100%;
}

.el-col {
  height: 100%;
}

.height100 {
  height: 100%;
}

.useraccount:hover {
  cursor: pointer;
}

.userbox {
  width: 28px;
  height: 28px;
  border-radius: 17px;
  margin-left: 6px;
  background-color: #dadbdc;
}

.to-index {
  .inside {
    height: 75%;
    padding: 0;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
      color: #666;
    }
  }
}

.so_middle_80 {
  width: 100%;
  max-width: 1400px;
}

.so_middle_100 {
  width: 100%;
  padding: 0 20px;
}
</style>
