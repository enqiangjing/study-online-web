<template>
  <el-main>
    <div class="cc-display">
      <div class="cc-display searchResult">
        <div class="width80p" style="position: relative; min-height: 150px">
          <div style="width: 100%; position: relative">
            <div class="border-none sc-display top">
              <span class="font-s-16 font-ls-1 t-shdow-3-1"
                >&nbsp;全部评论</span
              >
              <span class="font-s-16">&nbsp;&nbsp;14</span>
              <i class="el-icon-edit-outline talkab" @click="talkAbout()"
                >&nbsp;评论</i
              >
            </div>
            <!--一个评论楼-->
            <div
              style="width: 100%"
              v-for="(item, index) in discusslistMy"
              :key="index"
            >
              <div class="sc-display bilu">
                <img
                  class="user-o-icon"
                  :src="remoteImgDomain + item.out.userImg"
                  style=""
                />
                <div style="width: 30%; height: 60px">
                  <div style="width: 100%; height: 30px" class="sc-display">
                    <span class="font-s-15 font-ls-1 t-shdow-3-1"
                      >&nbsp;{{ item.out.userName }}</span
                    >
                  </div>
                  <div style="width: 100%; height: 30px" class="sc-display">
                    <span class="font-s-14 font-c-6"
                      >&nbsp;{{ item.out.floor }}楼&nbsp;{{
                        timestampToTime(item.out.discussTime)
                      }}</span
                    >
                  </div>
                </div>
                <div class="ec-display re-answer">
                  <el-tag
                    style="cursor: pointer"
                    type="danger"
                    @click="biluUp(item.out)"
                    >赞{{
                      item.out.upTimes > 0 ? item.out.upTimes : ""
                    }}</el-tag
                  >&nbsp;&nbsp;&nbsp;
                  <el-tag style="cursor: pointer" @click="reBilu(item.out)"
                    >回复{{
                      item.out.reTimes > 0 ? item.out.reTimes : ""
                    }}</el-tag
                  >
                </div>
              </div>
              <div class="border-none oiodsne">
                <div style="width: 100%; text-align: left">
                  <span class="font-s-14 font-c-4 font-ls-1">{{
                    item.out.content
                  }}</span>
                </div>
                <div class="nioaili" style=""></div>
              </div>
              <!--一个评论层-->
              <div
                style="width: 100%; padding-left: 50px"
                class="border-none"
                v-for="(inside, inid) in item.inside"
                :key="inid"
              >
                <div
                  style="width: 100%; height: 60px; position: relative"
                  class="sc-display"
                >
                  <img
                    class="user-icon"
                    :src="remoteImgDomain + inside.userImg"
                  />
                  <div style="width: 30%; height: 60px">
                    <div style="width: 100%; height: 30px" class="sc-display">
                      <span class="font-s-15 font-ls-1 t-shdow-3-1"
                        >&nbsp;{{ inside.userName }}&nbsp;</span
                      >
                      <el-tag v-if="inside.replyId != 0" size="mini"
                        >回复&nbsp;#{{ inside.replyId }}</el-tag
                      >
                    </div>
                    <div style="width: 100%; height: 30px" class="sc-display">
                      <span class="font-s-14 font-c-8"
                        >&nbsp;#{{ inside.floor }}&nbsp;&nbsp;{{
                          timestampToTime(inside.replyTime)
                        }}</span
                      >
                    </div>
                  </div>
                  <div class="ec-display aideinnd">
                    <el-tag
                      type="danger"
                      style="cursor: pointer"
                      @click="floorUp(inside)"
                      >赞{{ inside.upTimes > 0 ? inside.upTimes : "" }}</el-tag
                    >&nbsp;&nbsp;&nbsp;
                    <el-tag style="cursor: pointer" @click="reFloor(inside)"
                      >回复{{
                        inside.reTimes > 0 ? inside.reTimes : ""
                      }}</el-tag
                    >
                  </div>
                </div>
                <div style="" class="border-none dijfodnnn">
                  <div style="width: 100%; text-align: left">
                    <span class="font-s-14 font-c-4 font-ls-1">{{
                      inside.content
                    }}</span>
                  </div>
                  <div class="odindifi" style=""></div>
                </div>
              </div>
            </div>
            <div class="cc-display" style="height: 50px">
              <span class="font-s-14 font-s font-ls-3 t-shdow-3-1 font-c-elp"
                >~~到底啦~~</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      :title="form.type === 1 ? '评论' : '回复'"
      :visible.sync="dialogFormVisible"
      class="upbox111"
    >
      <el-form :model="form">
        <el-form-item
          label="评论内容："
          :label-width="formLabelWidth"
          v-if="form.type != 1"
        >
          <el-input
            type="textarea"
            v-model="form.reContent"
            autocomplete="off"
            disabled
            class="reabout"
          ></el-input>
        </el-form-item>

        <el-form-item label="请输入内容：" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            v-model="form.reply"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitDiscuss()">确 定</el-button>
      </div>
    </el-dialog>
  </el-main>
