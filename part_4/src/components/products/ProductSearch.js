const ProductSearch = ({handleChange, launchResearch, search}) =>{
    return(
        <div className="products_search">
            <input type="text" placeholder="rechercher..." onChange={(e) => handleChange(e)} value={search} /> 
            <button onClick={launchResearch}>rechercher</button>
        </div>
    )
}

export default ProductSearch;