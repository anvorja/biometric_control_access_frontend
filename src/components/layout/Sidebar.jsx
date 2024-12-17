import {List, ListItem, ListItemIcon, ListItemText, Divider, Toolbar} from '@mui/material';
import { Person, Fingerprint, Assessment, History } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Usuarios', icon: <Person />, path: '/dashboard/users' },
    { text: 'Control de Acceso', icon: <Fingerprint />, path: '/dashboard/access' },
    { text: 'Historial', icon: <History />, path: '/dashboard/access/history' },
    { text: 'Reportes', icon: <Assessment />, path: '/dashboard/reports' },
  ];

  return (
      <>
        <Toolbar /> {/* Este Toolbar actúa como espaciador */}
        <List>
          {menuItems.map((item) => (
              <ListItem button key={item.text} onClick={() => navigate(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
          ))}
          <Divider />
        </List>
      </>
  );
};
