const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
    // const product = await Product.create(req.body);
    // res.status(201).json(product);

    try {

        const exists = await Product.exists();

        let nextId = 0;

        if(!exists) {
            console.log('Collection is empty');
            nextId = 1;
        } else {
             // find the last product _id
            const lastProduct = await Product.find()
                .sort({ _id: -1 }).limit(1)
                .select("_id");
            // console.log(lastProduct[0]._id);
            nextId = lastProduct ? lastProduct[0]._id + 1 : 1;
        }
       
        const product = await Product.create({
            _id: nextId, ...req.body
        })
        return res.status(201).json(product);
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
};

exports.getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
}

exports.updateProduct = async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body,
        { new: true }
    );
    res.json(product);
}

exports.deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
}

exports.getProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.json(product);
}