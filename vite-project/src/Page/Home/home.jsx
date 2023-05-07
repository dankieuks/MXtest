import Footer from "../../Components/Footer";

import Header from "../../Components/Header";
import TodoList from "../../Components/TodoList";

const Home = () => {
  return (
    <div className="App">
      <div className="container">
        <Header />
        <TodoList />
       
      </div>
      <Footer />
    </div>
  );
};
export default Home;
