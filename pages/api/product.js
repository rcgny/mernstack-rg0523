import Product from '../../models/Product'
import connectDb from '../../utils/connectDb'

connectDb();   //  Call our  connectDb helper to ensure we have a connection with our DB, before our POST request.

export default async (req, res) => {
  switch(req.method){
    case "GET":
           await handleGetRequest(req, res);
           break;
    case "POST":
           await handlePostRequest(req, res);
           break;
    case "DELETE":
            await handleDeleteRequest(req, res);
            break;
     default:
        res.status(405).send(`Method ${req.method} not allowed`);  // 405 - error with request sent by client
        break;
  }
};

// GET endpoint
async function handleGetRequest(req, res) {
       const {_id} =  req.query;
    console.log('query string: ' +  _id);
    const product = await Product.findOne({_id});
    res.status(200).json(product); // 200 - Success.
};

 // POST endpoint
 async function handlePostRequest(req, res) {
const {name, price, description, mediaUrl} = req.body;
try{
// Guard: Check for missing fields
if(!name || !price || !description || !mediaUrl){
    return res.status(422).send('Product missing one or more fields'); // 400 our  program generated errors, IE  our API server is sending this one
}
const product = await new Product({
    name, 
    price,
    description,
    mediaUrl
}).save()
res.status(201).json(product) ;  // 201 - Success, resource created
} catch(error){
    console.error(error);
    res.Status(500).send("Server Error in creating product") ;  // 500 are external server errors, IE  Mongo server that has DB causes an error
}
};

// DELETE endpoint
async function handleDeleteRequest(req, res) {
    const {_id} =  req.query;
    console.log('query string: ' +  _id);
    const product = await Product.findOneAndDelete({_id});  // Dont need deleted product info, but usefull for debug console log to confirm which document was deleted in the json collection.
    console.log('DELETED product: '  + product);
    res.status(204).json({});   // 204 - Successful, with no content returned to caller
};

