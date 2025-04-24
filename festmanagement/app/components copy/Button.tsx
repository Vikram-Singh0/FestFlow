"use client";

import Link from "next/link";
import ButtonSvg from "../assets/svg/ButtonSvg";

interface ButtonProps {
  className?: string;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  px?: string;
  white?: boolean;
}

const Button = ({ className = "", href, onClick, children, px, white }: ButtonProps) => {
  const classes = `button relative inline-flex items-center justify-center h-11 transition-colors hover:text-color-1 ${
    px || "px-7"
  } ${white ? "text-n-8" : "text-n-1"} ${className}`;
  const spanClasses = "relative z-10";

  const content = (
    <>
      <span className={spanClasses}>{children}</span>
      {ButtonSvg(white)}
    </>
  );

  return href ? (
    href.startsWith("http") ? (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    ) : (
      <Link href={href} className={classes}>
        {content}
      </Link>
    )
  ) : (
    <button className={classes} onClick={onClick}>
      {content}
    </button>
  );
};

export default Button;
