import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import Loading from "../../assets/loading.gif";

import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase-config";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMeals = async () => {
      const data = await getDocs(collection(db, "meals"));
      setMeals(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setIsLoading(false);
    };

    getMeals();
  }, []);

  if (isLoading) {
    return (
      <section className={classes.loading}>
        <img width={40} src={Loading} alt="loading state" />
      </section>
    );
  }

  if (meals.length === 0) {
    return (
      <section className={classes.error}>
        <p>Algo deu errado..</p>
      </section>
    );
  }

  const mealsList = meals
    .reverse()
    .map((meal) => (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
