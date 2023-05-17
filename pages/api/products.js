// All of the javascript files in the api folder are endpoints that can be called by the client
// IE:  in index.js : const url = 'http://localhost:3000/api/products';
//                          const response = await axios.get(url);  
//
//import products from '../../static/products.json'  //  This was just for local testing the json file, not used when connecting to real Mongo db.
import Product from '../../models/Product';
import connectDb from '../../utils/connectDb';  

connectDb(); 

// new stuff
export default async (req, res) => {
    const { page, size } = req.query;
    // Convert querystring values to numbers
    const pageNum = Number(page);
    const pageSize = Number(size);
    let products = [];
    const totalDocs = await Product.countDocuments();
    const totalPages = Math.ceil(totalDocs / pageSize);
    if (pageNum === 1) {
      products = await Product.find().limit(pageSize); // Here our products endpoint is connecting and retreiving the Db documents
     //res.status(200).json(products);   // This extra res.status( left in by mistake)  was causing:  
      //                                                        Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client,
      //                                                        then exiting the dev server .
      //                                                        Error [ERR_HTTP_HEADERS_SENT] is an interesting error that is fired up when
      //                                                         a server ( in this case our api/products) tries to send more than one response to a client.
    } else {
      const skips = pageSize * (pageNum - 1);
      products = await Product.find()
        .skip(skips)
        .limit(pageSize);
    }
    // const products = await Product.find();
    res.status(200).json({ products, totalPages });
  };

// works but old stuff
// export default async (req, res) => {
//   const products = await Product.find();
//   res.status(200).json(products);
// };
