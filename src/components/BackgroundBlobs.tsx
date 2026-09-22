const BackgroundBlobs = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden app-bg" aria-hidden="true">
      <div
        className="blob w-[28rem] h-[28rem] bg-coral/40 top-[-6rem] left-[-6rem]"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="blob w-[24rem] h-[24rem] bg-violet/40 top-1/3 right-[-8rem]"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="blob w-[22rem] h-[22rem] bg-mint/30 bottom-[-6rem] left-1/4"
        style={{ animationDelay: "6s" }}
      />
      <div
        className="blob w-[18rem] h-[18rem] bg-sun/20 bottom-1/4 right-1/4"
        style={{ animationDelay: "2s" }}
      />
    </div>
  );
};

export default BackgroundBlobs;
