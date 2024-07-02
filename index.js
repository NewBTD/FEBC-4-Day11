const express = require('express')
const app = express()
const port = 3000
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/page2', (req, res) => {
  let q = req.query.search_query
  res.render('page2',{q})
})

let products = []
for (let i = 1; i <= 100; i++) {
  let product = {
    id: i,
    name: `Product ${i}`,
    description: `This is product ${i}`,
    price: (Math.random() * 100).toFixed(2)
  }
  products.push(product)
}

app.get('/product',(req,res)=>{
  let limit = parseInt(req.query.limit) || 10
  let page = parseInt(req.query.page) || 1
  //page = 1, page = 2
  let startIndex = (page - 1) * limit
  let endIndex = page * limit
  let paginatedProduct = products.slice(startIndex,endIndex)
  res.render("product",{paginatedProduct, limit, page})
})
app.get('/add-product',(req,res)=>{
  res.render('add-product')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
