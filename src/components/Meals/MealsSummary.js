import classes from "./MealsSummary.module.css";

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Comida deliciosa, entregue na sua casa</h2>
      <p>
        Escolha sua refeição na nossa ampla seleção de refeições disponíveis e
        desfrute de um delicioso almoço ou jantar em casa.
      </p>
      <p>
        Todas as nossas refeições são confeccionadas com ingredientes de alta
        qualidade, fresquinhos e claro por chefs experientes!
      </p>
    </section>
  );
};

export default MealsSummary;
