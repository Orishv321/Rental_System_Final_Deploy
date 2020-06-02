import Home from "../view/Home/Home";
import Registration from "../view/Registration/Registration";
import Contact from "../view/ContactUs/Contact";
import About from "../view/About/About";
import Logout from "../view/Registration/Logout/Logout";
import Profile from "../view/Profile/Profile";
import Signup from "../view/Registration/Signup/Signup";
import SearchView from "../view/Search/SearchView";
export default [
  { path: "/", component: Home, exact: true },
  { path: "/register", component: Registration, exact: true },
  { path: "/contact", component: Contact, exact: true },
  // { path: "/about", component: About, exact: true },
  { path: "/logout", component: Logout, exact: true },
  { path: "/profile", component: Profile, exact: true },
  { path: "/signup", component: Signup, exact: true },
  { path: "/search", component: SearchView, exact: true },
];
