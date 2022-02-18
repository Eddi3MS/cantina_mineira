import classes from "./Checkout.module.css";
import useInput from "../../hooks/use-input";
import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase-config";
import LoadGif from "../../assets/loading.gif";
import { toast } from "react-toastify";

const isEmpty = (value) => value.trim() !== "";

const Checkout = ({ onCancel }) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    reset: resetName,
    inputBlurHandler: nameBlurHandler,
    inputChangeHandler: nameChangeHandler,
  } = useInput(isEmpty);

  const {
    value: enteredTelefone,
    isValid: enteredTelefoneIsValid,
    hasError: telefoneInputHasError,
    reset: resetTelefone,
    inputBlurHandler: telefoneBlurHandler,
    inputChangeHandler: telefoneChangeHandler,
  } = useInput((value) => value.trim().length >= 8 && /^[0-9]+$/.test(value));

  const {
    value: enteredAddress,
    isValid: enteredAddressIsValid,
    hasError: addressInputHasError,
    reset: resetAddress,
    inputBlurHandler: addressBlurHandler,
    inputChangeHandler: addressChangeHandler,
  } = useInput(isEmpty);

  const {
    value: enteredBairro,
    isValid: enteredBairroIsValid,
    hasError: bairroInputHasError,
    reset: resetBairro,
    inputBlurHandler: bairroBlurHandler,
    inputChangeHandler: bairroChangeHandler,
  } = useInput(isEmpty);

  const [submitting, setSubmitting] = useState(false);

  const { items, totalAmount, clearCart } = useContext(CartContext);

  const confirmHandler = async (event) => {
    event.preventDefault();
    if (
      !enteredNameIsValid ||
      !enteredAddressIsValid ||
      !enteredBairroIsValid ||
      !enteredTelefoneIsValid
    ) {
      toast.error("Preencha todos os campos do formulário.");
      return;
    }

    setSubmitting(true);
    const total = `R$${totalAmount.toFixed(2).toString().replace(".", ",")}`;

    const purchaseItems = items.map((item) => {
      return {
        produto: item.name,
        quantidade: item.amount,
        preço: `R$${item.price.toString().replace(".", ",")}`,
      };
    });

    const purchaseData = {
      items: purchaseItems,
      total,
      Nome: enteredName,
      Telefone: enteredTelefone,
      endereço: enteredAddress,
      Bairro: enteredBairro,
    };

    await addDoc(collection(db, "purchase"), {
      ...purchaseData,
      timestamp: serverTimestamp(),
    });

    toast.success("Pedido enviado com sucesso!");
    setSubmitting(false);
    clearCart();
    onCancel();
    resetName();
    resetAddress();
    resetBairro();
    resetTelefone();
  };

  let nameClass = nameInputHasError
    ? `${classes.control} ${classes.error}`
    : `${classes.control}`;

  let telefoneClass = telefoneInputHasError
    ? `${classes.control} ${classes.error}`
    : `${classes.control}`;

  let addressClass = addressInputHasError
    ? `${classes.control} ${classes.error}`
    : `${classes.control}`;

  let bairroClass = bairroInputHasError
    ? `${classes.control} ${classes.error}`
    : `${classes.control}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClass}>
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onBlur={nameBlurHandler}
          onChange={nameChangeHandler}
        />
        {nameInputHasError && <p>Nome inválido.</p>}
      </div>

      <div className={telefoneClass}>
        <label htmlFor="postal">Telefone</label>
        <input
          type="text"
          id="postal"
          value={enteredTelefone}
          onBlur={telefoneBlurHandler}
          onChange={telefoneChangeHandler}
        />
        {telefoneInputHasError && (
          <p>Telefone inválido (use somente números).</p>
        )}
      </div>

      <div className={addressClass}>
        <label htmlFor="street">Endereço</label>
        <input
          type="text"
          id="street"
          value={enteredAddress}
          onBlur={addressBlurHandler}
          onChange={addressChangeHandler}
        />
        {addressInputHasError && <p>Endereço inválido.</p>}
      </div>
      <div className={bairroClass}>
        <label htmlFor="postal">Bairro</label>
        <input
          type="text"
          id="postal"
          value={enteredBairro}
          onBlur={bairroBlurHandler}
          onChange={bairroChangeHandler}
        />
        {bairroInputHasError && <p>Bairro inválido.</p>}
      </div>

      <div className={classes.actions}>
        {submitting ? (
          <img width={40} src={LoadGif} alt="loading.." />
        ) : (
          <>
            <button type="button" onClick={onCancel}>
              Cancelar
            </button>
            <button className={classes.submit}>Confirmar</button>
          </>
        )}
      </div>
    </form>
  );
};

export default Checkout;
