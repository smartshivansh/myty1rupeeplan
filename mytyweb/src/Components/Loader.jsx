import React from "react";

export default function Loader() {
  return (
    <div className="mx-3">
      <svg width="2.25em" height="1.5em" viewBox="0 0 24 24">
        <circle cx="18" cy="12" r="0" fill="#fff">
          <animate
            attributeName="r"
            values="0;2;0;0"
            dur="1.5s"
            repeatCount="indefinite"
            begin=".67"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
            calcMode="spline"
          />
        </circle>
        <circle cx="12" cy="12" r="0" fill="#fff">
          <animate
            attributeName="r"
            values="0;2;0;0"
            dur="1.5s"
            repeatCount="indefinite"
            begin=".33"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
            calcMode="spline"
          />
        </circle>
        <circle cx="6" cy="12" r="0" fill="#fff">
          <animate
            attributeName="r"
            values="0;2;0;0"
            dur="1.5s"
            repeatCount="indefinite"
            begin="0"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
            calcMode="spline"
          />
        </circle>
      </svg>
    </div>
  );
}