</template>

<script>
export default {
  name: "TalkAbout",
  props: ["discusslist", "articleInfo", "keys", "isLogin", "remoteImgDomain"],
  data() {
    return {
      // 评论对话框
      dialogFormVisible: false,
      // 宽度
      formLabelWidth: "120px",

      // 评论表单
      form: {
        reTo: "",
        reply: "",
        type: 0, // 1-评论文章；2-回复楼主；3-回复层主
        info: "", // 信息
        reContent: "",
      },

      // 列表信息
      discusslistMy: [],
    };
  },

  mounted() {
    // 首次渲染
    this.discusslistMy = this.discusslist;
  },

  methods: {
    /**评论、回复 提交动作 */
    submitDiscuss() {
      if (this.form.type === 1) {
        // 01.评论文章
        let topicType = "article";
        this.$uapi
          .post("api/commentService/addDiscuss", {
            // 评论请求发送
            topicId: this.articleInfo.id,
            userId: this.$store.state.user.userInfo.id,
            content: this.form.reply,
            topicType,
          })
          .then((res) => {
            // 评论结果
            if (res !== null) {
              this.dialogFormVisible = false; // 关闭弹窗
              this.form = { reTo: "", reply: "" }; // 清除填写的数据
              this.$notify({
                // 成功提示
                title: "成功",
                message: "评论发表成功！",
                type: "success",
              });
              this.$emit("refresh"); // 刷新评论列表
            } else {
              this.$notify.error({
                title: "错误",
                message: "评论发表失败！",
              });
            }
          });
      } else if (this.form.type === 3) {
        // 02.回复层主
        this.$uapi
          .post("api/commentService/addDiscussReply", {
            // 楼层回复请求发送
            userId: this.$store.state.user.userInfo.id,
            topicId: this.form.info.topicId,
            discussId: this.form.info.discussId,
            replyId: this.form.info.floor,
            content: this.form.reply,
            status: 1,
          })
          .then((res) => {
            // 楼层回复请求结果
            if (res !== null) {
              this.dialogFormVisible = false; // 关闭弹窗
              this.form = {
                // 清除填写的数据
                reTo: "",
                reply: "",
                type: 0, // 1-评论文章；2-回复楼主；3-回复层主
                info: "", // 信息
              };
              this.$notify({
                // 成功提示
                title: "成功",
                message: "楼层回复发表成功！",
                type: "success",
              });
              this.$emit("refresh"); // 刷新评论列表
            } else {
              this.$notify.error({
                title: "错误",
                message: "楼层回复发表失败！",
              });
            }
          });
      } else {
        // 03.回复该层的楼主
        this.$uapi
          .post("api/commentService/addDiscussReply", {
            // 请求发送
            userId: this.$store.state.user.userInfo.id,
            topicId: this.form.info.topicId,
            discussId: this.form.info.id,
            replyId: 0,
            content: this.form.reply,
            status: 1,
          })
          .then((res) => {
            // 请求结果
            if (res !== null) {
              this.dialogFormVisible = false; // 关闭弹窗
              this.form = {
                // 清除填写的数据
                reTo: "",
                reply: "",
                type: 0, // 1-评论文章；2-回复楼主；3-回复层主
                info: "", // 信息
              };
              this.$notify({
                // 成功提示
                title: "成功",
                message: "回复楼主发表成功！",
                type: "success",
              });
              this.$emit("refresh"); // 刷新评论列表
            } else {
              this.$notify.error({
                title: "错误",
                message: "回复楼主发表失败！",
              });
            }
          });
      }
      // this.$emit("refresh");
    },

    // 文章评论按钮
    talkAbout() {
      if (!this.isLogin) {
        return this.errNotice();
      }
      this.formInit();
      this.dialogFormVisible = true; // 显示提交对话框
      this.form.type = 1; // 评论文章
    },

    // 楼 点赞
    biluUp(item) {
      // console.log(item)
    },

    // 回复楼主
    reBilu(item) {
      if (!this.isLogin) {
        return this.errNotice();
      }
      this.formInit();
      this.form.type = 2; // 回复层主
      this.form.info = item; // 信息
      this.form.reContent = item.content;
      this.dialogFormVisible = true; // 回复对话框
    },

    // 层 点赞
    floorUp(item) {
      // console.log(item)
    },

    // 回复层主
    reFloor(item) {
      if (!this.isLogin) {
        return this.errNotice();
      }
      this.formInit();
      this.form.type = 3; // 回复层主
      this.form.info = item; // 信息
      this.form.reContent = item.content;
      this.dialogFormVisible = true; // 回复对话框
    },

    // 时间戳转换
    timestampToTime(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },

    // 错误提示
    errNotice() {
      this.$notify({
        title: "失败",
        message: "请先登录后评论！",
        type: "error",
        position: "top-left",
      });
    },

    // 输入初始化
    formInit() {
      this.form = {
        // 清除填写的数据
        reTo: "",
        reply: "",
        type: 0, // 1-评论文章；2-回复楼主；3-回复层主
        info: "", // 信息
      };
    },
  },

  watch: {
    // 刷新列表数据
    keys(a, b) {
      // console.log(a, b);
      this.discusslistMy = a;
    },
  },
};
</script>

