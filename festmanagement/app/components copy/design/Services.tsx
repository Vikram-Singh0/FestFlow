interface ChatMessageProps {
  message: string;
  isPhoto: boolean;
  position: 'left' | 'right';
}

export const Gradient = () => {
  return (
    <div className="absolute top-0 -left-[10rem] w-[56.625rem] h-[56.625rem] opacity-50 mix-blend-color-dodge pointer-events-none">
      <img
        className="absolute top-1/2 left-1/2 w-[79.5625rem] max-w-[79.5625rem] h-[88.5625rem] -translate-x-1/2 -translate-y-1/2"
        src={gradient}
        width={1417}
        height={1417}
        alt="Gradient"
      />
    </div>
  );
};

export const ChatMessage = ({ message, isPhoto, position }: ChatMessageProps) => {
  const messageStyle = isPhoto
    ? 'py-6 px-8 bg-black rounded-t-xl rounded-bl-xl font-code text-base'
    : 'pt-2.5 pr-2.5 pb-7 pl-5 bg-n-6 rounded-t-xl rounded-br-xl font-code text-base';

  const positionStyle = position === 'right'
    ? 'absolute top-8 right-8 max-w-[17.5rem] lg:top-16 lg:right-[8.75rem]'
    : 'absolute top-8 left-[3.125rem] max-w-[14rem] lg:left-[3.125rem]';

  return (
    <div className={`${messageStyle} ${positionStyle}`}>
      {message}
      <ChatBubbleWing className={position === 'right' ? 'absolute right-full bottom-0 -scale-x-100' : 'absolute left-full bottom-0'} />
    </div>
  );
};

export const VideoBar = () => {
  return (
    <div className="absolute left-0 bottom-0 w-full flex items-center p-6">
      <img
        src={play}
        width={24}
        height={24}
        alt="Play"
        className="object-contain mr-3"
      />

      <div className="flex-1 bg-[#D9D9D9]">
        <div className="w-1/2 h-0.5 bg-color-1"></div>
      </div>
    </div>
  );
};
