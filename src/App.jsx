import { useState } from "react";

// Компонент кнопки
const Button = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className="bg-blue-500 text-white px-4 py-2 rounded">
      {children}
    </button>
  );
};

// Контейнер
const Container = ({ children }) => {
  return <div className="p-4 border rounded shadow-md">{children}</div>;
};

// Навигация
const Navigation = () => {
  return (
    <nav className="bg-gray-200 p-4 mb-4">
      <ul className="flex gap-4">
        <li><a href="#" className="text-blue-600">Home</a></li>
        <li><a href="#" className="text-blue-600">About</a></li>
        <li><a href="#" className="text-blue-600">Contact</a></li>
      </ul>
    </nav>
  );
};

// Главный компонент приложения
const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="max-w-lg mx-auto mt-10">
      <Navigation />
      <Container>
        <h1 className="text-xl font-bold">Hello, World!</h1>
        <p>Вы нажали кнопку {count} раз.</p>
        <Button onClick={() => setCount(count + 1)}>Нажми меня</Button>
      </Container>
    </div>
  );
};

export default App;
