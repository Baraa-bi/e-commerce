import { Product } from "@/lib/types";
import Link from "next/link";

export default function Products({ products }: { products: Array<Product> }) {
  return (
    <div className="my-4 mx-auto grid max-w-4xl grid-cols-4 gap-5">
      {products.map((t) => {
        return (
          <Link
            key={t.productId}
            href={`/product/${t.productId}`}
            className="cursor-pointer text-center  transition-all duration-200"
          >
            <div className="relative h-64 flex items-end overflow-hidden bg-slate-100 transition-all duration-200">
              <img
                className="transition-all object-contain duration-300 hover:scale-125"
                src={t.imageUrl}
              />
            </div>
            <span className="text-xs text-gray-400">{t?.category?.name}</span>
            <div>
              <span className="text-md font-bold">{t.productName}</span>
            </div>
            <div>
              <span className="text-md font-bold text-indigo-500">
                $ {t.price}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
