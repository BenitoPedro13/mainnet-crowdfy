import React, { useState, useEffect } from "react";

import { thirdweb } from "../assets";
import { calculateBarPercentage, daysLeft } from "../utils";

const FundCard = ({
  owner,
  title,
  description,
  target,
  deadline,
  amountCollected,
  image,
  handleClick,
}) => {
  const remainingDays = daysLeft(deadline);

  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth((calculateBarPercentage(target, amountCollected) / 100) * 364);
  }, [target, amountCollected]);

  return (
    <div
      className="max-w-[398px] w-full rounded-[12px] bg-[#FFFFFF] cursor-pointer border-solid border shadow-md"
      onClick={handleClick}
    >
      <img
        src={image}
        alt="fund"
        className="w-full h-[175px] object-cover rounded-b-none rounded-t-xl"
      />

      <div className="flex items-center gap-[10px] px-4 mt-[20px]">
        <div className="w-[41px] h-[41px] rounded-full flex justify-center items-center bg-[#13131a]">
          <img
            src={thirdweb}
            alt="user"
            className="w-1/2 h-1/2 object-contain"
          />
        </div>
        <p className="flex-1 font-jakarta font-medium text-[16px] text-[#475467] truncate">
          <span className="text-[#475467]">{owner}</span>
        </p>
      </div>

      <div className="flex flex-col p-4">
        <div className="flex flex-col gap-1">
          <h3 className="font-inter font-semibold text-[24px] text-[#101828] text-left leading-[26px] truncate">
            {title}
          </h3>
          <p className="font-jakarta font-normal text-[#475467] text-left leading-[18px] line-clamp-2 text-ellipsis">
            {description}
          </p>
        </div>

        <div className="relative w-full h-[5px] bg-[#ECFCCB] mt-4 rounded-[53px]">
          <div
            className={`h-full max-w-full bg-[#84CC16] rounded-[53px]`}
            style={{ width: !width ? "0px" : `${width}px` }}
          ></div>
        </div>

        <div className="flex justify-between flex-wrap mt-4 gap-2">
          <h4 className="font-inter font-semibold text-[14px] text-[#1E293B] leading-[22px]">{`${amountCollected} / ${target} ETH`}</h4>

          <h4 className="font-inter font-semibold text-[14px] text-[#1E293B] leading-[22px]">
            {((amountCollected / target) * 100).toFixed(1)}%
          </h4>
        </div>
      </div>
    </div>
  );
};

export default FundCard;
