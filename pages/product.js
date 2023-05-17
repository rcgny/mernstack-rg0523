import axios from 'axios';
import ProductSummary from '../components/Product/ProductSummary'
import ProductAttributes from '../components/Product/ProductAttributes'
import baseUrl from '../utils/baseUrl'

// ...product:   using spread operator to pass in the individual properties of the product object, so the child components can use them 
// without having to include the object name 1st  such as  product.name, product.mediaUrl etc.   
function Product({ product, user }) {
 // console.log({product});  //  This  would be the individual document representing a single product in  Mongo  DB
  return (
      <>
      <ProductSummary user={user} {...product}/>  
      <ProductAttributes user={user} {...product}/> 
      </>
    )
}
// https://nextjs.org/docs/api-reference/data-fetching/get-initial-props
// getInitialProps enables server-side rendering in a page and allows you to do initial data population
//
// For the initial page load, getInitialProps will run on the server only. getInitialProps will then run on the client when navigating to a different route 
// via the next/link component or by using next/router.
Product.getInitialProps = async ({ query: { _id } }) => { 
  const url = `${baseUrl}/api/product?_id=${ _id}`;  // product endpoint with query string appended
	const response = await axios.get(url);  // axios sends the get request  to  our  small next.js server 
  return {product:  response.data};
}
export default Product;
