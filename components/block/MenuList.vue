<template>
  <div style="width: 100%" class="border-none font-c-4">
    <!-- 菜单列表 -->
    <div style="width: 100%" v-for="(menu, index) in menulist" :key="index">
      <!-- 一级菜单 -->
      <div class="menuWidth1 cc-display">
        <div
          :class="[
            'menu1ti',
            'cc-display',
            'font-c-5',
            { menuSelect: currentMenu === $lodash.toLower(menu.menuvalue) },
          ]"
          @click="menuOneClick(index, menu.menuvalue)"
        >
          <i
            :class="[menuIcon[menu.menuvalue], 'font-s-24']"
            style="margin: 6px 6px 0 0"
          ></i>
          <span class="font-s-20 font-c-6 font-ls-1 font-w-6 t-shdow-2-1">{{
            menu.meunname
          }}</span>
        </div>
      </div>

      <!-- 二级菜单 -->
      <div
        v-for="(item, itemid) in menu.menusonlist"
        :key="itemid"
        class="menuWidth2 cc-display"
        v-show="menuTwoOn[index]"
      >
        <div
          :class="[
            'menu2ti',
            'cc-display',
            'font-c-8',
            { menuSelect: currentMenu === $lodash.toLower(item.menuvalue) },
          ]"
          @click="changeMenu(item.menuvalue)"
        >
          <i
            :class="[menuIcon[item.menuvalue], 'font-s-22']"
            style="margin: 2px 6px 0 0"
          ></i>
          <span class="font-s-18 font-ls-2 font-w-4 t-shdow-2-1">{{
            item.meunname
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuList",
  props: {
    textinfo: String,
  },
  data() {
    return {
      /** 菜单列表 */
      menulist: [],
      /** 控制一级菜单是否展开 */
      menuTwoOn: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      /** 菜单图标  */
      menuIcon: {
        firstPage: "el-icon-menu",
        myInformation: "el-icon-s-data",
        sysPage: "el-icon-s-tools",
        classPage: "el-icon-document-copy",
        personPage: "el-icon-user",
        articlePage: "el-icon-notebook-1",
        noticePage: "el-icon-bell",
      },
    };
  },

  mounted() {
    // 查询菜单列表
    this.getUserMenuList();
    // 根据本地存储判断菜单列表是否展开
    if (localStorage.getItem("userMenu")) {
      this.menuTwoOn = JSON.parse(localStorage.getItem("userMenu"));
    }
  },

  computed: {
    // 当前选中的菜单
    currentMenu() {
      // 当前选中的菜单被保存再本地时
      if (localStorage.getItem("userPage")) {
        this.$store.commit(
          "user/changeAccountPage",
          localStorage.getItem("userPage")
        );
        this.changeMenu(localStorage.getItem("userPage"));
      }
      return this.$store.state.user.accountPage;
    },
  },
  methods: {
    /**
     * @method changeMenu 一级菜单点击事件，二级菜单是否隐藏
     * @param {*} info
     */
    menuOneClick(info, menuvalue) {
      // console.log(info, menuvalue);
      // 点击内容总览
      if (menuvalue == "firstPage" || menuvalue == "all") {
        // 当前页不是内容总览
        if (this.$route.path != "/account/firstpage") {
          // 跳转到内容总览页面
          this.$router.push("/account/firstpage");
          this.$store.commit("user/changeAccountPage", "firstpage");
          localStorage.setItem("userPage", "firstpage");
        }
        return;
      }
      // 展开或收起 非 "内容总览" 一级菜单
      this.$set(
        this.menuTwoOn,
        info,
        this.menuTwoOn[info] == false ? true : false
      );
      // 菜单是否展示
      localStorage.setItem("userMenu", JSON.stringify(this.menuTwoOn));
    },

    /**
     * @method changeMenu 二级菜单点击事件
     */
    changeMenu(val) {
      this.$router.push("/account/" + this.$lodash.toLower(val));
      this.$store.commit("user/changeAccountPage", this.$lodash.toLower(val));
      localStorage.setItem("userPage", this.$lodash.toLower(val));
    },

    /**
     * @method getUserMenuList && 查询用户菜单列表
     */
    getUserMenuList() {
      this.$uapi
        .get("api/loginService/menu")
        .then((res) => {
          let data = res?.data?.data || undefined;
          // console.log(data)
          if (data) {
            this.menulist = data;
          }
        })
        .catch((err) => {
          // console.log(err)
        });
    },
  },
};
</script>

<style scoped lang="less">
// 一级菜单 外框
.menuWidth1 {
  width: 100%;
  height: 70px;
}

// 一级菜单 图片及文字
.menu1ti {
  width: 160px;
  height: 60px;
  cursor: pointer;
  border-radius: 10px;
  background-color: #fff;
  &:hover {
    background-color: #eee;
  }
}

// 二级菜单外框
.menuWidth2 {
  width: 100%;
  height: 60px;
}
// 二级菜单外框
.menu2ti {
  width: 160px;
  height: 50px;
  cursor: pointer;
  border-radius: 10px;
  background-color: #fff;
  &:hover {
    background-color: #eee;
  }
}

.menuSelect {
  background-color: #eee;
  color: #409eff;
}
</style>
