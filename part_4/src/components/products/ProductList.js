import styled from '@emotion/styled'

const Ul = styled.ul`
li{
    display: flex;
    padding: .5em 1em;

    span{
        margin-right: auto;
    }

    &:nth-of-type(odd){
        background: ${props => props.theme.primary};
    }        
    button{
        border: none;
        background: transparent;
        color: ${props => props.theme.dynamic};
        cursor: pointer;
    
        &:hover{
            text-decoration: underline;
        }
    
        &.button-delete{
            color: red;
        }
    }
}
`

const ProductList = ({products, onClick, actions}) =>{
    return(
        <Ul className="products_list">
            {products.length && products.map((product, index) => (
                <li className="products_list_item" key={index} onClick={onClick ? (e) => onClick(index) : undefined}>
                    <span>{product.name} - {product.price}€</span>
                    {actions && actions.map((action, index) => (
                        <button className={action.class} key={index} onClick={(e) => [action.function(product)]}>{action.text}</button>
                    ))}
                </li>
            ))} 
        </Ul>
    )
}

export default ProductList;