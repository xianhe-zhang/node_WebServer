const { 
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog } = require("../controller/blog")
const {SuccessModel, ErrorModel} = require('../model/resModel')

const handleBlogRouter = (req, res) => {
  const method = req.method // GET POST
  const id = req.query.id //可以通用ID


  //获取博客列表
  if (method === 'GET' && req.path ==='/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    const listData = getList(author,keyword)
    return new SuccessModel(listData)

    // return {
    //   msg:'这是获取博客列表的接口'
    // }
  }

  //获取博客详情
  if(method === 'GET' && req.path === '/api/blog/detail') {
    const data = getDetail(id)
    return new SuccessModel(data)
  }

  
    //新建博客
  if(method === 'POST' && req.path === '/api/blog/new') {
    const blogData = req.body
    const data = newBlog(req.body)
    return new SuccessModel(data)
    
  }

    //更新博客
    if(method === 'POST' && req.path === '/api/blog/update') {
       const result = updateBlog(id, req.body)
       if (result) {
         return new SuccessModel()
       } else {
         return new ErrorModel('更新失败')
       }
    }


    //删除博客
    if(method === 'POST' && req.path === '/api/blog/del') {
      const result = delBlog(id, req.body)
      if (result) {
        return new SuccessModel()
      } else {
        return new ErrorModel('del失败')
      }
    }
}

module.exports = handleBlogRouter