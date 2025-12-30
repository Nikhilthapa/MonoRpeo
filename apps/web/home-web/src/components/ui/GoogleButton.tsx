import React from 'react';

interface GoogleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export function GoogleButton({ children = 'Continue with Google', className = '', ...props }: GoogleButtonProps) {
  return (
    <button
      type="button"
      className={`google-button ${className}`}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="26"
        viewBox="0 0 25 26"
        fill="none"
        className="w-5 h-5"
      >
        <mask
          id="mask0_135_1576"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="25"
          height="26"
        >
          <path
            d="M24.4615 10.2635H12.6124V15.1083H19.4209C19.3115 15.794 19.0657 16.4685 18.7058 17.0835C18.2935 17.7882 17.7837 18.3247 17.2612 18.7332C15.6961 19.957 13.8714 20.2073 12.6041 20.2073C9.40289 20.2073 6.66765 18.096 5.60877 15.2272C5.56604 15.1231 5.53767 15.0156 5.50312 14.9093C5.26913 14.1792 5.14128 13.4059 5.14128 12.6022C5.14128 11.7657 5.27972 10.965 5.53215 10.2088C6.52785 7.22626 9.32476 4.9986 12.6064 4.9986C13.2665 4.9986 13.9021 5.07878 14.5049 5.23869C15.8825 5.60415 16.857 6.32391 17.4541 6.89324L21.0569 3.2929C18.8653 1.24246 16.0084 3.10012e-09 12.6004 3.10012e-09C9.87603 -5.98347e-05 7.36072 0.866114 5.29951 2.32997C3.62794 3.51713 2.25701 5.10658 1.3318 6.95254C0.471221 8.66413 0 10.5609 0 12.6003C0 14.6397 0.471941 16.5562 1.33252 18.252V18.2634C2.24151 20.0637 3.57076 21.6138 5.18631 22.7955C6.59768 23.8278 9.12839 25.2027 12.6004 25.2027C14.5971 25.2027 16.3667 24.8354 17.9274 24.147C19.0532 23.6504 20.0507 23.0027 20.9538 22.1702C22.1471 21.0702 23.0817 19.7097 23.7196 18.1444C24.3575 16.579 24.6987 14.8089 24.6987 12.8898C24.6987 11.996 24.6107 11.0884 24.4615 10.2634V10.2635Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask0_135_1576)">
          <g filter="url(#filter0_f_135_1576)">
            <path
              d="M-0.181641 12.6857C-0.168544 14.693 0.391986 16.764 1.24044 18.4359V18.4474C1.85349 19.6616 2.69135 20.6206 3.64566 21.5709L9.40945 19.4249C8.31898 18.8597 8.15258 18.5133 7.37089 17.8814C6.57207 17.0594 5.9767 16.1158 5.60593 15.0094H5.59099L5.60593 14.9979C5.362 14.2673 5.33794 13.4917 5.32894 12.6857H-0.181641Z"
              fill="url(#paint0_radial_135_1576)"
            />
          </g>
          <g filter="url(#filter1_f_135_1576)">
            <path
              d="M12.6125 -0.0917358C12.0428 1.95052 12.2606 3.93566 12.6125 5.0907C13.2704 5.0912 13.9041 5.17121 14.505 5.33063C15.8826 5.69608 16.8569 6.41587 17.454 6.9852L21.1491 3.29288C18.9601 1.24488 16.3258 -0.0885091 12.6125 -0.0917358Z"
              fill="url(#paint1_radial_135_1576)"
            />
          </g>
          <g filter="url(#filter2_f_135_1576)">
            <path
              d="M12.6001 -0.10791C9.80572 -0.107972 7.22586 0.780439 5.11174 2.28189C4.32676 2.83938 3.60641 3.48337 2.96497 4.1995C2.79694 5.80813 4.22288 7.78529 7.04668 7.76893C8.41677 6.14267 10.4431 5.09049 12.6984 5.09049C12.7005 5.09049 12.7025 5.09066 12.7045 5.09067L12.6124 -0.107542C12.6083 -0.107545 12.6042 -0.10791 12.6001 -0.10791Z"
              fill="url(#paint2_radial_135_1576)"
            />
          </g>
          <g filter="url(#filter3_f_135_1576)">
            <path
              d="M21.8234 13.2678L19.3292 15.0162C19.2198 15.7019 18.9738 16.3764 18.6139 16.9914C18.2016 17.6961 17.6919 18.2326 17.1694 18.6411C15.6075 19.8624 13.7876 20.1139 12.5207 20.1149C11.2112 22.3907 10.9816 23.5306 12.6128 25.3674C14.6312 25.3659 16.4206 24.9941 17.9989 24.2979C19.1399 23.7946 20.1507 23.1382 21.0659 22.2946C22.2752 21.1799 23.2225 19.801 23.8689 18.2147C24.5154 16.6284 24.861 14.8346 24.861 12.8897L21.8234 13.2678Z"
              fill="url(#paint3_radial_135_1576)"
            />
          </g>
          <g filter="url(#filter4_f_135_1576)">
            <path
              d="M12.4282 10.0793V15.2923H24.4282C24.5338 14.5784 24.8828 13.6545 24.8828 12.8897C24.8828 11.996 24.7949 10.9043 24.6457 10.0793H12.4282Z"
              fill="#3086FF"
            />
          </g>
          <g filter="url(#filter5_f_135_1576)">
            <path
              d="M3.02245 4.01544C2.28192 4.84221 1.64929 5.7676 1.14768 6.7684C0.287118 8.47999 -0.184082 10.5608 -0.184082 12.6002C-0.184082 12.6289 -0.181751 12.657 -0.181563 12.6857C0.199554 13.4314 5.08288 13.2886 5.32902 12.6857C5.32871 12.6576 5.32561 12.6302 5.32561 12.602C5.32561 11.7655 5.4641 11.149 5.71653 10.3928C6.02793 9.45997 6.51552 8.601 7.13902 7.86093C7.28035 7.6768 7.65736 7.28096 7.76735 7.04353C7.80925 6.9531 7.69128 6.90233 7.68468 6.8705C7.67731 6.8349 7.51914 6.86353 7.48371 6.83701C7.3712 6.7528 7.14842 6.70883 7.01314 6.66975C6.72398 6.5862 6.24477 6.40196 5.97861 6.21098C5.13726 5.60729 3.82427 4.88619 3.02245 4.01544Z"
              fill="url(#paint4_radial_135_1576)"
            />
          </g>
          <g filter="url(#filter6_f_135_1576)">
            <path
              d="M5.9967 6.8741C7.9477 8.08004 8.50877 6.2654 9.80591 5.69756L7.54949 0.922852C6.71946 1.27883 5.93524 1.72111 5.20761 2.23787C4.12095 3.00961 3.16135 3.95136 2.36865 5.02308L5.9967 6.8741Z"
              fill="url(#paint5_radial_135_1576)"
            />
          </g>
          <g filter="url(#filter7_f_135_1576)">
            <path
              d="M6.79055 19.0561C4.17159 20.0209 3.76158 20.0555 3.52051 21.7116C3.98119 22.1704 4.47616 22.5947 5.00214 22.9794C6.4135 24.0118 9.12836 25.3867 12.6004 25.3867C12.6045 25.3867 12.6084 25.3863 12.6125 25.3863V20.0229C12.6098 20.0229 12.6068 20.0231 12.6042 20.0231C11.304 20.0231 10.2651 19.6747 9.19981 19.0687C8.93717 18.9193 8.46065 19.3205 8.21842 19.1411C7.88434 18.8938 7.08032 19.3542 6.79055 19.0561Z"
              fill="url(#paint6_radial_135_1576)"
            />
          </g>
          <g opacity="0.5" filter="url(#filter8_f_135_1576)">
            <path
              d="M11.0786 19.854V25.2934C11.5644 25.3515 12.07 25.3867 12.6004 25.3867C13.132 25.3867 13.6464 25.3589 14.1462 25.3076V19.8907C13.5861 19.9884 13.0586 20.0231 12.6041 20.0231C12.0808 20.0231 11.5718 19.961 11.0786 19.854Z"
              fill="url(#paint7_linear_135_1576)"
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_f_135_1576"
            x="-0.65172"
            y="12.2157"
            width="10.5315"
            height="9.82535"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="0.23504"
              result="effect1_foregroundBlur_135_1576"
            />
          </filter>
          <filter
            id="filter1_f_135_1576"
            x="11.7921"
            y="-0.561815"
            width="9.82688"
            height="8.01706"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="0.23504"
              result="effect1_foregroundBlur_135_1576"
            />
          </filter>
          <filter
            id="filter2_f_135_1576"
            x="2.48158"
            y="-0.577989"
            width="10.6931"
            height="8.81711"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="0.23504"
              result="effect1_foregroundBlur_135_1576"
            />
          </filter>
          <filter
            id="filter3_f_135_1576"
            x="10.9933"
            y="12.4196"
            width="14.3376"
            height="13.4179"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="0.23504"
              result="effect1_foregroundBlur_135_1576"
            />
          </filter>
          <filter
            id="filter4_f_135_1576"
            x="11.9581"
            y="9.60927"
            width="13.3947"
            height="6.15311"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="0.23504"
              result="effect1_foregroundBlur_135_1576"
            />
          </filter>
          <filter
            id="filter5_f_135_1576"
            x="-0.654161"
            y="3.54536"
            width="8.90061"
            height="10.1175"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="0.23504"
              result="effect1_foregroundBlur_135_1576"
            />
          </filter>
          <filter
            id="filter6_f_135_1576"
            x="-0.936198"
            y="-2.382"
            width="14.0472"
            height="12.9663"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="1.65243"
              result="effect1_foregroundBlur_135_1576"
            />
          </filter>
          <filter
            id="filter7_f_135_1576"
            x="3.05043"
            y="18.5645"
            width="10.032"
            height="7.29227"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="0.23504"
              result="effect1_foregroundBlur_135_1576"
            />
          </filter>
          <filter
            id="filter8_f_135_1576"
            x="10.6085"
            y="19.3839"
            width="4.00754"
            height="6.47287"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="0.23504"
              result="effect1_foregroundBlur_135_1576"
            />
          </filter>
          <radialGradient
            id="paint0_radial_135_1576"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="matrix(-0.51324 -12.5509 18.4531 -0.753166 9.29407 21.3818)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.141612" stopColor="#1ABD4D" />
            <stop offset="0.247515" stopColor="#6EC30D" />
            <stop offset="0.311547" stopColor="#8AC502" />
            <stop offset="0.366013" stopColor="#A2C600" />
            <stop offset="0.445673" stopColor="#C8C903" />
            <stop offset="0.540305" stopColor="#EBCB03" />
            <stop offset="0.615636" stopColor="#F7CD07" />
            <stop offset="0.699345" stopColor="#FDCD04" />
            <stop offset="0.771242" stopColor="#FDCE05" />
            <stop offset="0.860566" stopColor="#FFCE0A" />
          </radialGradient>
          <radialGradient
            id="paint1_radial_135_1576"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="matrix(8.71623 -2.13758e-05 -1.2251e-05 11.2459 20.8034 6.71804)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.408458" stopColor="#FB4E5A" />
            <stop offset="1" stopColor="#FF4540" />
          </radialGradient>
          <radialGradient
            id="paint2_radial_135_1576"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="matrix(-12.2121 6.7574 9.17839 16.5561 16.0434 -1.7358)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.231273" stopColor="#FF4541" />
            <stop offset="0.311547" stopColor="#FF4540" />
            <stop offset="0.457516" stopColor="#FF4640" />
            <stop offset="0.540305" stopColor="#FF473F" />
            <stop offset="0.699346" stopColor="#FF5138" />
            <stop offset="0.771242" stopColor="#FF5B33" />
            <stop offset="0.860566" stopColor="#FF6C29" />
            <stop offset="1" stopColor="#FF8C18" />
          </radialGradient>
          <radialGradient
            id="paint3_radial_135_1576"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="matrix(-22.1469 -28.8831 -10.6715 8.16728 12.7943 23.7363)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.131546" stopColor="#0CBA65" />
            <stop offset="0.209784" stopColor="#0BB86D" />
            <stop offset="0.297297" stopColor="#09B479" />
            <stop offset="0.396257" stopColor="#08AD93" />
            <stop offset="0.477124" stopColor="#0AA6A9" />
            <stop offset="0.568425" stopColor="#0D9CC6" />
            <stop offset="0.667385" stopColor="#1893DD" />
            <stop offset="0.768727" stopColor="#258BF1" />
            <stop offset="0.858506" stopColor="#3086FF" />
          </radialGradient>
          <radialGradient
            id="paint4_radial_135_1576"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="matrix(-1.56729 13.4962 18.6785 2.165 11.5304 2.27239)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.366013" stopColor="#FF4E3A" />
            <stop offset="0.457516" stopColor="#FF8A1B" />
            <stop offset="0.540305" stopColor="#FFA312" />
            <stop offset="0.615636" stopColor="#FFB60C" />
            <stop offset="0.771242" stopColor="#FFCD0A" />
            <stop offset="0.860566" stopColor="#FECF0A" />
            <stop offset="0.915033" stopColor="#FECF08" />
            <stop offset="1" stopColor="#FDCD01" />
          </radialGradient>
          <radialGradient
            id="paint5_radial_135_1576"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="matrix(-4.53028 5.00566 -14.132 -12.7658 9.3264 2.13243)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.315904" stopColor="#FF4C3C" />
            <stop offset="0.603818" stopColor="#FF692C" />
            <stop offset="0.726837" stopColor="#FF7825" />
            <stop offset="0.884534" stopColor="#FF8D1B" />
            <stop offset="1" stopColor="#FF9F13" />
          </radialGradient>
          <radialGradient
            id="paint6_radial_135_1576"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="matrix(-12.2121 -6.75739 9.17839 -16.5561 16.0434 26.938)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.231273" stopColor="#0FBC5F" />
            <stop offset="0.311547" stopColor="#0FBC5F" />
            <stop offset="0.366013" stopColor="#0FBC5E" />
            <stop offset="0.457516" stopColor="#0FBC5D" />
            <stop offset="0.540305" stopColor="#12BC58" />
            <stop offset="0.699346" stopColor="#28BF3C" />
            <stop offset="0.771242" stopColor="#38C02B" />
            <stop offset="0.860566" stopColor="#52C218" />
            <stop offset="0.915033" stopColor="#67C30F" />
            <stop offset="1" stopColor="#86C504" />
          </radialGradient>
          <linearGradient
            id="paint7_linear_135_1576"
            x1="11.0786"
            y1="22.6204"
            x2="14.1462"
            y2="22.6204"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#0FBC5C" />
            <stop offset="1" stopColor="#0CBA65" />
          </linearGradient>
        </defs>
      </svg>
      {children}
    </button>
  );
}

