import {useState,  useEffect } from 'react';
import ProductService from "../services/product.service";
import CategoryService from "../services/category.service";
import Modal from '../components/Modal'
import ProductSearch from "../components/products/ProductSearch";
import ProductList from "../components/products/ProductList";


export default function Management() {
    const [products, setProducts] = useState({});
    const [categories, setCategories] = useState({});
    const [focusedProduct, setFocusedProduct] = useState({});
    const [focusedCategory, setFocusedCategory] = useState({});

    const [modalProductIsOpen, setModalProductIsOpen] = useState(false);
    
    
 
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

    const deleteProduct = (e) => {
        console.log(e)
        // setFocusedProduct(products[index])
        // setModalIsOpen(true)
    }

    const updateProduct = (index) => {
        //const {id, name, price, description} = products[index]
        setFocusedProduct(products[index])
        setModalProductIsOpen(true)
    }

    const handleProductChange = (e) => {
        setFocusedProduct({...focusedProduct, [e.target.name] : e.target.value})
    }

    const handleProductSubmit = async (e) => {
        e.preventDefault()
        try{
            const res = await ProductService.update(focusedProduct['_id'], focusedProduct)   
            setFocusedProduct({})
            getProducts()
        } catch(err){
            console.log('Une erreur est surevenu')
        }
    }



   

    return (
        <div className="products">
            <h1>Liste des produits</h1>

            <ProductList products={products} deleteProduct={deleteProduct} updateProduct={updateProduct} /> 

            <Modal modalIsOpen={modalProductIsOpen} setModalIsOpen={setModalProductIsOpen}>
                <form onSubmit={(e) => handleProductSubmit(e)}>
                    <input type="text" name="name" onChange={(e) => handleProductChange(e)} value={focusedProduct.name} required />
                    <input type="text" name="price" onChange={(e) => handleProductChange(e)} value={focusedProduct.price} required />
                    <input type="text" name="description" onChange={(e) => handleProductChange(e)} value={focusedProduct.description || ''}  />

                    <div>
                        <input type="submit" value="Envoyer"/>
                    </div>
                </form>
            </Modal>
        </div>
    )
}