<style scoped lang="less">
.el-main {
  padding: 10px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 4px #eaebec;
}
.talkab {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  color: #666;
  font-size: 14px;

  &:hover {
    color: #222;
    font-weight: 600;
  }
}
.searchResult {
  width: 100%;
  margin-top: 10px;
}
.upbox111 /deep/ .el-dialog__title {
  font-size: 18px;
  letter-spacing: 2px;
  text-shadow: 3px 3px 3px #dadbdc;
}
.upbox111 /deep/ .el-form-item__label {
  font-size: 15px;
  letter-spacing: 1px;
  text-shadow: 3px 3px 3px #dadbdc;
}
.reabout /deep/ .el-textarea__inner {
  color: #222;
}
.width80p {
  height: 100%;
  width: 100%;
}

.top {
  width: 100%;
  height: 28px;
  border-left: 5px solid #fa5a57;
  margin-bottom: 30px;
}
.bilu {
  width: 100%;
  height: 60px;
  position: relative;
}

.re-answer {
  width: 30%;
  height: 60px;
  position: absolute;
  right: 0;
  top: 0;
}

.oiodsne {
  width: 100%;
  position: relative;
  padding-left: 50px;
}

.nioaili {
  width: 100%;
  border-bottom: 1px solid #eaebec;
  height: 1px;
  margin: 10px 0 8px 0;
}
.aideinnd {
  width: 30%;
  height: 60px;
  position: absolute;
  right: 0;
  top: 0;
}
.odindifi {
  width: 100%;
  border-bottom: 1px solid #eaebec;
  height: 1px;
  margin: 10px 0 8px 0;
}
.dijfodnnn {
  width: 100%;
  // height: 60px;
  position: relative;
}

.user-icon {
  width: 46px;
  height: 46px;
  border-radius: 23px;
}

.user-o-icon {
  width: 46px;
  height: 46px;
  border-radius: 23px;
}

.el-textarea /deep/ .el-textarea__inner {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif,
    "微软雅黑";
  letter-spacing: 1px;
}
</style>
