const ProductList = ({products, focusOnProduct, deleteProduct, updateProduct}) =>{
    return(
        <ul className="products_list">
            {products.length && products.map((product, index) => (
                <li className="products_list_item" key={index} onClick={focusOnProduct ? (e) => focusOnProduct(index) : undefined}>
                    <span>{product.name}</span>
                    <span>{product.price}</span>
                    {updateProduct && (
                        <button onClick={(e) => updateProduct(index)}>modifier</button>
                    )}
                     {deleteProduct && (
                        <button onClick={(e) => deleteProduct(product['_id'])}>supprimer</button>
                    )}
                </li>
            ))} 
        </ul>
    )
}

export default ProductList;