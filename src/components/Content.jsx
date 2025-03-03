import { Box, Typography } from "@mui/material";

const labDescriptions = {
  1: `Лабораторная работа 1:
  - Реализовать скрипт, который уведомит о полной загрузке страницы.
  - Реализовать кнопку-счётчик (увеличение и уменьшение).
  - Реализовать форму аутентификации пользователя.
  - Реализовать очистку и отправку данных формы с валидацией.
  - Реализовать сохранение учетных данных в localStorage.`,

  2: `Лабораторная работа 2:
  - Создать "Hello World" приложение на React (create-react-app или Vite).
  - Реализовать кнопку и контейнер, разместить их на странице.
  - Добавить навигационные компоненты.
  - Разместить проект в GitHub и прикрепить ссылку.`,

  3: `Лабораторная работа 3:
  - Доработать шаблон страницы и навигацию (с использованием MUI/Bootstrap).
  - Реализовать компоненты: Header, Footer, Menu и Content.
  - В меню вывести список лабораторных работ.
  - В Content отображать описание выбранной работы.
  - Разместить проект в GitHub и добавить ссылку.`
};

const Content = ({ selectedLab }) => {
  return (
    <Box sx={{ p: 2 }}>
      {selectedLab ? (
        <>
          <Typography variant="h5">{selectedLab.title}</Typography>
          <Typography variant="body1">{labDescriptions[selectedLab.id]}</Typography>
        </>
      ) : (
        <Typography variant="body1">Выберите лабораторную работу</Typography>
      )}
    </Box>
  );
};

export default Content;
