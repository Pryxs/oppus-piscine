const CategoryList = ({categories, onClick, actions}) =>{
    return(
        <ul className="categories_list">
            {categories.length && categories.map((category, index) => (
                <li className="categories_list_item" key={index} onClick={onClick ? (e) => onClick(index) : undefined}>
                    <span>{category.name}</span>
                    {actions && actions.map((action, index) => (
                        <button key={index} onClick={(e) => [action.function(category)]}>{action.text}</button>
                    ))}
                </li>
            ))} 
        </ul>
    )
}

export default CategoryList;