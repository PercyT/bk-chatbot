/**
 * @file router 配置
 * @author
 */

import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store'
import http from '@/api'
import preload from '@/common/preload'
const Main = () => import(/* webpackChunkName: 'entry' */'@/views/main')
const MainEntry = () => import(/* webpackChunkName: 'entry' */'@/views')
const NotFound = () => import(/* webpackChunkName: 'none' */'@/views/404')
const BotList = () => import(/* webpackChunkName: 'entry' */'@/views/bot')
const IntentList = () => import(/* webpackChunkName: 'entry' */'@/views/intent/list')
const KnowledgeBase = () => import(/* webpackChunkName: 'entry' */'@/views/admin/knowledge')
const Group = () => import(/* webpackChunkName: 'entry' */'@/views/group')
const Form = () => import(/* webpackChunkName: 'entry' */'@/views/form/form')
const Corpus = () => import(/* webpackChunkName: 'entry' */'@/views/corpus/list/')
const Corpusid = () => import(/* webpackChunkName: 'entry' */'@/views/corpus/create/')
const PluginMarket = () => import(/* webpackChunkName: 'entry' */'@/views/market/list/')
const PluginWorkspace = () => import(/* webpackChunkName: 'entry' */'@/views/workspace/list/')
const Chat = () => import(/* webpackChunkName: 'entry' */'@/views/chat/')
Vue.use(VueRouter)

const routes = [
  {
    path: window.PROJECT_CONFIG.SITE_URL,
    name: 'appMain',
    component: MainEntry,
    alias: '',
    children: [
      {
        path: 'index',
        alias: '',
        name: 'index',
        component: Main,
        meta: {
          matchRoute: '首页'
        }
      },
      {
        path: 'bot/list',
        name: 'bot-list',
        component: BotList,
        meta: {
          matchRoute: '触发器'
        }
      },
      {
        path: 'intent/list',
        name: 'intent-list',
        component: IntentList,
        meta: {
          matchRoute: '技能中心'
        }
      },
      {
        path: 'group/bind',
        name: 'group-bind',
        component: Group,
        meta: {
          matchRoute: '业务群'
        }
      },
      {
        path: 'h5/:id/',
        name: 'h5',
        component: Form,
        meta: {
          matchRoute: '自定义表单'
        }
      },
      {
        path: 'h5',
        name: '404',
        component: NotFound
      },
      {
        path: 'admin/knowledge-base',
        name: 'admin-knowledge-base',
        component: KnowledgeBase,
        meta: {
          matchRoute: '知识库'
        }
      },
      {
        path: 'corpus/list',
        name: 'corpus-list',
        component: Corpus,
        meta: {
          matchRoute: '语料管理'
        }
      },
      {
        path: 'corpus/list/:id/',
        name: 'corpus-list',
        component: Corpusid,
        meta: {
          matchRoute: '语料管理'
        }
      },
      {
        path: 'plugin/market',
        name: 'plugin-market',
        component: PluginMarket,
        meta: {
          matchRoute: '插件市场'
        }
      },
      {
        path: 'plugin/workspace',
        name: 'plugin-workspace',
        component: PluginWorkspace,
        meta: {
          matchRoute: '插件工作台'
        }
      },
      {
        path: 'chat',
        name: 'chat',
        component: Chat,
        meta: {
          matchRoute: '聊天'
        }
      }
    ]
  },
  // 404
  {
    path: '404',
    name: '404',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

const cancelRequest = async () => {
  const allRequest = http.queue.get()
  const requestQueue = allRequest.filter(request => request.cancelWhenRouteChange)
  await http.cancel(requestQueue.map(request => request.requestId))
}

let preloading = true
let canceling = true
let pageMethodExecuting = true

router.beforeEach(async (to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  canceling = true
  await cancelRequest()
  canceling = false
  next()
})

router.afterEach(async (to, from) => {
  store.commit('setMainContentLoading', true)

  preloading = true
  await preload()
  preloading = false

  const pageDataMethods = []
  const routerList = to.matched
  routerList.forEach(r => {
    Object.values(r.instances).forEach(vm => {
      if (typeof vm.fetchPageData === 'function') {
        pageDataMethods.push(vm.fetchPageData())
      }
      if (vm.$options.preload === 'function') {
        pageDataMethods.push(vm.$options.preload.call(vm))
      }
    })
  })

  pageMethodExecuting = true
  await Promise.all(pageDataMethods)
  pageMethodExecuting = false

  if (!preloading && !canceling && !pageMethodExecuting) {
    store.commit('setMainContentLoading', false)
  }
})

export default router
