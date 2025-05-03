import React from "react";

const MealCard = ({
    mealData,
    isRandom = false,
    isFavorite = false,
    addToFavorites,
}) => {
    return (
        <div className="meal">
            <div className="meal-header">
                {isRandom && <span className="random">Meal of the Day</span>}
                <img src={mealData.strMealThumb} alt={mealData.strMeal} />
            </div>
            <div className="meal-body">
                <h3>{mealData.strMeal}</h3>
                <button
                    className={`fav-btn ${isFavorite ? "active" : ""}`}
                    onClick={addToFavorites}
                    disabled={isFavorite} // Optional: disable button if already in favorites
                >
                    <i className="fas fa-heart"></i>
                </button>
            </div>
        </div>
    );
};

export default MealCard;
