import { List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom"; // Импортируем Link из react-router-dom

const Menu = () => {
  const labs = [
    { id: 1, title: "Лабораторная работа 1", path: "/lab1" },
    { id: 2, title: "Лабораторная работа 2", path: "/lab2" },
    { id: 3, title: "Лабораторная работа 3", path: "/lab3" },
  ];

  return (
    <List>
      {labs.map((lab) => (
        <ListItem key={lab.id}>
          <Link to={lab.path} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemText primary={lab.title} />
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

export default Menu;
