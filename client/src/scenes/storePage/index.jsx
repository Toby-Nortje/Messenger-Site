import "./index.css";
import {
  Routes,
  Route,
  Link,
  Outlet,
  useLocation,
  useMatches,
} from "react-router-dom";
import NavbarMain from "scenes/navbar";
import Breadcrumbs from "components/Breadcrumbs";


const StorePage = () => {
  let location = useLocation();
  const breadcrumbs = location.pathname.split("/").slice(1);

  return (
    <div>
      <div className="breadcrumb">
        <Link className="bread" to="/">
          Home
        </Link>
        {breadcrumbs.map((bread, index) =>
          index < breadcrumbs.length - 1 ? (
            <Link className="bread" to={`/${bread}`}>
              {bread[0].toUpperCase(0, 1) + bread.slice(1)}
            </Link>
          ) : (
            <div className="bread-nosauce">
              {bread[0].toUpperCase(0, 1) + bread.slice(1)}
            </div>
          )
        )}
      </div>
      <h1 style={{ textTransform: "capitalize" }}>
        {breadcrumbs[breadcrumbs.length - 1]}
      </h1>
      <Outlet />
    </div>
  );
};

export default StorePage;
