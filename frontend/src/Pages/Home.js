import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import './home.css'
import CardsSection from "../Components/Cards Section/CardsSection";

const Home = () => {

    return (
        <>
        <div className="home">
            <Header/>
                <CardsSection />
            <Footer/>
        </div>
        </>
    )
}

export default Home;