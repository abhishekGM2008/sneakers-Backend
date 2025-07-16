const {projectData} = require("./db/db.connect")
projectData();

const Address = require("./models/address.models")
const CartAdded = require("./models/cartAdded.models")
const SneakersOrderHistory = require("./models/orderHistory.models")
const Sneakers = require("./models/products.models")
const WishListAdded = require("./models/wishlistAdded.models")

const express = require("express")
const app = express()
app.use(express.json())

const cors = require("cors")
const corsOrigin = {
    origin: '*',
    credential: true
}
app.use(cors(corsOrigin))

const PORT = 3000
app.listen(PORT, (req, res) => {
    console.log("Server is running on", PORT)
})

//to get..
app.get("/", (req, res) => {
    res.send("Hey Hi ,This is a backend page for Project Sneakers related e-commerce , just type in /allProducts to view all products data that stored in backend. Thank you for visiting this amazing site..")
})

//APIs from now 
//1. to create/add new sneakers..
const addSneakers = async (newProduct) => {
    try{
        if (Array.isArray(newProduct)) {
            const savedProducts = await Sneakers.insertMany(newProduct);
            return savedProducts;
        } else {
            const newSneakersPosting = new Sneakers(newProduct);
            const savingProduct = await newSneakersPosting.save();
            return savingProduct;
        }
        //const newSneakersPosting = new Sneakers(newProduct)
        //const savingProduct = await newSneakersPosting.save()
        //return savingProduct
    } catch(error) {
        console.log("error occured while posting new Sneakers.", error)
    }
}

app.post("/sneakers/add", async (req, res) => {
    try{
        const product = await addSneakers(req.body)
        if(product){
            res.status(201).send({message: "New Sneakers added", data: product})
        } else {
            res.status(404).send({error: "Something is error"})
        }
    } catch(error){
        res.status(500).send({error: "Failed to add new Sneakers"})
    }
})

//2. to get all Sneakers data..
const getAllSneakers = async () => {
    try{
        const allSneakers = await Sneakers.find()
        return allSneakers
    } catch(error) {
        console.log("Error occured while getting all products" ,error)
    }
}

app.get("/sneakers/all" , async (req, res) => {
    try{
        const sneakers = await getAllSneakers()
        if(sneakers.length > 0) {
            res.status(200).send({message: "All Sneakers FOund.", data: sneakers})
        } else {
            res.status(404).send({error: "No Sneakers Found."})
        }
    } catch(error){
        res.status(500).send({error: "Failed to get Sneakers."})
    }
})

//3. Find Sneakers by id
const getSneakersById = async (sneakersId) => {
    try{
        const sneakers = await Sneakers.findById(sneakersId)
        return sneakers
    } catch(error){
        console.log("error occured while getting Sneakers.", error)
    }
}

app.get("/sneakers/id/:sneakersId", async (req, res) => {
    try{
        const sneakers = await getSneakersById(req.params.sneakersId)
        if(sneakers){
            res.status(200).send({message: "Sneakers Found", data: sneakers})
        }else {
            res.status(404).send({error: "No Sneakers Found."})
        }
    } 
    catch(error){
        res.status(500).send({error: "Failed to find the sneakers."})
    }
})

//4. To Update Sneakers By Id..
const updateSneakers = async (sneakersId , updateDetails) => {
    try{
        const updatedSneakers = await Sneakers.findByIdAndUpdate(sneakersId, updateDetails, {new: true})
        const saveSneakers = await updatedSneakers.save()
        return saveSneakers
    } catch(error){
        console.log("Error occured while updating products", error)
    }
}

app.post("/sneakers/update/:sneakersId", async (req, res) => {
    try{
        const sneakersUpdated = await updateSneakers(req.params.sneakersId , req.body)
        if(sneakersUpdated){
            res.status(200).send({message: "Sneakers updated successfully", data: sneakersUpdated})
        } else {
            res.status(404).send({error: "No Sneakers Found."})
        }
    } catch(error){
        res.status(500).send({error: "Failed to Update Sneakers data."})
    }
})

//5.To Delete Sneakers By Id..
const deleteSneakers = async(sneakersId) => {
    try{
        const deletedSneakers = await Sneakers.findByIdAndDelete(sneakersId, {new: true})
        return deletedSneakers
    }
    catch(error){
        console.log("Failed to delete the Sneakers.", error)
    }
}

app.delete("/sneakers/delete/:sneakersId", async (req, res) => {
    try{
        const sneakers = await deleteSneakers(req.params.sneakersId)
        if(sneakers){
            res.status(200).send({message: "Sneakers deleted successfully."})
        } else {
            res.status(404).send({error: "Sneakers Not Found."})
        }
    } catch(error){
        res.status(500).send({error: "Failed to delete the sneakers."})
    }
})

