const Product = require('../models/productsModel')
const { getPostData } = require('../helpers')

//GET ALL PRODUCTS
async function getProducts(req, res) {
    try {
        const products = await Product.findAll()
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(products))
    } catch (error) {
        console.log(error)
    }
}

//GET SINGLE PRODUCT 
async function getProduct(req, res, id) {
    try {
        const product = await Product.findById(id)

        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Product Not Found' }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(product))

        }
    } catch (error) {
        console.log(error)
    }
}

//CREATE A POST 
//POST REQUEST 
async function createProduct(req, res) {
    try {
        const body = await getPostData(req)

        const { title, description, price } = JSON.parse(body)

        const product = {
            title,
            description,
            price
        }

        const newProduct = await Product.create(product)

        res.writeHead(201, { 'Content-Type': 'Application/json ' })
        return res.end(JSON.stringify(newProduct))

    } catch (error) {
        console.log(error)
    }
}

//UPDATE A POST 
//PUT REQUEST 
async function updateProduct(req, res, id) {
    try {
        const product = await Product.findById(id)

        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Product Not Found' }))
        } else {
            const body = await getPostData(req)

            const { title, description, price } = JSON.parse(body)

            const productData = {
                title: title || product.title,
                description: description || product.description,
                price: price || product.price
            }

            const updProduct = await Product.update(id, productData)

            res.writeHead(200, { 'Content-Type': 'Application/json ' })
            return res.end(JSON.stringify(updProduct))
        }
    } catch (error) {
        console.log(error)
    }
}
//DELETE PRODUCT 
async function deleteProduct(req, res, id) {
    try {
        const product = await Product.findById(id)

        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Product Not Found' }))
        } else {
            await Product.remove(id)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: `Product ${id} has been deleted` }))

        }
    } catch (error) {
        console.log(error)
    }
}



module.exports =
{
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}