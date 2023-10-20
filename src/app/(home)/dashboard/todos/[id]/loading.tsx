export default function Loading() {
  return (
    <main className="h-full p-6 w-full">
      <div className="flex flex-col md:flex-row lg:items-center lg:justify-between max-w-5xl mx-auto">
        <div className="min-w-0 flex-1 gap-2 flex flex-col">
          <div className="w-full lg:w-1/2 h-10 bg-primary-foreground p-2 rounded-xl animate-pulse" />

          <div className="w-full lg:w-1/3 h-5 bg-primary-foreground p-2 rounded-xl animate-pulse" />
        </div>
        <div className="mt-5 flex gap-2 lg:ml-4 lg:mt-0 flex-col md:flex-row">
          <div className="w-full lg:w-40 h-10 rounded-xl bg-primary-foreground0 animate-pulse" />
          <div className="w-full lg:w-40 h-10 rounded-xl bg-primary-foreground animate-pulse" />
        </div>
      </div>

      {Array.from(Array(4).keys()).map((item) => (
        <div
          key={item}
          className="max-w-lg mx-auto flex flex-col gap-4 justify-center items-center mt-6"
        >
          <div className="w-full flex gap-3 justify-between items-center p-4 rounded-lg bg-primary-foreground animate-pulse">
            <div className="flex items-center gap-3">
              <div className="peer h-6 w-6 bg-primary-foreground shrink-0 rounded-sm" />
              <div className="flex gap-3 flex-col">
                <div className="w-40 h-3 p-2 bg-primary-foreground rounded-xl" />
                <div className="w-40 h-3 p-2 bg-primary-foreground rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </main>
  );
}
