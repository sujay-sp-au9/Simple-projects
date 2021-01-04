import React from "react";

export default function Link({ href, text, className }) {
  const handleClick = (e) => {
    if (e.metaKey || e.ctrlKey) {
      return;
    }
    e.preventDefault();
    window.history.pushState({}, "", href);
    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
  };
  return (
    <a href={href} onClick={handleClick} className={className}>
      {text}
    </a>
  );
}
