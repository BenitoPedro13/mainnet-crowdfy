import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { useStateContext } from "../context";
import { money } from "../assets";
import { CustomButton, FormField, FundCard, Loader } from "../components";
import { checkIfImage } from "../utils";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: "John Doe",
    title: "Type your title",
    description:
      "Type here a good description to people create empathy with your cause or necessity...",
    target: "0.5",
    deadline: "",
    image: "https://placehold.co/600x400",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
        });
        setIsLoading(false);
        navigate("/");
      } else {
        alert("Provide valid image URL");
        setForm({ ...form, image: "" });
      }
    });
  };

  useEffect(() => {}, [form]);

  console.log(form);

  return (
    <div className="flex flex-col rounded-[10px] gap-9">
      {isLoading && <Loader />}

      <h1 className="font-inter font-semibold sm:text-[48px] text-[18px] leading-[48px] text-[#0A0A0A] tracking-[-0.576px]">
        Let's Create your Campaign
      </h1>

      <div className="flex items-start gap-9 self-stretch">
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-[16px]"
        >
          <FormField
            labelName="Your Name"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange("name", e)}
          />
          <FormField
            labelName="Campaign Title"
            placeholder="Type your title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("title", e)}
          />

          <FormField
            labelName="Story"
            placeholder="Type here a good description to people create empathy with your cause or necessity..."
            isTextArea
            value={form.description}
            handleChange={(e) => handleFormFieldChange("description", e)}
          />

          {/* <div className="w-[830px] flex justify-start items-center p-4 bg-[#F7FEE7] h-[86px] rounded-[10px]">
            <img
              src={money}
              alt="money"
              className="w-[40px] h-[40px] object-contain"
            />
            <h4 className="font-inter font-semibold text-[20px] text-[#0F172A] ml-[15px]">
              You will get 100% of the raised amount
            </h4>
          </div> */}

          <div className="flex flex-col items-start py-5 px-4 gap-4 self-stretch rounded-lg bg-[#F7FEE7]">
            <div className="flex items-center gap-4 self-stretch">
              <div className="flex items-center justify-center h-[46px] pt-[10.5px] pr-3 pb-[11.5px] pl-[10px] rounded-[49px] border-[6px] border-[#ECFCCB] bg-[#D9F99D]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M12 2.5V22.5"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17 5.5H9.5C8.57174 5.5 7.6815 5.86875 7.02513 6.52513C6.36875 7.1815 6 8.07174 6 9C6 9.92826 6.36875 10.8185 7.02513 11.4749C7.6815 12.1313 8.57174 12.5 9.5 12.5H14.5C15.4283 12.5 16.3185 12.8687 16.9749 13.5251C17.6313 14.1815 18 15.0717 18 16C18 16.9283 17.6313 17.8185 16.9749 18.4749C16.3185 19.1313 15.4283 19.5 14.5 19.5H6"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex flex-1 pr-6 items-center gap-2">
                <h4 className="flex flex-1 font-inter text-xl text-[#0F172A] font-semibold tracking-[-0.7px]">You will get 100% of the raised amount</h4>
              </div>
            </div>
          </div>

          <div className="flex flex-rows flex-wrap gap-[40px]">
            <FormField
              labelName="Goal"
              placeholder="ETH 0.5"
              inputType="text"
              value={form.target}
              handleChange={(e) => handleFormFieldChange("target", e)}
              flexCol
            />
            <FormField
              labelName="End Date"
              placeholder="xx/xx/xxxx"
              inputType="date"
              value={form.deadline}
              handleChange={(e) => handleFormFieldChange("deadline", e)}
              flexCol
            />
          </div>

          <FormField
            labelName="Campaign image"
            placeholder="Place image URL of your campaign"
            inputType="url"
            value={form.image}
            handleChange={(e) => handleFormFieldChange("image", e)}
          />

          <div className="flex justify-center items-center mt-[40px]">
            <CustomButton
              btnType="submit"
              title="Submit new campaign"
              styles="bg-[#1dc071]"
            />
          </div>
        </form>
        <FundCard
          owner={form.name}
          title={form.title}
          description={form.description}
          target={form.target}
          deadline={form.deadline}
          image={form.image}
          amountCollected={+form.target / 2 ?? 5}
        />
      </div>
    </div>
  );
};

export default CreateCampaign;
