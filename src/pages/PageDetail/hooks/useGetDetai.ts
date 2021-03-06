import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getArticleDetail } from '@/service/article'
import { useLoadingBar } from 'naive-ui'
const loadText = '... 加载中'

export function useGetDetail() {
  const loadingBar = useLoadingBar()
  const route = useRoute()
  const { articleId } = route.params
  const tag = ref(4)
  const likeCount = ref(0)
  const content = ref(loadText)
  const authorName = ref(loadText)
  const createTime = ref(loadText)
  const title = ref(loadText)
  const userId = ref(-1)

  async function getDetail() {
    // 开始加载
    loadingBar.start()
    const detail = await getArticleDetail(parseInt(articleId as string))

    loadingBar.finish()
    tag.value = detail.tag
    likeCount.value = detail.likeCount || 0
    authorName.value = detail.authorName
    createTime.value = detail.createTime
    title.value = detail.title
    content.value = detail.content
  }

  getDetail()

  return { content, tag, likeCount, authorName, createTime, title, articleId }
}
