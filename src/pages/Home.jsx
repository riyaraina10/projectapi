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
    const [allMeals, setAllMeals] = useState([]);

    useEffect(() => {
        loadRandomMeal();
        loadAllMeals();

        const savedFavorites = localStorage.getItem("favoriteMeals");
        if (savedFavorites) {
            const parsedFavorites = JSON.parse(savedFavorites);
            setFavoriteMeals(parsedFavorites);
            setFavoriteMealIds(parsedFavorites.map((meal) => meal.idMeal));
        }
    }, []);

    const loadRandomMeal = async () => {
        const resp = await fetch(SEARCH_API);
        const data = await resp.json();
        console.log(data);
        console.log(data.meals);
        let meal = data.meals[0];
        console.log(meal);
        setRandomMeal(meal);
    };
    const loadAllMeals = async () => {
        const resp = await fetch(SEARCH_API);
        const data = await resp.json();
        setAllMeals(data.meals || []);
    };

    const addToFavorites = (meal) => {
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
    const handleSearch = async (query) => {
        if (!query.trim()) {
            loadAllMeals();
            return;
        }

        const resp = await fetch(`${SEARCH_API}${query}`);
        const data = await resp.json();
        setAllMeals(data.meals || []);
    };

    return (
        <div className="store">
            <Search onSearch={handleSearch} />

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

                {allMeals.map((meal) => (
                    <MealCard
                        key={meal.idMeal}
                        mealData={meal}
                        isFavorite={favoriteMealIds.includes(meal.idMeal)}
                        addToFavorites={() => addToFavorites(meal)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;
