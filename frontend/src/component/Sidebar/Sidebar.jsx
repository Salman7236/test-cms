
import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  IconButton,
  Tooltip,
  Box,
  Divider,
  Typography,
  Collapse,
  useTheme,
  useMediaQuery,
  alpha
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ExpandLess,
  ExpandMore,
  Business as BusinessIcon,
  Apartment as ApartmentIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  Category as CategoryIcon,
  Settings as SettingsIcon,
  Group as GroupIcon,
  Layers as LayersIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = [
  {
    text: 'Dashboard',
    icon: <DashboardIcon sx={{ fontSize: '1.25rem' }} />,
    path: '/dashboard',
    roles: ['admin', 'coordinator', 'user']
  },
  {
    text: 'System Setup',
    icon: <SettingsIcon sx={{ fontSize: '1.25rem' }} />,
    roles: ['admin'], // Only admin can see System Setup
    subItems: [
      { text: 'User Management', icon: <PeopleIcon sx={{ fontSize: '1rem' }} />, path: '/users', roles: ['admin'] },
      { text: 'Roles & Permissions', icon: <GroupIcon sx={{ fontSize: '1rem' }} />, path: '/usertype', roles: ['admin'] },
      { text: 'Company Management', icon: <BusinessIcon sx={{ fontSize: '1rem' }} />, path: '/company', roles: ['admin'] },
      { text: 'Complaint Categories', icon: <LayersIcon sx={{ fontSize: '1rem' }} />, path: '/complain-category', roles: ['admin'] },
      { text: 'Complaint Sub Categories', icon: <CategoryIcon sx={{ fontSize: '1rem' }} />, path: '/complain-sub-category/:categoryId', roles: ['admin'] },
    ]
  },
  {
    text: 'Office Management',
    icon: <AssignmentTurnedInIcon sx={{ fontSize: '1.25rem' }} />,
    roles: ['admin', 'coordinator'], // Admin and coordinators can see Office Management
    subItems: [
      { text: 'Office', icon: <ApartmentIcon sx={{ fontSize: '1rem' }} />, path: '/office', roles: ['admin'] },
      { text: 'Office Allocation', icon: <AssignmentTurnedInIcon sx={{ fontSize: '1rem' }} />, path: '/allocation', roles: ['admin', 'coordinator'] },
    ]
  },
];


const userRole = localStorage.getItem("userRole") || 'user';


const filteredMenuItems = menuItems.filter(item => {
  if (!item.roles) return true;
  return item.roles.includes(userRole);
}).map(item => {
  if (item.subItems) {
    return {
      ...item,
      subItems: item.subItems.filter(subItem => {
        if (!subItem.roles) return true;
        return subItem.roles.includes(userRole);
      })
    };
  }
  return item;
}).filter(item => {
  if (item.subItems && item.subItems.length === 0) return false;
  return true;
});

