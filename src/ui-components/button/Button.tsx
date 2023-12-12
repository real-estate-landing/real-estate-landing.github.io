interface Props {
  text: string;
  full?: boolean;
}

function Button(props: Props) {
  const { text, full } = props;
  return (
    <button
      className={`py-2 px-4 bg-[#3F51B5] rounded-[8px] text-white ${
        full ? "w-full" : ""
      }`}
    >
      {text}
    </button>
  );
}

export default Button;
