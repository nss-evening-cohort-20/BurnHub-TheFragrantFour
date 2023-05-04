import { HomeCard } from "./HomeCard"
import candle1 from "../../images/homeCandle-1.jpg"
import candle2 from "../../images/homeCandle-2.png"
import candle3 from "../../images/homeCandle-3.jpg"
import candle4 from "../../images/homeCandle-4.jpg"
import incense1 from "../../images/homeIncense-1.jpg"
import candleHolder1 from "../../images/homeCandleHolder-1.jpg"
import store1 from "../../images/homeStore-1.jpg"
import store2 from "../../images/homeStore-2.jpg"
import store3 from "../../images/homeStore-3.jpg"

export const Home = () => {


    return <div className="w-3/4 m-auto mt-12 flex flex-col justify-center items-center gap-12">
        <HomeCard
            navRoute={'/products'}
            text={'View All Products'}
            img1={incense1}
            img1AltText={''}
            img2={candle4}
            img2AltText={''}
            img3={candleHolder1}
            img3AltText={''}
        />
        <HomeCard
            navRoute={'/candles'}
            text={'View All Candles'}
            img1={candle1}
            img1AltText={''}
            img2={candle2}
            img2AltText={''}
            img3={candle3}
            img3AltText={''}
        />
        <HomeCard
            navRoute={'/stores'}
            text={'View All Stores'}
            img1={store1}
            img1AltText={''}
            img2={store2}
            img2AltText={''}
            img3={store3}
            img3AltText={''}
        />
    </div>
    
}
