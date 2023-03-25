import {useState,  useEffect } from 'react';
import ProductService from "../services/product.service";
import CategoryService from "../services/category.service";

import Modal from '../components/Modal'
import ProductList from "../components/products/ProductList";
import ProductAdd from "../components/products/ProductAdd";

import CategoryList from "../components/categories/CategoryList";
import CategoryAdd from "../components/categories/CategoryAdd";


export default function Management() {
    // STATE
    const [products, setProducts] = useState({});
    const [categories, setCategories] = useState({});

    const [focusedProduct, setFocusedProduct] = useState({});
    const [focusedCategory, setFocusedCategory] = useState({});

    const [modalProductIsOpen, setModalProductIsOpen] = useState(false);
    const [modalCategoryIsOpen, setModalCategoryIsOpen] = useState(false);


    // DATA FETCHING

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


    // PRODUCT ACTIONS

    const deleteProduct = async product => {
        try{
            await ProductService.remove(product['_id']) 
            getProducts() 
        } catch(err){
            console.log('Une erreur est surevenu')
        }
    }

    const updateProduct = product => {
        //const {id, name, price, description} = products[index]
        setFocusedProduct(product)
        setModalProductIsOpen(true)
    }

    const handleProductChange = (e) => {
        setFocusedProduct({...focusedProduct, [e.target.name] : e.target.value})
    }

    const handleProductSubmit = async (e) => {
        e.preventDefault()
        try{
            const res = await ProductService.update(focusedProduct['_id'], focusedProduct) 
            setModalProductIsOpen(false)  
            setFocusedProduct({})
            getProducts()
        } catch(err){
            console.log('Une erreur est surevenu')
        }
    }


    // CATEGORY ACTIONS

    const deleteCategory = async (category) => {
        try{
            await CategoryService.remove(category['_id']) 
            getCategories() 
        } catch(err){
            console.log('Une erreur est surevenu')
        }    
    }

    const updateCategory = category => {
        setFocusedCategory(category)
        setModalCategoryIsOpen(true)
    }

    const handleCategoryChange = (e) => {
        setFocusedCategory({...focusedCategory, [e.target.name] : e.target.value})
    }

    const handleCategorySubmit = async (e) => {
        e.preventDefault()
        try{
            const res = await CategoryService.update(focusedCategory['_id'], focusedCategory) 
            setModalCategoryIsOpen(false)  
            setFocusedCategory({})
            getCategories()
        } catch(err){
            console.log('Une erreur est surevenu')
        }
    }


    // VARIABLES

    const productActions = [
        {
            text : 'Supprimer',
            function : deleteProduct
        },
        {
            text : 'Modifier',
            function : updateProduct
        }
    ]

    const categoryActions = [
        {
            text : 'Supprimer',
            function : deleteCategory
        },
        {
            text : 'Modifier',
            function : updateCategory
        }
    ]

    return (
        <div className="management-container">
            <div className="products">
                <h1>Liste des produits</h1>

                <ProductList products={products} actions={productActions} /> 

                <ProductAdd getProducts={getProducts}/>

                <Modal key="tata" modalIsOpen={modalProductIsOpen} setModalIsOpen={setModalProductIsOpen}>
                    product
                    <form onSubmit={(e) => handleProductSubmit(e)}>
                        <input type="text" name="name" onChange={(e) => handleProductChange(e)} value={focusedProduct.name} required />
                        <input type="text" name="price" onChange={(e) => handleProductChange(e)} value={focusedProduct.price} required />
                        <input type="text" name="description" onChange={(e) => handleProductChange(e)} value={focusedProduct.description || ''}  />

                        <div>
                            <input type="submit" value="Modifier"/>
                        </div>
                    </form>
                </Modal>
            </div>

            <div className="category">
                <h1>Liste des catégories</h1>

                <CategoryList categories={categories} actions={categoryActions} /> 

                <CategoryAdd getCategories={getCategories} />

                <Modal key="toto" modalIsOpen={modalCategoryIsOpen} setModalIsOpen={setModalCategoryIsOpen}>
                    category
                    <form onSubmit={(e) => handleCategorySubmit(e)}>
                        <input type="text" name="name" onChange={(e) => handleCategoryChange(e)} value={focusedCategory.name} required />

                        <div>
                            <input type="submit" value="Modifier"/>
                        </div>
                    </form>
                </Modal>
            </div>
        </div>
    )
}