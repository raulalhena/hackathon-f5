import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import './productD.css'
import { Product }  from '../Components/Details/ProductDescription'


const ProductDetail = () => {

    return (
        <div className="home">
            <Header/>
            <Product />
            <Footer/>
        </div>
    )
}

export default ProductDetail;