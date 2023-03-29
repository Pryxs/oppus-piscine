import {useState,  useEffect } from 'react';
import Modal from "../components/Modal";
import ProductSearch from "../components/products/ProductSearch";
import ProductList from "../components/products/ProductList";

import { connect } from 'react-redux'
import { searchProducts, getProducts } from '../features/product/productThunks'
import { getAllProductsSelector, getFocusedProductSelector } from '../features/product/productSlice'

import { setFocusedProduct } from '../features/product/productSlice'

const Home = ({products, focusedProduct, setFocusedProduct, searchProducts, getProducts}) => {
    const [search, setSearch] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);    

    useEffect(() => {
        getProducts()
    }, []);
    

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const launchResearch = async () => {
        searchProducts(search)
        setSearch('')
    }

    const focusOnProduct = (index) => {
        setFocusedProduct(products[index])
        setModalIsOpen(true)
    }

    return (
        <div className="products">
            <h1>Nos produits</h1>

            <ProductSearch handleChange={handleChange} launchResearch={launchResearch} search={search}/>

            <ProductList products={products} onClick={focusOnProduct} /> 

            <Modal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
                <div>
                    <span>{focusedProduct?.name}</span>
                    <span> - {focusedProduct?.price}€</span>
                    <p>{focusedProduct?.description}</p>
                </div>
            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        products : getAllProductsSelector(state),
        focusedProduct : getFocusedProductSelector(state)
    }
}

const mapDispatchToProps = {
    setFocusedProduct,
    searchProducts,
    getProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
