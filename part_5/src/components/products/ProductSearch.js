import styled from '@emotion/styled'
import {BaseInput} from '../../styles/BaseInput'
import {BaseButton} from '../../styles/BaseButton'


const Input = styled.input`
  ${BaseInput}
`

const Button = styled.button`
  ${BaseButton}
  background-color: ${props => props.theme.dynamic};
  padding: .5em 1em;
  margin-left: 1rem;
`

const ProductSearch = ({handleChange, launchResearch, search}) =>{
    return(
        <div className="products_search">
            <Input type="text" placeholder="rechercher..." onChange={(e) => handleChange(e)} value={search} /> 
            <Button onClick={launchResearch}>rechercher</Button>
        </div>
    )
}

export default ProductSearch;