const Sidebar = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isOpen, setIsOpen] = useState(!isMobile);
  const [openMenus, setOpenMenus] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const drawerWidth = isOpen ? 240 : 72;

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setOpenMenus({});
  };

  const toggleSubMenu = (text) => {
    setOpenMenus((prev) => ({
      ...prev,
      [text]: !prev[text]
    }));
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login', { replace: true });
  };

  const isActive = (path) => location.pathname.startsWith(path);

  const renderMenuItem = (item, depth = 0) => {
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isItemActive = isActive(item.path || '') ||
      (hasSubItems && item.subItems.some(sub => isActive(sub.path)));

    return (
      <React.Fragment key={item.text}>
        <Tooltip
          title={!isOpen ? item.text : ''}
          placement="right"
          arrow
          disableHoverListener={isOpen}
          componentsProps={{
            tooltip: {
              sx: {
                bgcolor: '#333',
                color: 'white',
                fontSize: '0.8rem',
                boxShadow: theme.shadows[4]
              }
            }
          }}
        >
          <ListItem
            button
            onClick={() => hasSubItems ? toggleSubMenu(item.text) : navigate(item.path)}
            sx={{
              px: isOpen ? 2.5 : 2,
              py: 1,
              mx: 1,
              my: 0.25,
              pl: isOpen ? 2 + (depth * 2) : 2,
              borderRadius: '6px',
              background: isItemActive ? alpha(theme.palette.primary.light, 0.2) : 'transparent',
              '&:hover': {
                background: alpha(theme.palette.primary.light, 0.15)
              },
              transition: 'all 0.2s ease-out',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <AnimatePresence>
              {isItemActive && (
                <motion.div
                  layoutId={`activeIndicator-${item.text}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 3,
                    background: theme.palette.secondary.main,
                    borderRadius: '0 3px 3px 0'
                  }}
                />
              )}
            </AnimatePresence>

            <ListItemIcon
              sx={{
                color: isItemActive ? theme.palette.secondary.main : 'inherit',
                minWidth: isOpen ? 40 : 32,
                transition: 'color 0.2s ease-out'
              }}
            >
              {item.icon}
            </ListItemIcon>

            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                style={{ flexGrow: 1 }}
              >
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: 500,
                    fontSize: '0.85rem',
                    letterSpacing: '0.25px'
                  }}
                />
              </motion.div>
            )}

            {hasSubItems && isOpen && (
              <motion.div
                animate={{
                  rotate: openMenus[item.text] ? 180 : 0,
                  color: openMenus[item.text] ? theme.palette.secondary.main : 'inherit'
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <ExpandMore sx={{ fontSize: '1.1rem' }} />
              </motion.div>
            )}
          </ListItem>
        </Tooltip>

        {/* SubItems */}
        {hasSubItems && (
          <Collapse
            in={openMenus[item.text]}
            timeout="auto"
            unmountOnExit
            sx={{ pl: isOpen ? 1.5 + (depth * 2) : 0 }}
          >
            <List component="div" disablePadding>
              {item.subItems.map((subItem) => (
                renderMenuItem(subItem, depth + 1)
              ))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Sidebar */}
      <motion.div
        initial={{ width: drawerWidth }}
        animate={{ width: drawerWidth }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          position: 'fixed',
          height: '100vh',
          background: `linear-gradient(180deg, ${alpha('#515151', 0.95)} 0%, ${alpha('#424242', 0.95)} 100%)`,
          color: theme.palette.common.white,
          display: 'flex',
          flexDirection: 'column',
          zIndex: theme.zIndex.drawer + 1,
          overflow: 'hidden',
          boxShadow: '4px 0 20px rgba(0, 0, 0, 0.15)',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        {/* Header */}
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: isOpen ? 'space-between' : 'center',
            alignItems: 'center',
            px: isOpen ? 2 : 0,
            py: 1.5,
            minHeight: '64px',
            background: alpha('#424242', 0.8),
            backdropFilter: 'blur(8px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Typography variant="h6" noWrap sx={{
                fontWeight: 700,
                background: 'linear-gradient(90deg, #ffffff, #e0e0e0)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                letterSpacing: '0.5px'
              }}>
                Admin Portal
              </Typography>
            </motion.div>
          )}
          <IconButton
            onClick={handleToggle}
            sx={{
              color: 'inherit',
              '&:hover': {
                background: alpha(theme.palette.common.white, 0.1)
              }
            }}
          >
            {isOpen ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

        {/* Menu Items */}
        {/* <List sx={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          py: 1,
          '&::-webkit-scrollbar': { width: 4 },
          '&::-webkit-scrollbar-thumb': {
            background: alpha(theme.palette.common.white, 0.2),
            borderRadius: 2
          }
        }}>
          {menuItems.map((item) => renderMenuItem(item))}
        </List> */}

        <List sx={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          py: 1,
          '&::-webkit-scrollbar': { width: 4 },
          '&::-webkit-scrollbar-thumb': {
            background: alpha(theme.palette.common.white, 0.2),
            borderRadius: 2
          }
        }}>
          {filteredMenuItems.map((item) => renderMenuItem(item))}
        </List>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

        {/* Logout */}
        <Tooltip
          title={!isOpen ? 'Logout' : ''}
          placement="right"
          arrow
          componentsProps={{
            tooltip: {
              sx: {
                bgcolor: '#333',
                color: 'white',
                fontSize: '0.8rem',
                boxShadow: theme.shadows[4]
              }
            }
          }}
        >
          <ListItem
            button
            onClick={handleLogout}
            sx={{
              px: isOpen ? 2.5 : 2,
              py: 1,
              mx: 1,
              my: 1,
              borderRadius: '6px',
              '&:hover': {
                background: alpha(theme.palette.error.dark, 0.2),
                '& .MuiListItemIcon-root': {
                  color: theme.palette.error.light
                }
              },
              transition: 'all 0.2s ease-out'
            }}
          >
            <ListItemIcon
              sx={{
                color: 'inherit',
                minWidth: isOpen ? 40 : 32
              }}
            >
              <LogoutIcon sx={{ fontSize: '1.25rem' }} />
            </ListItemIcon>
            {isOpen && (
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{
                  fontWeight: 500,
                  fontSize: '0.85rem',
                  letterSpacing: '0.25px'
                }}
              />
            )}
          </ListItem>
        </Tooltip>
      </motion.div>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: `${drawerWidth}px`,
          width: `calc(100% - ${drawerWidth}px)`,
          minHeight: '100vh',
          background: theme.palette.background.default,
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;