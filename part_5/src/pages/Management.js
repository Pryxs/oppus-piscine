import {useState,  useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getProducts, deleteProduct, updateProduct, createProduct } from '../features/product/productActions'
import { setFocusedProduct } from '../features/product/productSlice'
import { getCategories, deleteCategory, updateCategory, createCategory } from '../features/category/categoryActions'
import { setFocusedCategory } from '../features/category/categorySlice'

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
    const products = useSelector((state) => state.product.products)
    const focusedProduct = useSelector((state) => state.product.focusedProduct)
    const categories = useSelector((state) => state.category.categories)
    const focusedCategory = useSelector((state) => state.category.focusedCategory)

    const [modalProductIsOpen, setModalProductIsOpen] = useState(false);
    const [modalCategoryIsOpen, setModalCategoryIsOpen] = useState(false);

    const dispatch = useDispatch()


    // DATA FETCHING
    useEffect(() => {
        dispatch(getProducts())
        dispatch(getCategories())
    }, [dispatch]);


    // PRODUCT ACTIONS
    const handleCreateProduct = async product => {
        dispatch(createProduct(product)) 
    }

    const handleDeleteProduct = async product => {
        dispatch(deleteProduct(product['_id'])) 
    }

    const openUpdateProduct = product => {
        dispatch(setFocusedProduct(product))
        setModalProductIsOpen(true)
    }

    const handleProductChange = (e) => {
        dispatch(setFocusedProduct({...focusedProduct, [e.target.name] : e.target.value}))
    }

    const handleProductSubmit = async (e) => {
        e.preventDefault()
        dispatch(updateProduct(focusedProduct)) 
        setModalProductIsOpen(false)  
        dispatch(setFocusedProduct({}))
    }


    // CATEGORY ACTIONS
    const handleCreateCategory = async category => {
        dispatch(createCategory(category)) 
    }

    const handleDeleteCategory = async category => {
        dispatch(deleteCategory(category['_id'])) 
    }

    const openUpdateCategory = category => {
        dispatch(setFocusedCategory(category))
        setModalCategoryIsOpen(true)
    }

    const handleCategoryChange = (e) => {
        dispatch(setFocusedCategory({...focusedCategory, [e.target.name] : e.target.value}))
    }

    const handleCategorySubmit = async (e) => {
        e.preventDefault()
        dispatch(updateCategory(focusedCategory)) 
        setModalCategoryIsOpen(false)  
        dispatch(setFocusedCategory({}))
    }


    // VARIABLES
    const productActions = [
        {
            text : 'Modifier',
            class : 'button-update',
            function : openUpdateProduct
        },
        {
            text : 'Supprimer',
            class : 'button-delete',
            function : handleDeleteProduct
        }
    ]

    const categoryActions = [
        {
            text : 'Modifier',
            class : 'button-update',
            function : openUpdateCategory
        },
        {
            text : 'Supprimer',
            class : 'button-delete',
            function : handleDeleteCategory
        }
    ]

    return (
        <div className="management-container">
            <div className="products">
                <h1>Liste des produits</h1>

                <ProductAdd handleCreateProduct={handleCreateProduct}/>

                <ProductList products={products} actions={productActions} /> 

                <Modal modalIsOpen={modalProductIsOpen} setModalIsOpen={setModalProductIsOpen}>
                    <Form onSubmit={(e) => handleProductSubmit(e)}>
                        <Input type="text" name="name" onChange={(e) => handleProductChange(e)} value={focusedProduct.name || ''} required />
                        <Input type="text" name="price" onChange={(e) => handleProductChange(e)} value={focusedProduct.price || ''} required />
                        <Input type="text" name="description" onChange={(e) => handleProductChange(e)} value={focusedProduct.description || ''}  />

                        <div>
                            <InputSubmit type="submit" value="Modifier"/>
                        </div>
                    </Form>
                </Modal>
            </div>

            <div className="category">
                <h1>Liste des catégories</h1>

                <CategoryAdd handleCreateCategory={handleCreateCategory} />

                <CategoryList categories={categories} actions={categoryActions} /> 

                <Modal modalIsOpen={modalCategoryIsOpen} setModalIsOpen={setModalCategoryIsOpen}>
                    <Form onSubmit={(e) => handleCategorySubmit(e)}>
                        <Input type="text" name="name" onChange={(e) => handleCategoryChange(e)} value={focusedCategory.name || ''} required />

                        <div>
                            <InputSubmit type="submit" value="Modifier"/>
                        </div>
                    </Form>
                </Modal>
            </div>
        </div>
    )
}