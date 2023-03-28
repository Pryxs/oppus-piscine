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
    
    &.clickable{
        cursor: pointer;

        ::before{
            display: none;
            content: "👀";
            margin-right: .5em;
        }

        &:hover::before{
            display: block;
        }
        
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
            {products.length > 0 ? 
                products.map((product, index) => (
                    <li className={`products_list_item ${onClick ? 'clickable' : ''}`} key={index} onClick={onClick ? (e) => onClick(index) : undefined}>
                        <span>{product.name} - {product.price}€</span>
                        {actions && actions.map((action, index) => (
                            <button className={action.class} key={index} onClick={(e) => [action.function(product)]}>{action.text}</button>
                        ))}
                    </li>
                )
            ) : ( 
                <span>aucun produits...</span>
            )} 
        </Ul>
    )
}

export default ProductList;