"use client";

export function BentoGrid() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-base font-semibold font-heading">Recent Side Projects</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2 flex flex-col gap-2">
          <div
            className="relative w-full rounded-3xl overflow-hidden bg-background"
            style={{ boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.05)" }}
          >
            <div style={{ position: "relative", aspectRatio: "167/108" }}>
              <iframe
                loading="lazy"
                title="Gumlet video player"
                src="https://play.gumlet.io/embed/698bdcf0873071aec5fdfb03?background=false&autoplay=true&loop=false&disable_player_controls=false&muted=true"
                className="absolute inset-0 w-full h-full border-none"
                referrerPolicy="origin"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
              />
            </div>
            <div className="absolute inset-0 rounded-3xl pointer-events-none z-10 image-inner-shadow" />
          </div>
          <p className="text-sm text-secondary">
            Demo of a prototype I made for{" "}
            <a
              href="https://yarn.so"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Yarn
            </a>
            {" "}on Feb 1, 2026.
          </p>
        </div>
      </div>
    </div>
  );
}
