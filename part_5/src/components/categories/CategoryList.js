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

const CategoryList = ({categories, onClick, actions}) =>{
    return(
        <Ul className="categories_list">
            {categories.length && categories.map((category, index) => (
                <li className="categories_list_item" key={index} onClick={onClick ? (e) => onClick(index) : undefined}>
                    <span>{category.name}</span>
                    {actions && actions.map((action, index) => (
                        <button className={action.class} key={index} onClick={(e) => [action.function(category)]}>{action.text}</button>
                    ))}
                </li>
            ))} 
        </Ul>
    )
}

export default CategoryList;