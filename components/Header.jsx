import CallOut from "./CallOut";

export default function Header() {
  return (
    <div className="main-col--header">
      <div>
        <h1 className="h1-headline">
          Female
          <br />
          Freelance
          <br />
          Developers
        </h1>
      </div>
      <div>
        <CallOut />
      </div>
    </div>
  );
}
