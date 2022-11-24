import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../types/store";
import { resetCountFilmsShown } from "../store/slices";

type propsType = {
  to: string;
  className?: string;
  children: React.ReactNode;
};

const CustomLink = ({ to, className, children }: propsType) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleClickLink = () => {
    dispatch(resetCountFilmsShown());
  };

  return (
    <Link to={to} onClick={handleClickLink} className={className}>
      {children}
    </Link>
  );
};

export default CustomLink;
