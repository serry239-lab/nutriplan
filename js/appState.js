// const foodLog = [];

// export const addFoodToLog = (food) => {
//   foodLog.push(food);

//   console.log(foodLog);

//   return foodLog;
// };

// export const getFoodLog = () => {
//   return foodLog;
// };
let foodLog = JSON.parse(localStorage.getItem("foodLog")) || [];

const saveFoodLog = () => {
  localStorage.setItem("foodLog", JSON.stringify(foodLog));
};

export const getFoodLog = () => {
  return foodLog;
};

export const addFoodToLog = (food) => {
  const loggedFood = {
    ...food,
    id: Date.now(),
    loggedAt: new Date().toISOString(),
  };

  foodLog.push(loggedFood);
  saveFoodLog();
  console.log(foodLog);
  return foodLog;
};

export const removeFoodFromLog = (id) => {
  foodLog = foodLog.filter((food) => food.id !== id);
  saveFoodLog();
  return foodLog;
};

export const clearFoodLog = () => {
  foodLog = [];
  saveFoodLog();
  return foodLog;
};
