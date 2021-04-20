const Item = require('../models/item');

const mongoose=require('mongoose');


const url = 'mongodb://127.0.0.1:27017/RB_API_Final';

beforeAll(async() =>{
    await mongoose.connect(url, {
    useNewUrlParser:true,
    useCreateIndex:true
    });
    });

    afterAll(async() =>{
        await mongoose.connection.close();
        });




        //for insert 
        // describe('item  Schema testanything', () =>{ // the code below is for insert testing
        //     it('Add item testing anything', () =>{
        //     const item= {
        //         itemName :'fgh',
        //         itemType:'rtyu',
        //         itemPrice:"5687",
        //         itemRating :"122",
        //         itemImage:"bhh",
            
        //     };
        //     return Item.create(item)
        //         .then((pro_ret) =>{
        //         expect(pro_ret.itemName).toEqual('fgh');
        //     });
        //     });


        // })
        it('to test the update', async() =>{
        return Item.findOneAndUpdate({_id :Object('607eb914fa4bd419d08848a0')},
             {$set :{itemName:'daley'}})
                .then((fdn)=>{
            expect(fdn.itemName).toEqual('fgh')
            })
             });