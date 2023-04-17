import Link from "next/link";
import Image from "next/image";

export default function Trending() {
  return (
    <div className="bg-white">
      <div className="mx-auto flex flex-col items-center px-4 py-10 md:container">
        <div className="grid w-full max-w-7xl gap-3 md:grid-cols-4">
          {[4, 1, 13, 4].map((t) => {
            return (
              <Link key={t} href="/" className="col-span-2 hover:scale-105  transition-all duration-300 ease-in-out">
                <img
                  src={`/assets/promo-banner-${t}.webp`}
                  alt="promo banner 1 image"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
