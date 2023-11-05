import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { useStateContext } from "../context";
import { CountBox, CustomButton, Loader } from "../components";
import { calculateBarPercentage, daysLeft } from "../utils";
import { thirdweb } from "../assets";

const CampaignDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { donate, getDonations, contract, address } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState([]);

  const remainingDays = daysLeft(state.deadline);

  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(
      (calculateBarPercentage(state.target, state.amountCollected) / 100) * 366
    );
  }, [state.target, state.amountCollected]);

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);

    setDonators(data);
  };

  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address]);

  const handleDonate = async () => {
    setIsLoading(true);

    await donate(state.pId, amount);

    navigate("/");
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <div className="flex flex-1 items-start pt-10 gap-7 self-stretch">
        <div className="flex flex-col w-full gap-[60px]">
          {isLoading && <Loader />}

          <div className="w-full flex md:flex-row flex-col gap-[30px]">
            <div className="flex-1 flex-col">
              <img
                src={state.image}
                alt="campaign"
                className="w-full h-[410px] object-cover rounded-xl"
              />
            </div>
          </div>

          <div className=" flex lg:flex-row flex-col gap-5">
            <div className="flex-[2] flex flex-col gap-[40px]">
              <div>
                <div className="flex items-center gap-2 self-stretch">
                  <h4 className="flex flex-1 font-inter font-semibold text-xl text-[#101828] align-middle items-center">
                    👤 Creator
                  </h4>
                </div>

                <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
                  <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                    <img
                      src={thirdweb}
                      alt="user"
                      className="w-[60%] h-[60%] object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="flex flex-1 font-inter font-semibold text-base text-[#101828] align-middle items-center">
                      {state.owner}
                    </h4>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 self-stretch">
                  <h4 className="flex flex-1 font-inter font-semibold text-xl text-[#101828] align-middle items-center">
                  📇 {"   "} {"  "} Description
                  </h4>
                </div>

                <div className="mt-[20px]">
                  <p className="font-jakarta font-normal text-[#475467] text-justify text-base">
                    {state.description}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="flex flex-1 font-inter font-semibold text-xl text-[#101828] align-middle items-center">
                🕊️ {" "} Donators
                </h4>

                <div className="mt-[20px] flex flex-col gap-4">
                  {donators.length > 0 ? (
                    donators.map((item, index) => (
                      <div
                        key={`${item.donator}-${index}`}
                        className="flex justify-between items-center gap-4"
                      >
                        <p className="font-jakarta font-normal text-[#475467] text-justify text-base break-all">
                          {index + 1}. {item.donator}
                        </p>
                        <p className="font-jakarta font-normal text-[#101828] text-justify text-base break-all">
                          {item.donation} ETH
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="font-inter font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                      No donators yet. Be the first one!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-[15px]">
          <div className="flex flex-col items-start max-w-[400px] p-[18px] gap-[21px] self-stretch rounded-xl border border-[#EAECF0] bg-slate-50 shadow-sm">
            <h4 className="self-stretch text-[#475467] font-inter text-xl font-semibold tracking-[-0.7px]">
              🫰 Funds donated to this campaign
            </h4>
            <div className="flex w-[364px] h-9 items-center gap-[11px]">
              <span className="text-[#1E293B] font-inter text-3xl tracking-[-0.225px]">
                {state.amountCollected} /{" "}
                <span className="text-[#1E293B] font-bold font-inter text-3xl tracking-[-0.225px]">
                  {state.target}
                </span>
              </span>
            </div>
            <div className="relative w-full h-[5px] bg-[#ECFCCB] mt-4 rounded-[53px]">
              <div
                className={`h-full max-w-full bg-[#84CC16] rounded-[53px]`}
                style={{ width: !width ? "0px" : `${width}px` }}
              ></div>
            </div>
            <div className="flex items-center justify-between gap-4 w-full">
              <p className="font-jakarta text-base text-[#475467] self-stretch">
                {donators.length}{" "}
                {donators.length > 1 ? "donations" : "donation"}
              </p>
              <p className="font-jakarta text-base text-[#475467] self-stretch">
                {remainingDays} {remainingDays > 1 ? "days" : "day"} remaining
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start max-w-[400px] p-[18px] gap-[21px] self-stretch rounded-xl border border-[#EAECF0] bg-slate-50 shadow-sm">
            <h4 className="self-stretch text-[#475467] font-inter text-xl font-semibold tracking-[-0.7px]">
              💪 Fund this campaign
            </h4>
            <div className="flex items-start gap-2 self-stretch">
              <div className="flex flex-1 flex-col items-start gap-[6px]">
                <input
                  type="text"
                  placeholder="ETH 0.50"
                  step="0.01"
                  className="flex py-2 px-3 items-start text-[#002251] font-inter text-base self-stretch rounded-md border border-[#CBD5E1] bg-white"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-start gap-[6px] self-stretch">
              <button
                className="flex flex-1 py-2 px-4 items-center justify-center gap-2 rounded-md border border-[#FFF2AB]"
                style={{
                  background: `linear-gradient(180deg, #FFF2AB -10%, #84CC16 11.67%)`,
                }}
                onClick={async () => await handleDonate()}
              >
                <p className="text-white text-sm leading-6 font-medium font-inter">
                  Donate now
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                >
                  <g clip-path="url(#clip0_303_5248)">
                    <path
                      d="M0.53125 15.9688V0.03125H16.4688V15.9688H0.53125Z"
                      stroke="white"
                      strokeWidth="0.0625"
                    />
                    <path
                      d="M8.5 1V15"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 8L8.5 10.5L3 8"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.5 1L14 8L8.5 15L3 8L8.5 1Z"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_303_5248">
                      <rect
                        width="16"
                        height="16"
                        fill="white"
                        transform="translate(0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
