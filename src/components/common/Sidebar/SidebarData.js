import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as HiIcons from 'react-icons/hi';
import * as BiIcons from 'react-icons/bi';

export const SidebarData = [
  {
    title: 'Dashboard',
    path: 'adminDashboard',
    icon: <BsIcons.BsGraphUp />,
    id:1,
  },
  {
    title: 'Products',
    path: 'adminProducts',
    icon: <FaIcons.FaCartPlus />,
    id:2,
  },
  {
    title: 'Categories',
    path: 'adminCategories',
    icon: <BiIcons.BiCategory />,
    id:3,
  },
  {
    title: 'Orders',
    path: 'adminOrders',
    icon: <FaIcons.FaEnvelopeOpenText />,
    id:4,
  },
  {
    title: 'Users',
    path: 'adminUsers',
    icon: <HiIcons.HiUsers />,
    id:5,
  },
  {
    title: 'Back to site',
    path: '',
    icon: <AiIcons.AiOutlineRollback />,
    id:6,
  },
];