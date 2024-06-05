//contains logic of the whole application 
// the routes middleware is just an index 
//this controller is also connected to the database


//the below ones are the small functions which take req and res and give an output 


const asyncHandler = require("express-async-handler") //provides error handlign for the async blocks i.e, does the same thing as the try-catch blocks

const ContactModel = require("../models/contact-model")


//@desc Get All Contacts
//@route GET/api/contacts
//@access private
const getAllContacts = asyncHandler( async(req,res)=>{

    
    // res.status(200).json({message:"Get all contacts"})
    const AllContacts =await ContactModel.find({creator_id: req.user.id});
    res.status(200).json(AllContacts); 
})





//@desc Get Individual Contact
//@route GET/api/contacts/:id
//@access private
const getIndividualContact =asyncHandler( async(req,res)=>{

    const contact = await ContactModel.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    res.status(200).json(contact)
})






//@desc Create new contact
//@route POST/api/contacts
//@access private
const createNewContact =asyncHandler( async(req,res)=>{
    console.log("The data recieved in request is ", req.body)
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const contact = await ContactModel.create({
        name,
        email, 
        phone,
        creator_id : req.user.id
    })
    res.status(201).json({contact})
});






//@desc Update contact
//@route PUT/api/contacts
//@access private
const updateContact =asyncHandler( async(req,res)=>{

    const contact = await ContactModel.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }

    //check to see if the logged in user is same as the creator of the contact

    if(contact.creator_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("You are not permitted to do that")
    }

    const updatedContact = await ContactModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    )

    res.status(200).json(updatedContact)
})






//@desc Delete new contact
//@route DELETE/api/contacts
//@access private
const deleteContact =asyncHandler( async(req,res)=>{
    const contact = await ContactModel.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }

    if(contact.creator_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("You are not permitted to do that")
    }

    await ContactModel.findByIdAndDelete(req.params.id);
    res.status(200).json(contact)


})

module.exports = {getAllContacts, createNewContact, updateContact, deleteContact, getIndividualContact}