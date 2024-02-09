import { SVGProps } from 'react'

interface CheckPendingProps extends SVGProps<SVGSVGElement> {
  bgColor?: string
  centerColor?: string
}

export const CheckPending = ({
  bgColor,
  centerColor,
  ...props
}: CheckPendingProps) => (
  <svg
    width="29"
    height="28"
    viewBox="0 0 29 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.30932 7.813C3.99865 5.40902 5.91813 3.5554 8.3447 2.95039L14.086 1.51891C16.5126 0.913897 19.0776 1.6494 20.8149 3.44837L24.9252 7.70477C26.6625 9.50374 27.308 12.0929 26.6187 14.4968L24.9877 20.1847C24.2984 22.5887 22.3789 24.4423 19.9523 25.0473L14.211 26.4788C11.7844 27.0838 9.21941 26.3483 7.48216 24.5493L3.3718 20.2929C1.63456 18.494 0.989019 15.9049 1.67835 13.5009L3.30932 7.813Z"
      fill={bgColor || '#2B2F36'}
    />
    <circle
      cx="14.1496"
      cy="13.9997"
      r="4.66667"
      fill={centerColor || '#76808F'}
    />
  </svg>
)
