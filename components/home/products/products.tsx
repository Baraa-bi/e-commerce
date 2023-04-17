import Link from "next/link";

export default function Products() {
  return (
    <div className="my-4 mx-auto grid max-w-4xl grid-cols-4 gap-5">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((t) => {
        return (
          <Link key={t} href={`/product/${t}`} className="cursor-pointer text-center  transition-all duration-200">
            <div className="relative flex items-end overflow-hidden bg-slate-100 transition-all duration-200">
              <img
                className="transition-all duration-300 hover:scale-125"
                src={`/assets/products/product-${t + 1}.jpg`}
              />
            </div>
            <span className="text-xs text-gray-400">Dolce & Gabbana</span>
            <div>
              <span className="text-md font-bold">Jersey Graphic Tee</span>
            </div>
            <div> 
              <span className="text-md font-bold text-indigo-500"> $3444.00</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
