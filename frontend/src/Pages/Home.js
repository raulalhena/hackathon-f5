import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import FavoriteButton from "../Components/heart_fav/FavoriteButton";
import './home.css'

const Home = () => {

    return (
        <>
        <div className="home">
            <Header/>
            <FavoriteButton/>
            <Footer/>
        </div>
        </>
    )
}

export default Home;