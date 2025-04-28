// src/components/Content.jsx
import { useEffect, useState } from "react"; // Добавляем useState
import Feedback from "./Feedback";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../redux/counterSlice";
import { Box, Typography, Button, Grid } from "@mui/material";

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

const Content = ({ selectedLabId }) => { 
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const lab = labDescriptions[selectedLabId]; 

  console.log("Рендер компонента Content");
  console.log("Получен selectedLabId:", selectedLabId);
  console.log("Найденное описание lab:", lab);
  
  useEffect(() => {
    console.log("🟢 Компонент Content МОНТИРОВАН!", { selectedLabId });
    return () => {
      console.log("🔴 Компонент Content РАЗМОНТИРОВАН!");
    };
  }, [selectedLabId]);

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, maxWidth: "100%", overflowX: "auto" }}>
      {lab ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom sx={{ fontSize: { xs: "1.25rem", md: "1.5rem" } }}>
              {lab.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                whiteSpace: "pre-line",
                fontSize: { xs: "0.875rem", md: "1rem" },
                lineHeight: 1.6,
              }}
            >
              {lab.description}
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="h5" color="textSecondary" sx={{ fontSize: { xs: "1.25rem", md: "1.5rem" } }}>
          Выберите лабораторную работу
        </Typography>
      )}

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" sx={{ fontSize: { xs: "1.1rem", md: "1.25rem" } }}>
          Счётчик: {count}
        </Typography>
        <Button
          onClick={() => dispatch(increment())}
          variant="contained"
          sx={{ m: 1, fontSize: { xs: "0.75rem", md: "0.875rem" } }}
        >
          +1
        </Button>
        <Button
          onClick={() => dispatch(decrement())}
          variant="outlined"
          sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
        >
          -1
        </Button>
      </Box>
      <Feedback />
    </Box>
  );
};

export default Content;