export const CardButton: React.FC<{
  text: string;
  bgUrl: string;
  link: string;
}> = ({ text, bgUrl, link }) => (
  <a
    href={link}
    className="rounded-xl w-96 overflow-hidden  p-[1px] inline-block bg-white transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-salmon-500 hover:via-orange-500 hover:to-salmon-100"
  >
    <figure className="m-0">
      <img
        className="object-cover h-48 w-96 m-0 rounded-t-xl"
        src={bgUrl}
        alt={`Link to ${text} course materials`}
      />
      <figcaption className="m-0 bg-white rounded-b-xl">
        <span className="relative bottom-0.5 left-2">{text}</span>
      </figcaption>
    </figure>
  </a>
);
