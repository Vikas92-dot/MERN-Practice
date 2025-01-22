import Product from "../model/Product.js";
export const editProductAction = (request,response,next)=>{
    let {id,title,price} = request.body;
    let p = new Product(id,title,price);
    p.update()
    .then(result=>{
        response.redirect("/product/view-product");
    }).catch(err=>{
        console.log(err);   
    })
}
export const editProductPage = async (request,response,next)=>{
   try{ 
    let productId = request.params.productId;
    let result  = await Product.getProductById(productId);
    console.log(result[0]);
    return response.render("edit-product.ejs",{product: result[0]});
   }
   catch(err){
    console.log(err);
   }
}
export const deleteProduct = (request,response,next)=>{
    let productId = request.params.productId;
    Product.delete(productId)
    .then(result=>{
        return response.redirect("/product/view-product");
    }).catch(err=>{
        console.log(err);
    })
}
export const viewProductPage = async (request,response,next)=>{
   try{ 
    let result = await Product.getProduct();
    return response.render("view-product.ejs",{productList: result});
   }
   catch(err){
    console.log(err);
   }
}
export const addProductPage = (request,response,next)=>{
    response.render("add-product.ejs");
}

export const addProductAction = (request,response,next)=>{
    let {title,price} = request.body;    
    let p = new Product(null,title,price);
    p.save()
    .then(result=>{
        //console.log(result);
      response.redirect("/product/add-product");
    }).catch(err=>{
        console.log(err);
    })
}