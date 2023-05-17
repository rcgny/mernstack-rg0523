import {Card} from 'semantic-ui-react';

function ProductList({products}) {  // props passed in from Home component is destructured using {} to allow access to the props->products property
   function mapProductsToItems(products){
      return products.map(product => ({
         header: product.name,
         image: product.mediaUrl,
         meta: `$${product.price}`,
         color: 'teal',
         fluid: true,
         childKey: product._id,
         href: `/product?_id=${product._id}`   // The href is used as a partial page link to the  pages/product file
      }))                                                          //  IE: When the card is clicked, just like a hyperlink it goes to http://localhost:3000/product?_id=63a8c909b272117ba09c813d
   }                                                               //  when clicking on the 1st card in the row.
  return <Card.Group 
  stackable 
  itemsPerRow="3" 
  centered
   items={mapProductsToItems(products)}
   />;
}

export default ProductList;
