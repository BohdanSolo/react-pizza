import Home from "./components/Pages/Home"; /*1*/
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Pages/Layout";
import Cart from "./components/Pages/Cart";


function App() {
  /*Аналог другого аргументу конекту (mapDispatchToProps)*/

  return (
    <Routes>
      <Route path={"/"} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={"cart"} element={<Cart />} />
      </Route>
    </Routes>
  );
}
/*3*/

/*4. - Спосіб реалізації підключення конекту без хуків, через класові компоненти */

export default App;

/*COMMENTS*/

/*1. Це скорочений імпотр, створюєщ один файл індекс лдс і в нього імортоуєш всі файли з абсолютним шляхом. Після цього експртуш їх не по дефолту а в об'єкті. І звідси витягаєш їх за доп деструкторизації. Чому у нас тут шлях компонетс? Тому, що вебпак так працює: спочатку він шукає файл із розширенням js or jsx із насвою такою як і в папки, якщо його немає тоді він шукає файл із таким самим розширеннням але із назвою index. У нашому випадку якраз назва індекс.
 * ============================================================================*/

/*2. Тобто чим відрізняється. Запис коротший якщо для початку аналіувати. Тобі аксіонс повертає одразу певн дані, серед яких через деструкторизацію ти можеш витягнути дейту яка є масивм об'єктів. */
/*Прикад за до AJAX*/
/*fetch("http://localhost:3000/db.json")
      .then((resp) => resp.json())
      .then((json) => {
        setPizzas(json.pizzas);
      });
 =================================================================*/

/*3. Ми використовуємо connect у даному випадку, щоб зв'язати ріакт і редакс. Коли ми отримуємо із сервера піци і поміщаємо їх в стор, то ріакт не знає як їх використати, не знає як використати дані зі стору. Тому ми використовуємо конект щоб ми могли через пропис в Епі передати наші піци вниз по всіх компонентах.
 * =============================================================*/

/*4.
const mapStateToProps = (state) => {
  return {
    items: state.pizzas.items,
    filters: state.filters,

    /!* Це те саме що і: <App items={state.pizzas.items,} filters={state.filters}/> *!/
  };

  /!*Стейт у даному випадку міститься в сторі. ТОбто ми викликаємо цю фнцію щоб отримати певні дані зі стору які потрібно підколючити до компонента в Ріакті. Вона викликається кожен раз коли стор змінюється. It receives the entire store state, and should return an object of data this component needs. Ми в юзефі за доп дізпатчу записуємо в стор нові дані тобто масив піци і після цього коли стор змінюється, то викликається ця фнція, яка бере дані зі стору і записує їх в об'єкт. Надалі ми може за доп деструкторизації витянути ці дані зі стору і передати як пропс в Еп. *!/
};


/!*Другий арумент конекту використовується для відправлення (діспатчингу) екшинів до стору.
Connect can accept an argument called mapDispatchToProps, which lets you create functions that dispatch when called, and pass those functions as props to your component. Тобто ти не діспатчиш екшини до стору сам, це робиться автоматично коли стор змінюється. *!/

const mapDispatchToProps  = {
  setPizzas

  /!*
  Це довший варіант, коли потрібно  експортувати setPizzas як setPizzasAction. Коли у нас все однаково назвається то можна скорочено писати
  return {
    setPizzas: items => dispatch(setPizzasAction(items))
  }*!/
}

export default connect(mapStateToProps, mapDispatchToProps)(App);*/


