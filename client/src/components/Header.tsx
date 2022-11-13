import "./Header.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { QuoteHeader } from "./QuoteHeader";
import { quotes } from "../data/quotes";
import { Clock } from "./Clock";
import { getUserDetails } from "../features/user/userActions";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store/Store";

export interface HeaderProps {}

export const Header = ({}: HeaderProps) => {
  const pathPage = useNavigate();
  const { userInfo, userToken } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  // automatically authenticate user if token is found
  useEffect(() => {
    if (userToken) {
      dispatch(getUserDetails());
    }
  }, [userToken, dispatch]);

  return (
    <nav id="nav">
      <QuoteHeader quotesList={quotes} />
      <Clock />
      {userInfo ? `Logged in as ${userInfo.username}` : "You're not logged in"}
      {userInfo ? (
        <a className="button-link">LOGOUT</a>
      ) : (
        <a onClick={() => pathPage("/login")} className="button-link">
          LOGIN
        </a>
      )}
    </nav>
  );
};
