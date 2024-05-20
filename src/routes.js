import {
  ANALYTICS_ROUTE,
  AUTH_ROUTE,
  BOARD_ROUTE,
  MESSENGER_ROUTE,
  ORDERS_ROUTE,
  TASKS_ROUTE,
} from './utils/consts';

import AuthPage from './pages/AuthPage';
import MessengerPage from './pages/MessengerPage';
import BoardPage from './pages/BoardPage';
import TaskPage from './pages/TaskPage';

import EmailIcon from '@mui/icons-material/Email';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AssignmentIcon from '@mui/icons-material/Assignment';

import AnalyticsPage from './pages/AnalyticsPage';
import OrderPage from './pages/OrdersPage';
import OrdersPage from './pages/OrdersPage';

export const authRoutes = [
  {
    title: 'Мессенджер',
    Icon: EmailIcon,
    path: MESSENGER_ROUTE,
    Component: MessengerPage,
  },
  {
    title: 'Доска',
    Icon: DashboardCustomizeIcon,
    path: BOARD_ROUTE,
    Component: BoardPage,
  },
  {
    title: 'Заявки',
    Icon: AssignmentIcon,
    path: ORDERS_ROUTE,
    Component: OrdersPage,
  },
  {
    title: 'Задачи',
    Icon: CalendarMonthIcon,
    path: TASKS_ROUTE,
    Component: TaskPage,
  },
  {
    title: 'Аналитика',
    Icon: AnalyticsIcon,
    path: ANALYTICS_ROUTE,
    Component: AnalyticsPage,
  },
];

export const publicRoutes = [
  {
    path: AUTH_ROUTE,
    Component: AuthPage,
  },
];
