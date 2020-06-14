/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import DataUsage from '@material-ui/icons/DataUsage'
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import Status from "views/Status/Status.js";
import Tutorial from "views/Tutorial/Tutorial.js";
import HelpIcon from '@material-ui/icons/Help';
import Issue from 'views/Issue/Issue'

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/console"
  },
  {
    path: "/user",
    name: "User Settings",
    icon: Person,
    component: UserProfile,
    layout: "/console"
  },
  {
    path: "/status",
    name: "Status",
    icon: DataUsage,
    component: Status,
    layout: "/console"
  },
  {
    path: "/tutorial",
    name: "Tutorial",
    icon: LibraryBooks,
    component: Tutorial,
    layout: "/console"
  },
  {
    path: "/issue",
    name: "Issue",
    icon: HelpIcon,
    component: Issue,
    layout: "/console"
  },
];

export default dashboardRoutes;
