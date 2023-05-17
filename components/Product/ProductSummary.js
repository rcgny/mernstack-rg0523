import {Item, Label} from 'semantic-ui-react'
import AddProductToCart from './AddProductToCart'

// productId={_id}: Using a named prop here called productId, since just a single prop item , not a composite object with many properties...
function ProductSummary({name, mediaUrl, _id, price, sku, user}) {
  return (
  <Item.Group>
    <Item>
         <Item.Image  size='medium' src= {mediaUrl}/>
         <Item.Content>
             <Item.Header>{name}</Item.Header>
             <Item.Description>
                <p>${price}</p>
                 <Label>SKU:  {sku}</Label>
                <Item.Extra>
                     <AddProductToCart user={user} productId={_id} />   
                </Item.Extra>
             </Item.Description>
         </Item.Content>
    </Item>
  </Item.Group>
  );
}

export default ProductSummary;
