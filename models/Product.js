import mongoose from "mongoose";
import shortid from "shortid";

const { String, Number } = mongoose.Schema.Types;

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  sku: {
    type: String,
    unique: true,
    default: shortid.generate()
  },
  description: {
    type: String,
    required: true
  },
  mediaUrl: {
    type: String,
    required: true
  }
});
 // prettier-ignore                                                                            
export default mongoose.models.Product ||  mongoose.model("Product", ProductSchema);

// export default mongoose.models.Product ||                            // Prev. created Product model, so no need to call mongoose again to create it.
//                         mongoose.model('Product', ProductSchema);  // Creates the model

