import Search from "../components/Search";
import Favorites from "../components/Favorites";
import MealCard from "../components/MealCard";
import { useEffect, useState } from "react";

const RANDOM_API = import.meta.env.VITE_RANDOM_MEAL_API;
const MEAL_BYID_API = import.meta.env.VITE_MEAL_BYID_API;
const SEARCH_API = import.meta.env.VITE_SEARCH_MEAL_API;

const Home = () => {
    const [randomMeal, setRandomMeal] = useState(null);
    const [favoriteMeals, setFavoriteMeals] = useState([]);
    const [favoriteMealIds, setFavoriteMealIds] = useState([]);

    useEffect(() => {
        loadRandomMeal();
        // Load saved favorites from localStorage
        const savedFavorites = localStorage.getItem("favoriteMeals");
        if (savedFavorites) {
            const parsedFavorites = JSON.parse(savedFavorites);
            setFavoriteMeals(parsedFavorites);
            setFavoriteMealIds(parsedFavorites.map((meal) => meal.idMeal));
        }
    }, []);

    const loadRandomMeal = async () => {
        const resp = await fetch(RANDOM_API);
        const data = await resp.json();
        let meal = data.meals[0];
        console.log(meal);
        setRandomMeal(meal);
    };

    const addToFavorites = (meal) => {
        // Only add if not already in favorites
        if (!favoriteMealIds.includes(meal.idMeal)) {
            const updatedFavorites = [...favoriteMeals, meal];
            setFavoriteMeals(updatedFavorites);
            setFavoriteMealIds([...favoriteMealIds, meal.idMeal]);
            localStorage.setItem(
                "favoriteMeals",
                JSON.stringify(updatedFavorites)
            );
        }
    };

    const removeFavorite = (mealId) => {
        const updatedFavorites = favoriteMeals.filter(
            (meal) => meal.idMeal !== mealId
        );
        setFavoriteMeals(updatedFavorites);
        setFavoriteMealIds(updatedFavorites.map((meal) => meal.idMeal));
        localStorage.setItem("favoriteMeals", JSON.stringify(updatedFavorites));
    };

    return (
        <div className="store">
            <Search />

            <Favorites
                favoriteMeals={favoriteMeals}
                removeFavorite={removeFavorite}
            />

            <div className="meals" id="meals">
                {randomMeal && (
                    <MealCard
                        mealData={randomMeal}
                        isRandom={true}
                        isFavorite={favoriteMealIds.includes(randomMeal.idMeal)}
                        addToFavorites={() => addToFavorites(randomMeal)}
                    />
                )}
            </div>
        </div>
    );
};

export default Home;
