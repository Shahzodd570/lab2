
import { useEffect } from "react";
import Feedback from "./Feedback";

import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../redux/counterSlice";
import { Box, Typography, Button } from "@mui/material";


const labDescriptions = {
  1: {
    title: "Лабораторная работа 1",
    description: "Реализовать скрипт, который уведомит о полной загрузке страницы, Реализовать кнопку счетчик, которая будет увеличивать счетчик на 1 и вывести его значение на страницу (button onclick), Реализовать кнопку счетчик, которая будет уменьшать счетчик на 1 реализовать с помощью listener click и т.п"
  },
  2: {
     title: "Лаблораторная работа 2",
     description: "Создать Hello World приложение на основе React. Для создания можно использовать create-react-app или vite. Реализовать компонент кнопку, контейнер и использовать их на странице. Реализовать шаблон страницы и разместить на нем компоненты навигации. Разместить проект в репозиторий в github. Прикрепить текстовый файл с сылкой на проект"
   },
   3: {
    title: "Лабораторная работа 3",
    description: "Продолжаем задание, Реализовать шаблон страницы и разместить на нем компоненты навигации (Можно использовать готовые библиотеки Mui/Bootstrap и тд). Реализуем компоненты Header, Footer, Menu и Content. В меню выводим список лабораторных работ. В Content  выводим содержимое лабораторной работы. В Content  выводим содержимое лабораторной работы. Прикрепить текстовый файл с сылкой на проект."
  }
};

// Принимаем selectedLabId в качестве пропа
const Content = ({ selectedLabId }) => { 
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  // Получаем описание напрямую по ID
  const lab = labDescriptions[selectedLabId]; 

  console.log("Рендер компонента Content");
  console.log("Получен selectedLabId:", selectedLabId);
  console.log("Найденное описание lab:", lab);
  
  useEffect(() => {
    console.log("🟢 Компонент Content МОНТИРОВАН!", { selectedLabId }); // Можно добавить ID в лог
    return () => {
      console.log("🔴 Компонент Content РАЗМОНТИРОВАН!");
    };
  }, [selectedLabId]); // Добавляем selectedLabId в зависимости useEffect, если логика должна перезапускаться при смене лабы

  return (
    <Box sx={{ p: 3 }}>
      {lab ? ( // Теперь lab будет найден, если selectedLabId передан
        <>
          <Typography variant="h5" gutterBottom>{lab.title}</Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            {lab.description}
          </Typography>
        </>
      ) : (
        <Typography variant="h5" color="textSecondary">
          Выберите лабораторную работу
        </Typography>
      )}

      {/* Счётчик через Redux */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h5">Счётчик: {count}</Typography>
        <Button onClick={() => dispatch(increment())} variant="contained" sx={{ m: 1 }}>
          +1
        </Button>
        <Button onClick={() => dispatch(decrement())} variant="outlined">
          -1
        </Button>
      </Box>
      <Feedback />
    </Box>
  );
};

export default Content;