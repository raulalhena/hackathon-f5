import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import './home.css'
import CardsSection from "../Components/Cards Section/CardsSection";
import SearchBar from "../Components/SearchBar";


const Home = () => {

    return (
        <>
        <div className="home">
            <Header/>
            <SearchBar />
            <CardsSection />
            <Footer/>
        </div>
        </>
    )
}

export default Home;