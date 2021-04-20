const { json } = require('express')
const express = require('express')
const { verifyUser } = require('../middleware/auth')
const router = express.Router()

const Item = require('../models/item')
const User = require('../models/user')
const cart = require('../models/cart');
const date = new Date().toLocaleDateString("en-US").split("/").toString()
const auth = require('../middleware/auth');

router.get('/cart', verifyUser, function (req, res, next) {
    const uid = req.userInfo._id
    cart.findOne({ userId: uid }).then(cart => {
        if (cart) {
            res.json(cart)
        } 
    }
    ).catch(err => {next(err)
    console.log("erer",err)});

})


router.route('/cart').post(verifyUser, (req, res, next) => {
    const uid = req.userInfo._id

    User.findById({ _id: uid }).then(user => {
        cart.findOne({ userId: user._id }).then(result => {
            console.log("result",result)
            if (result===null) {
                const cartItem = new cart({  
                    product:[{
                    productId:req.body.productId,
                    productName: req.body.productName,
                    productPrice: req.body.productPrice,
                    productImage: req.body.productImage,
                    productPrice: req.body.productPrice,
                    quantity: req.body.quantity,
                    total: req.body.productPrice * req.body.quantity
                    }],
                    userId:user._id
                    })
                cartItem.save().then(cartResult => {
                    res.json(cartResult)
                }).catch(error => next(error))
            }
            else{
                cart.findOneAndUpdate({userId:uid},{$push:{
                    product:[{
                        productId:req.body.productId,
                        productName: req.body.productName,
                        productPrice: req.body.productPrice,
                        productImage: req.body.productImage,
                        productPrice: req.body.productPrice,
                        quantity: req.body.quantity,
                        total: req.body.productPrice * req.body.quantity
                        }]
                }},{new:true}).then(update => {
                    res.json(update)
                }).catch(error=> next(error))
            }

        }).catch(error => next(error))


    }).catch(error => next(error))
})



router.get('/cart/show', verifyUser, function (req, res) {
    const id = req.userInfo._id

    product.find({ UserId: _id }).populate('UserId').populate('ProductId').then(function (data) {
        console.log(data)
        let total = 0
        data.map((item) => {

            let qty = item.Qty
            let price = item.ProductId.price;
            total += price * qty

        })
        res.status(200).json({ data: data, total: total })
    }).catch()
})

router.delete('/cart/delete/:id', auth.verifyUser, function (req, res, next) {
    const id = req.params.id
    const userid = req.userInfo._id;
    console.log(userid)
    let prdlist = [];
    let newlist = [];

    cart.find({ userId: userid }).then(result => {
        let cart_id = result[0]._id;
        cart.findById(cart_id).then(result => {
            // res.json(result.product)
            let newProducts = [];
            result.product.forEach(row => {
                if (row._id != req.params.id) {
                    newProducts.push(row);
                }

            });
            result.product = newProducts;
            result.save().then(result => {
                res.json(result);
            })

        })
    }).catch(err => next(err));

})


module.exports = router;