import {useState,  useEffect } from 'react';
import ProductService from "../services/product.service";
import CategoryService from "../services/category.service";

import Modal from '../components/Modal'
import ProductList from "../components/products/ProductList";
import ProductAdd from "../components/products/ProductAdd";

import CategoryList from "../components/categories/CategoryList";
import CategoryAdd from "../components/categories/CategoryAdd";

import styled from '@emotion/styled'
import {BaseInput} from '../styles/BaseInput'
import {BaseButton} from '../styles/BaseButton'

const Form = styled.form`
    display: flex;
    gap: 1rem;
    flex-direction: column;

    div:last-child{
        margin-top: 2rem;
    }
`

const Input = styled.input`
    ${BaseInput}
`

const InputSubmit = styled.input`
    ${BaseButton}
    background-color: ${props => props.theme.dynamic};
    padding: .5em 1em;
`


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
            text : 'Modifier',
            class : 'button-update',
            function : updateProduct
        },
        {
            text : 'Supprimer',
            class : 'button-delete',
            function : deleteProduct
        }
    ]

    const categoryActions = [
        {
            text : 'Modifier',
            class : 'button-update',
            function : updateCategory
        },
        {
            text : 'Supprimer',
            class : 'button-delete',
            function : deleteCategory
        }
    ]

    return (
        <div className="management-container">
            <div className="products">
                <h1>Liste des produits</h1>

                <ProductAdd getProducts={getProducts}/>

                <ProductList products={products} actions={productActions} /> 

                <Modal key="tata" modalIsOpen={modalProductIsOpen} setModalIsOpen={setModalProductIsOpen}>
                    <Form onSubmit={(e) => handleProductSubmit(e)}>
                        <Input type="text" name="name" onChange={(e) => handleProductChange(e)} value={focusedProduct.name} required />
                        <Input type="text" name="price" onChange={(e) => handleProductChange(e)} value={focusedProduct.price} required />
                        <Input type="text" name="description" onChange={(e) => handleProductChange(e)} value={focusedProduct.description || ''}  />

                        <div>
                            <InputSubmit type="submit" value="Modifier"/>
                        </div>
                    </Form>
                </Modal>
            </div>

            <div className="category">
                <h1>Liste des catégories</h1>

                <CategoryAdd getCategories={getCategories} />

                <CategoryList categories={categories} actions={categoryActions} /> 

                <Modal key="toto" modalIsOpen={modalCategoryIsOpen} setModalIsOpen={setModalCategoryIsOpen}>
                    <Form onSubmit={(e) => handleCategorySubmit(e)}>
                        <Input type="text" name="name" onChange={(e) => handleCategoryChange(e)} value={focusedCategory.name} required />

                        <div>
                            <InputSubmit type="submit" value="Modifier"/>
                        </div>
                    </Form>
                </Modal>
            </div>
        </div>
    )
}