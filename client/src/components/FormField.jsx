import React from "react";

const FormField = ({
  labelName,
  placeholder,
  inputType,
  isTextArea,
  value,
  handleChange,
  flexCol,
}) => {
  return (
    <label
      className={`flex-1 flex items-start ${
        flexCol ? "flex-col" : ""
      } gap-5 self-stretch border-b border-[#E4E4E6] pb-[22px]`}
    >
      {labelName && (
        <div className="flex w-full max-w-[250px] gap-[10px]">
          <span className="font-jakarta font-semibold text-[16px] leading-[24px] text-[#344054]">
            {labelName}
          </span>
        </div>
      )}
      {isTextArea ? (
        <div className="flex flex-col items-start gap-[6px] flex-1 self-stretch">
          <div className="flex flex-1 items-start gap-2 self-stretch">
            <div className="flex flex-1 flex-col items-start gap-[6px] self-stretch">
              <textarea
                required
                value={value}
                onChange={handleChange}
                rows={10}
                placeholder={placeholder}
                className="flex flex-1 py-2 px-3 border border-[#CBD5E1] bg-white font-inter text-[#002251] text-[16px] placeholder:text-[#4b5264] rounded-[6px] sm:min-w-[300px] w-full"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-1 flex-col items-start gap-[6px]">
          <div className="flex items-start gap-2 self-stretch">
            <div className="flex flex-1 flex-col items-start gap-[6px]">
              <input
                required
                value={value}
                onChange={handleChange}
                type={inputType}
                step="0.1"
                placeholder={placeholder}
                className="flex py-2 px-3 self-stretch rounded-md border border-[#CBD5E1] bg-white font-inter text-base text-[#002251]"
              ></input>
            </div>
          </div>
        </div>
      )}
    </label>
  );
};

export default FormField;
