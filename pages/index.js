import React from 'react'
import axios from 'axios'
import ProductList from '../components/Index/ProductList'
import ProductPagination from "../components/Index/ProductPagination";
import baseUrl from '../utils/baseUrl'

function Home( {products, totalPages} ) { // destructuring products from props	
	console.log(products) // products will have been populated by server call to mongo DB below
	// any data collections will have a unique id in the document(s) i, inserted by MongoDb

	// ***Client side fetching***
	// React.useEffect(() =>{ // This is how we fetch data from an endpoint  in a client rendered React application...
	//   getProducts();           // with next.js , we dont need to wait until the page is mounted and displayed. We can  fetch the data
	// }, [])                             //  1st on the server.  Thats what we do below  using getInitialProps.
	//
	//  async function getProducts() {
	//    const url = 'http://localhost:3000/api/products';
	//    const response = await axios.get(url);
	//    console.log(response.data);
	//    console.log('RCG- From Client');
	//  }

	// return <>home</>;
	return (
		<>
		  <ProductList products={products} />
		  <ProductPagination totalPages={totalPages} />
		</>
	);
}

// ***Server side fetching using next.js  provided function : getInitialProps***
Home.getInitialProps = async ctx => {
	const page = ctx.query.page ? ctx.query.page : "1";
	const size = 9;
	const url = `${baseUrl}/api/products`;
	const payload = { params: { page, size } };
	// fetch data on server
	const response = await axios.get(url, payload);
	// return response data as an object
	return response.data;
	// note: this object will be merged with existing props
  };
  

export default Home
