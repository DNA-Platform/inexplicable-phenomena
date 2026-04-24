import React, { ReactNode } from "react";
import { $symbol$ } from "../implementation/symbols";
import { $Chemical } from "../abstraction/chemical";

export class $List extends $Chemical {
    view(): ReactNode {
        const children = React.Children.toArray(this.children);
        return React.createElement(React.Fragment, null,
            ...children.map((child, i) => {
                if (React.isValidElement(child)) {
                    const chemical = (child.type as any)?.$chemical;
                    const key = chemical ? `${chemical[$symbol$]}` : child.key || `${i}`;
                    return React.cloneElement(child as React.ReactElement<any>, { key });
                }
                return child;
            })
        );
    }
}

export const $ = new $List().Component;
