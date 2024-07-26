const Product = require('../models/product.model.js');

exports.encuentraProductoPorSku = async (sku) => {
  try {
    const product = await Product.findOne({ sku });
    return product;
  } catch (error) {
    console.log('Error encontrando un producto por SKU: ' + error.message);
    throw new Error('Error encontrando un producto por SKU: ' + error.message);
  }
};

exports.darAlta = async (data) => {
  try {
    const newProduct = new Product(data);
    await newProduct.save();
    return newProduct;
  } catch (error) {
    console.log('Error dando de alta un producto: ' + error.message);
    throw new Error('Error dando de alta un producto: ' + error.message);
  }
};

exports.darBaja = async (sku) => {
  try {
    const product = await this.encuentraProductoPorSku(sku);
    product.descontinuado = true;
    product.fechaBaja = Date.now();

    const updatedProduct = await product.save();
    return updatedProduct;
  } catch (error) {
    console.log('Error dando de baja por SKU: ' + error.message);
    throw new Error('Error dando de baja por SKU: ' + error.message);
  }
};

exports.hacerCambio = async ({ sku, ...data }) => {
  try {
    const product = await this.encuentraProductoPorSku(sku);
    const keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      product[keys[i]] = data[keys[i]];
    }
    const updatedProduct = await product.save();
    return updatedProduct;
  } catch (error) {
    console.log('Error haciendo cambios en el producto: ' + error.message);
    throw new Error('Error haciendo cambios en el producto: ' + error.message);
  }
};