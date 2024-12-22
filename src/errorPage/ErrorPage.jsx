

const ErrorPage = () => {
  return (
    <main className="w-full h-svh text-[#9538e2] pb-48 flex flex-col items-center justify-center gap-10">
      <h2 className="font-bold text-9xl">404</h2>
      <h4 className="font-semibold text-5xl">Not Found</h4>
      <p className="font-normal text-xl">
        The Resource Requested Could Not Be Found On This Server!
      </p>
    </main>
  );
};

export default ErrorPage;
