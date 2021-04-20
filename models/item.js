const mongoose=require('mongoose');

const Item=mongoose.model("Item",{
        itemName : {
            type : String,
            required : [true,'Enter food name']
        },
        itemType : {
            type : String,
            required : [true,'Enter food type']
        },
    
        itemPrice: {
            type: String,
            required : [true,'Enter food price']
            },
        
        itemRating: {
            type: String
        },
        itemImage: {
            type: String,
            default: "no-photo.jpg",
          }
         
})

module.exports=Item;