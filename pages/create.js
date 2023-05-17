import React from "react";
import {
  Form,
  Input,
  TextArea,
  Button,
  Image,
  Message,
  Header,
  Icon
} from "semantic-ui-react";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import catchErrors from "../utils/getErrorMsgForDisplay";

const INITIAL_PRODUCT = {
  name: "",
  price: "",
  media: "",
  description: ""
};

function CreateProduct() {
  const [product, setProduct] = React.useState(INITIAL_PRODUCT);
  const [mediaPreview, setMediaPreview] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true); // Will be used to disable the submit button if any of product fields are empty.
  const [error, setError] = React.useState('');

  // Guard - user
  // Check if the user has filled out all the product fields in the create product screen, before enabling the submit button
  // the dep. array contains product, so if any of its field change as user types in values, this useEffect will be ran
  React.useEffect(() => {
    const isProduct = Object.values(product).every(el => Boolean(el));
    isProduct ? setDisabled(false) :  setDisabled(true);  // isProduct  (true), means all its fields have something(not empty).
  }, [product])

  function handleChange(event) {
    const { name, value, files } = event.target;
   // console.log({[name]: value});
    if (name === "media") {
      setProduct(prevState => ({ ...prevState, media: files[0] }));
      setMediaPreview(window.URL.createObjectURL(files[0]));
    } else {
      setProduct(prevState => ({ ...prevState, [name]: value }));   
    }
   // console.log(product);
  }

  async function handleImageUpload() {
    const data = new FormData();
    data.append("file", product.media);
    data.append("upload_preset", "react-reserve");
    data.append("cloud_name", "dxop5pe6h");
    const response = await axios.post(process.env.CLOUDINARY_URL, data);  // https://cloudinary.com/   [Had to create an account for image upload service]
    const mediaUrl = response.data.url;
    return mediaUrl;
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault(); // Disable refresh of page.
     // console.log(product);   // For initial testing of client code before we send to endpoint
      setLoading(true);
      setError('');
      const mediaUrl = await handleImageUpload();
      //console.log({ mediaUrl }); // For next level testing of client code, using Cloudinary, to make sure Cloudinary, got our image  upload,  before we send to endpoint
      const url = `${baseUrl}/api/product`;
      const { name, price, description } = product;
      const payload = { name, price, description, mediaUrl };
     // const payload = { name: "", price, description, mediaUrl };  //rcgtemp:  test to force an error in api/product.cs  post handler line 36
      // If the response is a 400 - 500, axios will throw an error automatically, and we will catch it here.
       const response = await axios.post(url, payload);
      // console.log({ response });      
       setProduct(INITIAL_PRODUCT); // Clears form on submit
       setSuccess(true);
    } catch(error) {
      console.error("Big ERROR from our api server", error);
      getErrorMsgForDisplay(error, setError);
    } finally {
      setLoading(false);
    }    
  }

  return (
    <>
      <Header as="h2" block>
        <Icon name="add" color="orange" />
        Create New Product
      </Header>
      <Form loading={loading} error={Boolean(error)} success={success} onSubmit={handleSubmit}>
        <Message
          error         
          header="Oops!"
          content={error}
        />
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="name"
            label="Name"
            placeholder="Name"
            value={product.name}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="price"
            label="Price"
            placeholder="Price"
            min={0.00}
            step={0.01}
            type="number"
            value={product.price}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="media"
            type="file"
            label="Media"
            accept="image/*"
            content="Select Image"
            onChange={handleChange}
          />
        </Form.Group>
        <Image src={mediaPreview} rounded centered size="small" />
        <Form.Field
          control={TextArea}
          name="description"
          label="Description"
          placeholder="Description"
          onChange={handleChange}
          value={product.description}
        />
        <Form.Field
          control={Button}
          disabled={disabled || loading}
          color="blue"
          icon="pencil alternate"
          content="Submit"
          type="submit"
        />
      </Form>
    </>
  );
}

export default CreateProduct;
