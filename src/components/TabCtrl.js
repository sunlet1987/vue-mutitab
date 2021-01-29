import router from '../router' // app路由配置文件
import Vue from 'vue'

const maxTab = 6; // tab打开最大数量配置
const defaultTab = { // 默认打开页面
  title: '首页',
  routerName: 'home.index',// 路由名称
  routerParams: null, // 路由参数
  closable: false
};

Vue.mixin({
  activated() {
    let title = "新页面";
    if (this.$route.meta && this.$route.meta.title) title = this.$route.meta.title;
    else {
      console.warn("您还未配置该路由的Tab页面显示的标题！{meta:{tile:'页面名称'}}")
    }
    if (!this.$route.name) throw "您未配置该页面路由名称 {name}"
    this.$store.commit('tab/OpenTab', {
      routerName: this.$route.name,
      routerParams: this.$route.params,
      title: title,
      component: this
    })
  }
})

const removeComponent = (component) => {
  if (component.$vnode && component.$vnode.data.keepAlive) {
    if (component.$vnode.parent && component.$vnode.parent.componentInstance && component.$vnode.parent.componentInstance.cache) {
      if (component.$vnode.componentOptions) {
        const key = component.$vnode.key == null
          ? component.$vnode.componentOptions.Ctor.cid + (component.$vnode.componentOptions.tag ? `::${component.$vnode.componentOptions.tag}` : '')
          : component.$vnode.key;
        const cache = component.$vnode.parent.componentInstance.cache;
        const keys = component.$vnode.parent.componentInstance.keys;
        if (cache[key]) {
          if (keys.length) {
            const index = keys.indexOf(key);
            if (index > -1) {
              keys.splice(index, 1);
            }
          }
          delete cache[key];
        }
      }
    }
  }
  component.$destroy();
}


export default {
  namespaced: true,
  state: {
    isRouterAlive: true,
    CurTabIndex: 1,
    Tabs: [defaultTab]
  },
  mutations: {
    ActiveTab(state, index) {
      let routerConfig = { name: state.Tabs[index].routerName };
      if (state.Tabs[index].routerParams) routerConfig.params = state.Tabs[index].routerParams;
      router.push(routerConfig);
    },
    OpenTab(state, tab) {
      tab.closable = true;
      const item = state.Tabs.find(t => t.routerName === tab.routerName);
      if (item) {
        if (tab.routerParams) item.routerParams = tab.routerParams;
        if (tab.component) item.component = tab.component;
        state.CurTabIndex = state.Tabs.indexOf(item);
      } else {
        state.Tabs.push(tab);
        if (state.Tabs.length > maxTab) {
          removeComponent(state.Tabs[1].component);
          state.Tabs.splice(1, 1);
        }
        state.CurTabIndex = state.Tabs.length - 1;
      }
    },
    DelTab(state, index) {
      removeComponent(state.Tabs[index].component); // 删除缓存和销毁组件
      state.Tabs.splice(index, 1);
      if (state.CurTabIndex === index) {
        if (state.CurTabIndex === 0) {
          if (!state.Tabs.length) {
            router.push('/');
            return;
          }
        } else {
          if (state.Tabs.length === 1 || state.CurTabIndex !== 1)
            state.CurTabIndex--;
        }
        router.push({
          name: state.Tabs[state.CurTabIndex].routerName,
          params: state.Tabs[state.CurTabIndex].routerParams
        });//页面跳转

      } else {
        if (index < state.CurTabIndex) state.CurTabIndex--;
      }
    },
    DelCache(state, routerName) {
      const item = state.Tabs.find(t => t.routerName === routerName);
      if (item && item.component) removeComponent(item.component);
    },
    Flush(state) {//刷新当前路由
      if (state.isRouterAlive) {
        removeComponent(state.Tabs[state.CurTabIndex].component); // 删除缓存和销毁组件
      }
      state.isRouterAlive = !state.isRouterAlive;
    }
  },
  actions: {
    reflush({ commit, state }) { // 刷新当前路由
      commit('Flush');
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('Flush');
          resolve()
        }, 0)
      })
    }
  }
}
