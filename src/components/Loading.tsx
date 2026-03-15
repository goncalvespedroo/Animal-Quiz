import type { CSSProperties } from "react";

interface LoaderSpinnerProps {
  size?: number | string; 
  margin?: number | string; 
  color?: string; 
  loading?: boolean; 
  cssOverride?: CSSProperties; 
  speedMultiplier?: number; 
}

export function LoaderSpinner({
  size = 15,
  margin = 2,
  color = "#10b981", 
  loading = true,
  cssOverride = {},
  speedMultiplier = 1,
}: LoaderSpinnerProps) {
  
  if (!loading) {
    return null;
  }


  const sizePx = typeof size === 'number' ? `${size}px` : size;
  const marginPx = typeof margin === 'number' ? `${margin}px` : margin;


  const animationDuration = `${1 / speedMultiplier}s`;


  const spinnerStyle: CSSProperties = {
    width: sizePx,
    height: sizePx,
    borderWidth: marginPx, 
    borderColor: color,
    borderTopColor: 'transparent',
    animationDuration: animationDuration, 
    ...cssOverride, 
  };

  return (

    <div className="flex items-center justify-center" style={{ padding: marginPx }}>
      <div
        className="rounded-full animate-spin border-solid"
        style={spinnerStyle}
        role="status"
        aria-label="Carregando"
      >
        {"loadig"}
        <span className="sr-only">Carregando...</span>
      </div>
    </div>
  );
}