export default function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-screen-xl px-4 pt-8 lg:grid-cols-12 lg:gap-8 xl:gap-0">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl">
            Trendy Collection
          </h1>
          <p className="mb-6 max-w-2xl font-light text-slate-700  md:text-lg lg:mb-8 lg:text-xl">
            New Modern Stylish Fashionable Mens Wear Shirt
          </p>
          <a
            href="#"
            className="mr-3 inline-flex items-center  justify-center rounded-lg bg-indigo-500 px-5 py-3 text-center text-base font-medium text-white hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-700"
          >
            Shop Now
            <svg
              className="ml-2 -mr-1 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
        <div className="mx-auto hidden lg:col-span-4 lg:mt-0 lg:flex">
          <img src="/assets/hero-image.png" alt="mockup" />
        </div>
      </div>
    </section>
  );
}
