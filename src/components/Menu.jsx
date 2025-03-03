import { List, ListItem, ListItemText } from "@mui/material";

const Menu = ({ onSelect }) => {
  const labs = [
    { id: 1, title: "Лабораторная работа 1" },
    { id: 2, title: "Лабораторная работа 2" },
    { id: 3, title: "Лабораторная работа 3" },
  ];

  return (
    <List>
      {labs.map((lab) => (
        <ListItem button key={lab.id} onClick={() => onSelect(lab)}>
          <ListItemText primary={lab.title} />
        </ListItem>
      ))}
    </List>
  );
};

export default Menu;
