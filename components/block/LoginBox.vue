<template>
  <div class="loginbox cc-display" id="outboxlogin" @click="displayBox">
    <div id="insideboxlogin" @click="displayBlock($event)">
      <div class="topline"></div>
      <div style="width: 100%; height: 80px" class="cc-display">
        <div style="width: 50%; height: 100%" class="cc-display">
          <span class="font-s-22 font-w-6 font-c-4 font-ls-2">账号登录</span>
        </div>
        <div class="cc-display otherlogin" @click="otherLogin">
          <span class="font-s-22 font-w-6 font-c-6 font-ls-2">第三方登录</span>
        </div>
      </div>
      <!-- 用户名输入 -->
      <div style="width: 100%; height: 100px" class="ce-display">
        <div class="cc-display border-none login_111">
          <img :src="imgUrl.user" class="img_222" />
        </div>
        <input
          placeholder="用户名/邮箱"
          class="border-none font16g login_222"
          v-model="userInput.userNo"
        />
      </div>
      <!-- 用户密码输入 -->
      <div style="width: 100%; height: 100px" class="cc-display">
        <div class="cc-display border-none login_333">
          <img :src="imgUrl.lock" class="img_222" />
        </div>
        <input
          placeholder="请输入密码"
          type="password"
          class="border-none font16g login_555"
          v-model="userInput.password"
        />
      </div>
      <!-- 验证码输入 -->
      <div
        v-show="isNeedVerifyCode"
        style="width: 100%; height: 50px"
        class="cc-display"
      >
        <div class="cc-display border-none login_666">
          <img :src="imgUrl.shield" class="img_222" />
        </div>
        <input
          maxlength="4"
          placeholder="验证码"
          class="border-none font16g login_777"
          v-model="userInput.verifyCode"
          @input="verifyCodeInput"
        />
        <!-- <img :src="imgUrl.close" class="img_111" /> -->
        <div class="img_111">
          <i
            v-if="verifyCodeError"
            class="el-icon-error verify_code_verify_error"
          ></i>
          <i v-else class="el-icon-success verify_code_verify_success"></i>
        </div>
        <img
          :src="$store.state.user.verifyCode"
          class="verify_code border-none"
          @click="getVerifyCode()"
        />
      </div>
      <!-- 操作按钮 -->
      <div style="width: 100%; height: 90px" class="ce-display">
        <div
          id="login-submit"
          class="cc-display mouseon login_999"
          style="margin-left: 0; margin-right: 10%"
          @click="submitLogin"
        >
          <span class="font-s-20 font-w-6 font-c-e">&nbsp;登录</span>
        </div>
        <div class="cc-display mouseon" style="margin-left: 0">
          <span class="font-s-20 font-w-6 font-c-e">&nbsp;注册</span>
        </div>
      </div>
      <div style="width: 100%; height: 50px" class="cc-display">
        <div
          style="width: 35%; height: 50px; margin-right: 5%"
          class="cc-display"
        >
          <img
            :src="imgUrl.question"
            style="width: 16px; height: 16px; margin-top: 2px"
          />
          <span class="font16g">&nbsp;忘记密码</span>
        </div>
        <div
          style="width: 35%; height: 50px; margin-left: 5%"
          class="cc-display"
        >
          <img
            :src="imgUrl.ionicexit"
            style="width: 18px; height: 16px; margin-top: 2px"
          />
          <span class="font16g">&nbsp;注销账号</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  /**
   * 组件名称
   */
  name: "CpnLoginBox",

  /**
   * 组件响应式数据
   */
  data() {
    return {
      // 用户输入
      userInput: {
        userNo: "",
        password: "",
        verifyCode: "",
      },
      verifyCodeError: true,
      isNeedVerifyCode: false,
    };
  },

  /**
   * 计算属性
   */
  computed: {
    // 组件图片链接
    imgUrl() {
      return {
        user: process.env.baseUrl + "imgs/loginbox/user.png",
        lock: process.env.baseUrl + "imgs/loginbox/lock.png",
        shield: process.env.baseUrl + "imgs/loginbox/shield.png",
        close: process.env.baseUrl + "imgs/loginbox/close.png",
        question: process.env.baseUrl + "imgs/loginbox/question.png",
        ionicexit: process.env.baseUrl + "imgs/loginbox/ionicexit.png",
      };
    },
  },

  /**
   * 组件方法
   */
  methods: {
    /**
     * @method displayBlock 隐藏登录框
     */
    displayBox() {
      this.$store.commit("user/changeIsLoginBox", false); //vuex 移除登录框
    },

    /**
     * @method displayBlock 阻断登录框内的点击移除页面
     */
    displayBlock(e) {
      e.stopPropagation();
    },

    /**
     * @method submitLogin 登录提交
     */
    submitLogin() {
      // 发送登录请求
      this.$uapi
        .post(`api/loginService/submit`, {
          userNo: this.userInput.userNo,
          password: this.userInput.password,
          verifyCode: this.userInput.verifyCode,
        })
        .then((res) => {
          const userInfo = res?.data?.data || undefined;
          // 登录结果判断
          if (
            userInfo &&
            (res.data.errCode == "success" || res.data.errCode == "2000")
          ) {
            // 移除登录框
            this.$store.commit("user/changeIsLoginBox", false);
            // 用户信息写入 store
            this.$store.commit("user/changeIsLogin", {
              flag: true,
              userInfo: userInfo,
            });
            // 本地缓存用户信息
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
            return;
          }
          // 登录失败
          this.$message.error(res.data.errCode + ", " + res.data.errMsg);
        })
        .catch((err) => {
          // 登录异常
          // console.log(err)
          this.$message.error("登录失败，系统异常！");
        });
    },

    // 其他登录方式
    otherLogin() {
      this.$message.warning("暂不支持，敬请期待！");
    },

    // 验证码输入
    verifyCodeInput() {
      if (this.userInput.verifyCode.length < 4) {
        this.verifyCodeError = true;
      } else {
        this.verifyCodeError = false;
      }
    },

    // 获取验证码
    getVerifyCode() {
      this.$uapi.verifyCode.send().then((res) => {
        console.log(res);
        this.$store.commit("user/setVerifyCode", res.data.data);
      });
    },
  },

  mounted() {
    // 判断是否展示验证码输入框
    this.$uapi.config.configInfoNeedVerifyCode().then((res) => {
      if (res.data.data && res.data.data.value == "Y") {
        this.isNeedVerifyCode = true;
        console.log(this.isNeedVerifyCode);
      }
    });
  },
};
</script>

