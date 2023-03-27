import {useState,  useEffect } from 'react';
import ProductService from "../services/product.service";
import CategoryService from "../services/category.service";
import Modal from "../components/Modal";
import ProductSearch from "../components/products/ProductSearch";
import ProductList from "../components/products/ProductList";


export default function Home() {
    const [products, setProducts] = useState({});
    const [categories, setCategories] = useState({});
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [focusedProduct, setFocusedProduct] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    
 
    const getProducts = async () => {
        const products = await ProductService.getAll()
        setProducts(products)
    }

    const getCategories = async () => {
        const categories = await CategoryService.getAll()
        setCategories(categories)
    }

    useEffect(() => {
        getProducts() 
        getCategories()
    }, []);

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const launchResearch = async () => {
        const products = await ProductService.get(search)
        setProducts(products)
        setSearch('')
    }

    const launchSort = async () => {
        const products = await ProductService.get(sort)
        setProducts(products)
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
                    <span>{focusedProduct.name}</span>
                    <span> {focusedProduct.price}€</span>
                    <p>{focusedProduct.description}</p>
                </div>
            </Modal>
        </div>
    )
}