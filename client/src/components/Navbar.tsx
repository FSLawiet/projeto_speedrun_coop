import { useState, CSSProperties, useEffect } from "react";
import { AiOutlineHome, AiOutlineInfoCircle } from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import {
  MdOutlineDashboard,
  MdOutlinePhotoSizeSelectActual,
} from "react-icons/md";
import { NavLink, matchRoutes, useLocation } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");

  const routes = [
    { path: "/", color: "#f44336" },
    { path: "/dashboard", color: "#ffa117" },
  ];
  const location = useLocation();
  const routeList = matchRoutes(routes, location);
  useEffect(() => {
    if (routeList && routeList.length > 0)
      for (let route of routeList) {
        setCurrentPath(route.route.path);
      }
  }, [routeList]);

  return (
    <div>
      <div className={`navigation ${isOpen ? "active" : ""}`}>
        <div
          className="menuToggle"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        ></div>
        <ul>
          <li className={currentPath === "/" ? "active" : ""}>
            <NavLink to="/" style={{ "--clr": "#f44336" } as CSSProperties}>
              <span className="icon">
                <AiOutlineHome />
              </span>
              <span className="text">Home</span>
            </NavLink>
          </li>
          <li className={currentPath === "/dashboard" ? "active" : ""}>
            <NavLink
              to="/dashboard"
              style={{ "--clr": "#ffa117" } as CSSProperties}
            >
              <span className="icon">
                <MdOutlineDashboard />
              </span>
              <span className="text">Dashboard</span>
            </NavLink>
          </li>
          <li className={currentPath === "/" ? "active" : ""}>
            <NavLink to="/" style={{ "--clr": "#0fc70f" } as CSSProperties}>
              <span className="icon">
                <BiMessageDetail />
              </span>
              <span className="text">Messages</span>
            </NavLink>
          </li>
          <li className={currentPath === "/" ? "active" : ""}>
            <NavLink to="/" style={{ "--clr": "#2196f3" } as CSSProperties}>
              <span className="icon">
                <MdOutlinePhotoSizeSelectActual />
              </span>
              <span className="text">Photos</span>
            </NavLink>
          </li>
          <li className={currentPath === "/" ? "active" : ""}>
            <NavLink to="/" style={{ "--clr": "#b145e9" } as CSSProperties}>
              <span className="icon">
                <FiSettings />
              </span>
              <span className="text">Settings</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
