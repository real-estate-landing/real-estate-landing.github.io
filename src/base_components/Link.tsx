import React from "react";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();
type Props = {
  href: string;
  id?: string;
  className?: string;
  children: React.ReactNode;
};

function Link({ href, id, className, children }: Props) {
  return (
    <h4 onClick={() => history.push(href)} id={id} className={className}>
      {children}
    </h4>
  );
}

export default Link;
