const ProductList = ({products, onClick, actions}) =>{
    return(
        <ul className="products_list">
            {products.length && products.map((product, index) => (
                <li className="products_list_item" key={index} onClick={onClick ? (e) => onClick(index) : undefined}>
                    <span>{product.name}</span>
                    <span>{product.price}</span>
                    {actions && actions.map((action, index) => (
                        <button key={index} onClick={(e) => [action.function(product)]}>{action.text}</button>
                    ))}
                </li>
            ))} 
        </ul>
    )
}

export default ProductList;