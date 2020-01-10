import request from './request'

/**
 * 榜单：
 * Top 250：
 *  接口地址: top250
 *  要求权限：movie_basic_r
 *  可传参数：
 *    @params {number} start=0 开始索引
 *    @params {number} count=20 获取数量
 *
 * 北美票房榜：
 *  接口地址：us_box
 *  要求权限：movie_basic_r
 *
 * 正在上映：
 *  接口地址: in_theaters
 *  要求权限：movie_premium_r
 *  可传参数：
 *    @params {number} start=0 开始索引
 *    @params {count} count=20 获取数量
 *    @params {string} city=北京 城市
 *
 * 即将上映：
 *  接口地址: coming_soon
 *  要求权限：movie_premium_r
 *  可传参数：
 *    @params {number} start=0 开始索引
 *    @params {number} count=20 获取数量
 *
 * 口碑榜 -> weekly （movie_advance_r）
 * 新片榜 -> new_movies（movie_advance_r）
 */
export function getBoardData ({board = 'top250', page = 1, count = 20, city = '北京', search = ''} = {}) {
  let params = {}
  if (board !== 'us_box') {
    params.start = (page - 1) * count
    params.count = count
  }
  if (board === 'in_theaters') {
    params.city = city
  }
  if (board === 'search') {
    params.q = search
  }
  return request.get(`/movie/${board}`, params)
}

// 通过isbn获取书本信息
export function getBookDataIsbn (isbn) {
  return request.get(`/book/isbn/${isbn}`)
}

// 通过id获取系列图书
export function getBookSeriesData ({id, count = 20, page = 1, search = ''} = {}) {
  let params = {}
  params.start = (page - 1) * count
  params.count = count
  if (id === 'search') {
    params.q = search
    return request.get(`book/search`, params)
  }
  return request.get(`/book/series/${id}/books`, params)
}

export function getBookDataId (id) {
  return request.get(`/book/${id}`)
}
// 通过isbn添加书本到数据库
export function addBook (isbn) {
  return request.get(`/addbook?isbn=${isbn}`)
}


export function getMovieData (id) {
  return request.get(`/movie/subject/${id}`)
}
