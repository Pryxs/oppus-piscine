import {useState,  useEffect } from 'react';
import Modal from "../components/Modal";
import ProductSearch from "../components/products/ProductSearch";
import ProductList from "../components/products/ProductList";

import { useSelector, useDispatch } from 'react-redux'
import { getProducts, searchProducts } from '../features/product/productActions'
import { setFocusedProduct } from '../features/product/productSlice'

export default function Home() {
    const products = useSelector((state) => state.product.products)
    const focusedProduct = useSelector((state) => state.product.focusedProduct)
    const [search, setSearch] = useState("");

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const dispatch = useDispatch()
    

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch]);

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const launchResearch = async () => {
        dispatch(searchProducts(search))
        setSearch('')
    }

    const focusOnProduct = (index) => {
        dispatch(setFocusedProduct(products[index]))
        setModalIsOpen(true)
    }

    return (
        <div className="products">
            <h1>Nos produits</h1>

            <ProductSearch handleChange={handleChange} launchResearch={launchResearch} search={search}/>

            <ProductList products={products} onClick={focusOnProduct} /> 

            <Modal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
                <div>
                    <span>{focusedProduct.name}</span>
                    <span> {focusedProduct.price}€</span>
                    <p>{focusedProduct.description}</p>
                </div>
            </Modal>
        </div>
    )
}