//6. To add Sneakers to Wishlist..
const addWishlist = async (wishlistSneakers) => {
    try{
        const sneakersInWishlist = new WishListAdded(wishlistSneakers)
        const savingWishlist = await sneakersInWishlist.save()
        return savingWishlist
    } catch (error) {
        console.log("Error occured while adding Sneakers to Wishlist.", error)
    }
}

app.post("/sneakers/wishlist/add", async (req, res) => {
    try{
        const wishlist = await addWishlist(req.body)
        if(wishlist){
            res.status(200).send({message: "New Sneakers added to wishlist."})
        } else {
            res.status(404).send({error: "No Sneakers found."})
        }
    } catch(error) {
        res.status(500).send({error: "Failed to add new product to wishlist."})
    }
})

//7. API for get all wishlist products..
const getWishlistSneakers = async () => {
    try{
        const wishlistSneakers = await WishListAdded.find().populate(sneakersInWishlist)
        return wishlistSneakers
    } 
    catch(error){
console.log("Error occured while getting wishlist Sneakers", error)
    }
}

app.get("/sneakers/wishlist/get", async(req, res) => {
    try{
        const sneakersWishlist = await getWishlistSneakers()
        if(sneakersWishlist.length > 0){
            res.status(200).send({message: "All Wishlisted Sneakers are found", data: sneakersWishlist})
        } else {
            res.status(404).send({error: "No wishlist Sneakers Found."})
        }
    } catch(error){
        res.status(500).send({error: "Failed to get wishlisted Sneakers."})
    }
})

//8. API for delete wishlist Sneakers..
const deleteWishlist = async(sneakersId) => {
    try{
        const deletedWishlistSneakers = await WishListAdded.findByIdAndDelete(sneakersId).populate(sneakersInWishlist)
        return deletedWishlistSneakers
    }
    catch(error){
        console.log("Error occured while deleting the sneakers from wishlist.", error)
    }
}

app.delete("/sneakers/wishlist/delete/:sneakersId", async(req, res) => {
    try{
        const sneakersWishlistDelete = await deleteWishlist(req.params.sneakersId)
        if(sneakersWishlistDelete){
            res.status(200).send({message: "Sneakers from Wishlist deleted successfully.", data: sneakersWishlistDelete})
        } else {
            res.status(404).send({error: "failed to delete the sneakers from wishlist"})
        }
    } catch(error){
        res.status(500).send({error: "Failed to delete the sneakers from wishlist."})
    }
})

//9.API to add Sneakers to the cart..
const addCart = async(cartSneakers) => {
    try {
    const addSneakersCart = new CartAdded(cartSneakers)
    const savedCart = await addSneakersCart.save()
    return savedCart
    }
    catch(error) {
        console.log("error occured while adding new Sneakers to Cart.")
    }
}

app.post("/sneakers/cart/add", async(req, res) => {
    try{
        const sneakersCart = await addCart(req.body)
        if(sneakersCart){
            res.status(200).send({message: "sneakers successfully added to Cart."})
        } else {
            res.status(404).send({error: "Failed to found the Sneakers."})
        }
    } 
    catch(error) {
        res.status(500).send({error: "Failed to add Sneakers to the Cart."})
    }
})

//10. API to get all Sneakers from Cart..
const getCartSneakers = async() => {
    try{
        const getCart = await CartAdded.find().populate(sneakersInCart)
        return getCart
    } 
    catch(error){
        console.log("Error occured while Getting Sneakers from Cart.")
    }
}

app.get("/sneakers/cart/get", async(req, res) => {
    try{
        const cartSneakers = await getCartSneakers()
        if(cartSneakers.length > 0) {
            res.status(200).send({message: "All Sneakers from cart are found.", data: cartSneakers})
        } else {
            res.status(400).send({error: "No Sneakers from cart are found"})
        }
    }
    catch(error) {
        res.status(500).send({error: "Failed to Found the Sneakers from the Cart."})
    }
})

//11. API for delete the Sneakers from the Cart.
const deleteSneakersCart = async(sneakersId) => {
    try{
        const deletedCartSneakers = await CartAdded.findByIdAndDelete(sneakersId).populate(sneakersInCart)
        return deletedCartSneakers
    }
    catch(error) {
        console.log("error occured while deleting the sneakers from the Cart.", error)
    }
}

app.delete("/sneakers/cart/delete/:sneakersId", async(req, res) => {
    try{
        const sneakersCartDelete = await deleteSneakersCart(req.params.sneakersId)
        if(sneakersCartDelete.length > 0) {
            res.status(200).send({message: "Sneaker from the Cart deleted successfully", data: sneakersCartDelete})
        } else {
            res.status(404).send({error: "failed to find the sneakers"})
        }
    }
    catch(error) {
        res.status(500).send({error: "Failed to delete the sneakers from the Cart."})
    }
})

