# Cantina Mineira

Cardápio online com captação de pedidos.

https://user-images.githubusercontent.com/75024157/154678575-99c0e27c-0cd8-4b3b-ba0a-a609aa8e30c2.mp4

## Projeto criado usando:

- React.Js,
- React Hooks,
- Context API,
- React-toastify,
- Firebase/Firestore.

### Para rodar o projeto, você precisa:

- Criar um banco de dados firestore e configurar um arquivo firebase-config, dentro da pasta src com seus dados:

```js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```
