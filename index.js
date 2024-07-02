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
  res.render('page2', { q })
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

app.get('/product', (req, res) => {
  let limit = parseInt(req.query.limit) || 10
  let page = parseInt(req.query.page) || 1
  //page = 1, page = 2
  let startIndex = (page - 1) * limit
  let endIndex = page * limit
  let paginatedProduct = products.slice(startIndex, endIndex)
  res.render("product", { paginatedProduct, limit, page })
})
app.get('/add-product', (req, res) => {
  res.render('add-product')
})
app.get('/edit-product/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  if (!product) {
    res.status(404).send('Product not found');
  } else {
    res.render('edit-product', { product });
  }
})
app.post('/edit-product', (req, res) => {
  const { id, name, description, price } = req.body;
  const productId = parseInt(id);
  const index = products.findIndex(p => p.id === productId);
  if (index === -1) {
    res.status(404).send('Product not found');
  } else {
    products[index] = { id, name, description, price };
    res.redirect('/product');
  }
})

app.post('/add-product', (req, res) => {
  // const { id, name, description, price } = req.body;
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;
  const newProduct = {
    id: products.length + 1,
    name,
    description,
    price
  };
  products.push(newProduct);
  res.redirect('/product');
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
