import styled from '@emotion/styled'

const Ul = styled.ul`
    ${props => props.theme.name === 'dark' 
        ? `box-shadow: rgba(150, 150, 150, 0.2) 0px 7px 29px 0px;`
        : `box-shadow: rgba(100, 100, 100, 0.2) 0px 7px 29px 0px;`
    }
    margin-bottom: 3rem;

    .products_list_item{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 2em;
        padding: .7em 1em;

        &_infos{
            grid-column: 1 / 2;
        }

        &_tags{
            grid-column: 2 / 3;

            span{
                margin-right: .5em;
                font-size: .8rem;
                padding: .2em .4em;
                border-radius: 5px;
                border: 1px solid  ${props => props.theme.textColor};
                filter: sc
            }
        }

        &_actions{
            grid-column: 3 / 4;
            justify-self: self-end;
        }

        &:nth-of-type(odd){
            background: ${props => props.theme.primary};
        }     
        
        &.clickable{
            cursor: pointer;
            position: relative;

            ::before{
                visibility: hidden;
                content: "👀";
                position: absolute;
                height: 100%;
                display: flex;
                align-items: center;
                padding: 0 1em;
            }

            &:hover::before{
                visibility: visible;
            }

            .products_list_item_infos{
                padding-left: 2em;
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
                        <div className="products_list_item_infos">
                            {product.name} - {product.price}€
                        </div>

                        <div className="products_list_item_tags">
                            {product.categories && product.categories.map(category => (
                                <span key={category['_id']}>{category.name}</span>
                            ))} 
                        </div>
                        
                        <div className="products_list_item_actions">
                        {actions && actions.map((action, index) => (
                            <button className={action.class} key={index} onClick={(e) => [action.function(product)]}>{action.text}</button>
                        ))}
                        </div>
                    </li>
                )
            ) : ( 
                <span>aucun produits...</span>
            )} 
        </Ul>
    )
}

export default ProductList;