//12. API for add address..
const addUserAddress = async(addAddress) => {
    try{
        const addressAdded = new Address(addAddress)
        const savedAddress = await addressAdded.save()
        return savedAddress
    }
    catch(error){
        console.log("Error occured while Addeding the Address", error)
    }
}

app.post("/sneakers/address/add", async(req, res) => {
    try{
        const addressAdd = await addUserAddress(req.body)
        if(addressAdd){
            res.status(200).send({message: "Address Added successfully", data: addressAdd})
        } else {
            res.status(404).send({error: "Failed to found Address."})
        }
    }
    catch(error) {
        res.status(500).send({error: "Failed to delete the Address"})
    }
})

//13.API to get all address..
const getAddress = async() => {
    try{
        const addressFound = await Address.find()
        return addressFound
    }
    catch(error) {
        console.log("Error to get Address.", error)
    }
} 

app.delete("/sneakers/address/get", async(req, res) => {
    try{
        const foundedAddress = await getAddress(req.body)
        if(foundedAddress.length > 0){
            res.status(200).send({message: "All Address are found. ", data: foundedAddress})
        } else {
            res.status(404).send({error: "Failed to find the address"})
        }
    }
    catch(error){
        res.status(500).send({error: "Error occured while getting the address."})
    }
})

//14.API to delete the address.
const addressDelete = async(addressId) => {
    try{
        const deletedAddress = await Address.findByIdAndDelete(addressId, {new: true})
        return deletedAddress
    }
    catch(error){
        console.log("error occured while deleting the address.", error)
    }
}

app.delete("sneakers/address/delete/:sneakersId", async(req, res) => {
    try{
        const addressDeleted = await addressDelete(req.params.addressId)
        if(addressDeleted.length > 0) {
            res.status(200).send({message: "Address deleted successfully", data: addressDeleted})
        } else {
            res.status(404).send({error: "Failed to find the Address." })
        }
    }
    catch(error){
        res.status(500).send({error: "Failed to the delete Address."})
    }
})

//15. API to add order Sneakers.
const addOrderSneakers = async(orderSneakers) => {
    try{
        const sneakersOrder = new SneakersOrderHistory(orderSneakers)
        const savedOrder = await sneakersOrder.save()
        return savedOrder
    }
    catch(error){
        console.log("error occured while adding th order sneakers.", error)
    }
}

app.post("/sneakers/order/add", async(req, res) => {
    try{
        const orderedSneakers = await addOrderSneakers(req.body)
        if(orderedSneakers){
            res.status(200).send({message: "Order added successfully", data:orderedSneakers})
        } else {
            res.status(404).send({error: "Failed to find the order"})
        }
    }
    catch(error){
        res.status(500).send("Failed to add the order.")
    }
})

//16. API to get the orders 
const getSneakersOrder = async() => {
    try{
        const sneakersFound = await SneakersOrderHistory.find().populate({
            path: "orderedSneakersFromCart",
            populate: {
                  path: "sneakersInCart",
                  model: "Sneakers"
            }
        }).populate("orderedSneakersFromBuyNow")
        return sneakersFound
    }
    catch(error){
        console.log("error occured while getting the ordered Sneakers", error)
    }
}

app.get("/sneakers/order/get", async(req, res) => {
    try{
        const orderedFound = getSneakersOrder()
        if(orderedFound.length > 0) {
            res.status(200).send({message: "Ordered Sneakers are found successfully.", data: orderedFound})
        }else {
            res.status(404).send({error: "Failed to find the oreder Sneakers."})
        }
    }
    catch(error){
        res.status(500).send({error: "Error occured while finding the order Sneakers."})
    }
})

//17. API to delete the ordered Sneakers.
const deleteOrder = async(orderId) => {
    try{
        const orderDelete = await SneakersOrderHistory.findByIdAndDelete(orderId, {new: true}).populate(orderedSneakersFromCart).populate(orderedSneakersFromBuyNow)
        return orderDelete
    }
    catch(error){
        console.log("Error occured while deleting the order")
    }
}

app.delete("/sneakers/order/delete/:orderId", async(req, res) => {
    try{
        const deletedOrder = await deleteOrder(req.params.orderId)
        if(deletedOrder){
            res.status(200).send({message: "Order deleted successfully", data: deletedOrder})
        } else {
            res.status(404).send({error: "Failed to find the order"})
        }
    }
    catch(error){
        res.status(500).send({error: "Failed to delete the order."})
    }
})