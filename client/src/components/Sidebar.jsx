import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "@thirdweb-dev/react";

import { logo, sun } from "../assets";
import { navlinks } from "../constants";

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`w-[48px] h-[48px] rounded-lg  flex justify-center items-center ${
      !disabled && "cursor-pointer"
    } ${styles} ${isActive && isActive === name && "bg-[#F1F5F9]"}`}
    onClick={handleClick}
  >
    {!isActive ? (
      <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
    ) : (
      <img
        src={imgUrl}
        alt="fund_logo"
        className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"}`}
      />
    )}
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const { logout, isLoading } = useLogout();

  return (
    <>
      <div className="flex w-[82px] flex-col justify-between items-start sticky h-[100vh] flex-shrink-0 self-stretch border-r border-[#DDDDDD]">
        <div className="flex flex-col items-start gap-10 self-stretch pt-8">
          <div className="flex flex-col items-start self-stretch pr-5 pl-6">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="30"
                viewBox="0 0 35 30"
                fill="none"
              >
                <path
                  d="M31.6544 -0.000122217C33.5021 -0.000122136 35 1.49775 35 3.34547C35 5.19319 33.5021 6.69106 31.6544 6.69106L3.34559 6.69106C1.49787 6.69106 -2.27007e-07 5.19319 -1.4624e-07 3.34547C-6.5474e-08 1.49775 1.49787 -0.000123535 3.34559 -0.000123454L31.6544 -0.000122217Z"
                  fill="#84CC16"
                />
                <path
                  d="M23.4188 11.5808C25.2665 11.5808 26.7644 13.0787 26.7644 14.9264C26.7644 16.7741 25.2665 18.272 23.4188 18.272L11.5806 18.272C9.73286 18.272 8.23499 16.7741 8.23499 14.9264C8.23499 13.0787 9.73286 11.5808 11.5806 11.5808L23.4188 11.5808Z"
                  fill="#84CC16"
                />
                <path
                  d="M17.4999 23.1617C19.3476 23.1617 20.8455 24.6596 20.8455 26.5073C20.8455 28.3551 19.3476 29.8529 17.4999 29.8529C15.6522 29.8529 14.1543 28.3551 14.1543 26.5073C14.1543 24.6596 15.6522 23.1617 17.4999 23.1617Z"
                  fill="#84CC16"
                />
              </svg>
            </Link>
          </div>
          <div className="flex flex-col items-start gap-2 px-4 self-stretch">
            {navlinks.map((link) => (
              <Icon
                key={link.name}
                {...link}
                isActive={isActive}
                handleClick={() => {
                  if (!link.disabled) {
                    setIsActive(link.name);
                    navigate(link.link);
                  }
                }}
                disabled={link.name in []}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start gap-6 self-stretch px-4 pb-10">
          <div className="flex flex-col items-start gap-2 self-stretch">
            <Icon
              styles="bg-transparent"
              name="theme"
              imgUrl={sun}
              isActive={isActive}
              handleClick={() => {
                if (isActive !== "theme") {
                  setIsActive("theme");
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
