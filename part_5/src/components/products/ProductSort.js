const ProductSort = () =>{
    return(
        <div className="products_sort">
        <select name="categories" defaultValue="">
            <option value="" disabled>Choisir une catéogrie</option>

            {categories.length && categories.map((category, index) => (
                <option key={index} value={category.name}>{category.name}</option>
            ))} 

        </select>

        <button onClick={launchSort}>trier</button>
    </div>
    )
}

export default ProductSort;