<style scoped lang="less">
.verify_code_verify_error {
  font-size: 28px;
  color: #f56c6c;
}

.verify_code_verify_success {
  font-size: 28px;
  color: #67c23a;
}

.loginbox {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 201;
}

.topline {
  width: 100%;
  height: 8px;
  background-image: linear-gradient(
    to right,
    rgb(255, 90, 87),
    rgba(252, 186, 42, 0.25)
  );
}

.mouseon {
  cursor: pointer;
  width: 35%;
  height: 50px;
  background-color: #ff5c7c;
  margin-left: 5%;
  border-radius: 6px;
  box-shadow: 0 0 3px #eee;

  &:hover {
    background-color: #f56c6c;
  }
}

#insideboxlogin {
  width: 500px;
  height: 500px;
  background-color: #fff;
  color: #000;
  border-radius: 6px;
  overflow: hidden;
}
.otherlogin {
  width: 50%;
  height: 100%;
  background-color: #eee;
  cursor: pointer;
}

.login_111 {
  width: 10%;
  height: 50px;
  background-color: #eee;
  border-radius: 6px 0 0 6px;
  border: 1px solid #ccc;
  border-right: 0;
}
.login_222 {
  width: 70%;
  height: 50px;
  border-radius: 0 6px 6px 0;
  border: 1px solid #ccc;
  border-left: 0;
  padding-left: 5px;
  font-size: 16px;
  letter-spacing: 1px;
  outline: none;
}
.login_333 {
  width: 10%;
  height: 50px;
  background-color: #eee;
  border-radius: 6px 0 0 6px;
  border: 1px solid #ccc;
  border-right: 0;
}
.login_555 {
  width: 70%;
  height: 50px;
  border-radius: 0 6px 6px 0;
  border: 1px solid #ccc;
  border-left: 0;
  padding-left: 5px;
  font-size: 16px;
  letter-spacing: 3px;
  outline: none;
}
.login_666 {
  width: 10%;
  height: 50px;
  background-color: #eee;
  border-radius: 6px 0 0 6px;
  border: 1px solid #ccc;
  border-right: 0;
}
.login_777 {
  width: 25%;
  height: 50px;
  border-radius: 0 6px 6px 0;
  border: 1px solid #ccc;
  border-left: 0;
  padding-left: 5px;
  font-size: 16px;
  letter-spacing: 1px;
  outline: none;
}
.login_999 {
  width: 35%;
  height: 50px;
  background-color: #00a1d6;
  margin-right: 5%;
  border-radius: 6px;
  box-shadow: 0 0 3px #eee;

  &:hover {
    background-color: #409eff;
  }
}
.img_111 {
  width: 5%;
  height: auto;
  margin-left: 2.5%;
  margin-right: 2.5%;
}
.img_222 {
  width: 20px;
  height: 20px;
}
.verify_code {
  width: 35%;
  height: 50px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    padding: 2px;
    background-color: #f56c6c;
  }
}
</style>
