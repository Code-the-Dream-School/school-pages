const AssignmentIcon: React.FC<any> = () => (
  <svg
    fill="#000000"
    height="25px"
    width="25px"
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 612 612"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <g>
        <g>
          <g>
            <g>
              <path d="M577.661,612H34.339c-10.358,0-18.751-8.396-18.751-18.751V18.751C15.588,8.396,23.98,0,34.339,0h543.322 c10.355,0,18.751,8.396,18.751,18.751v574.497C596.412,603.604,588.016,612,577.661,612z M53.09,574.497h505.82V37.502H53.09 V574.497z"></path>
            </g>
            <g>
              <path d="M476.951,157.596H135.047c-10.355,0-18.751-8.393-18.751-18.751c0-10.355,8.396-18.751,18.751-18.751h341.905 c10.355,0,18.751,8.396,18.751,18.751C495.702,149.204,487.307,157.596,476.951,157.596z"></path>
            </g>
            <g>
              <path d="M476.951,269.033H135.047c-10.355,0-18.751-8.393-18.751-18.751c0-10.355,8.396-18.751,18.751-18.751h341.905 c10.355,0,18.751,8.396,18.751,18.751C495.702,260.641,487.307,269.033,476.951,269.033z"></path>
            </g>
            <g>
              <path d="M476.951,380.469H135.047c-10.355,0-18.751-8.393-18.751-18.751c0-10.355,8.396-18.751,18.751-18.751h341.905 c10.355,0,18.751,8.396,18.751,18.751C495.702,372.076,487.307,380.469,476.951,380.469z"></path>
            </g>
            <g>
              <path d="M278.154,491.906H135.047c-10.355,0-18.751-8.394-18.751-18.751c0-10.355,8.396-18.751,18.751-18.751h143.106 c10.355,0,18.751,8.396,18.751,18.751C296.905,483.512,288.509,491.906,278.154,491.906z"></path>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

const NextIcon: React.FC<React.PropsWithoutRef<any>> = () => (
  <svg
    fill="#000000"
    height="25px"
    width="25px"
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 611.998 611.998"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <g>
        <g>
          <g>
            <path d="M553.818,0H58.181C26.102,0,0,26.099,0,58.181v495.637c0,32.08,26.102,58.181,58.181,58.181h495.637 c32.082,0,58.181-26.1,58.181-58.181V58.181C612,26.099,585.901,0,553.818,0z M573.648,553.818 c0,10.934-8.895,19.828-19.828,19.828H58.181c-10.934,0-19.828-8.895-19.828-19.828V58.181c0-10.934,8.895-19.828,19.828-19.828 h495.637c10.934,0,19.828,8.895,19.828,19.828v495.637H573.648z"></path>
            <path d="M411.289,305.998c0-5.954-2.765-11.573-7.488-15.202L123.696,75.442c-5.79-4.452-13.606-5.229-20.162-2.001 c-6.552,3.23-10.702,9.898-10.702,17.204v430.708c0,7.305,4.152,13.975,10.702,17.204c2.688,1.323,5.587,1.972,8.471,1.972 c4.152,0,8.275-1.347,11.691-3.973l280.105-215.357C408.525,317.572,411.289,311.953,411.289,305.998z M131.184,482.423V129.577 l229.469,176.421L131.184,482.423z"></path>
            <path d="M182.613,414.791c4.08,0,8.19-1.296,11.673-3.974l118.434-91.055c8.396-6.454,9.968-18.494,3.514-26.89 c-6.458-8.396-18.492-9.97-26.891-3.514l-118.434,91.055c-8.396,6.456-9.968,18.494-3.514,26.89 C171.175,412.215,176.862,414.791,182.613,414.791z"></path>
            <path d="M511.68,290.797L231.578,75.442c-8.396-6.454-20.437-4.882-26.891,3.514c-6.454,8.396-4.882,20.435,3.514,26.89 l260.33,200.151l-260.33,200.155c-8.396,6.454-9.968,18.494-3.514,26.89c3.776,4.912,9.463,7.488,15.215,7.488 c4.08,0,8.19-1.296,11.677-3.974L511.68,321.201c4.722-3.629,7.488-9.248,7.488-15.204 C519.168,300.043,516.402,294.426,511.68,290.797z"></path>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

const PrevIcon = () => (
  <div className="transform -scale-x-[1]">
    <NextIcon />
  </div>
);

const LessonLinkButton: React.FC<{
  link: string;
  text: string;
  icon: React.ReactNode;
}> = ({ link, text, icon }) => (
  <a
    href={link}
    className="h-8 max-w-fit bg-gray-50 hover:bg-gray-100 font-bold py-6 px-4 rounded inline-flex"
  >
    <button className="inline-flex items-center justify-between">
      {icon}
      <span className="ml-2">{text}</span>
    </button>
  </a>
);

export const AssignmentLinkButton: React.FC<{ link: string }> = ({ link }) => (
  <LessonLinkButton
    icon={<AssignmentIcon />}
    text="Proceed to Assignment"
    link={link}
  />
);

export const NextLinkButton: React.FC<{ link: string }> = ({ link }) => (
  <LessonLinkButton icon={<NextIcon />} text="Next Lesson" link={link} />
);

export const PrevLinkButton: React.FC<{ link: string }> = ({ link }) => (
  <LessonLinkButton icon={<PrevIcon />} text="Previous Lesson" link={link} />
);

export const ReviewLessonButton: React.FC<{ link: string }> = ({ link }) => (
  <LessonLinkButton
    icon={<AssignmentIcon />}
    text="Review Lesson Material"
    link={link}
  />
);
