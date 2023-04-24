import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import type { ReactElement } from "react";
import Features from "../../components/home/features";
import Hero from "../../components/home/hero";
import Products from "../../components/home/products/products";
import SectionTitle from "../../components/home/sectionTitle";
import Trending from "../../components/home/trending/trending";
import { productApi } from "@/lib/apis/product";

const getData = () => {
  return productApi
    .verified()
    .then(({ data }) => data)
    .catch((e) => []);
};

const Page = async () => {
  const products = await getData();
  console.log({ products });
  return (
    <div className="">
      <Hero />
      <Features />
      <SectionTitle title="Checkout our Featured Products" />
      <Products products={products} />
      <Trending />
      <SectionTitle title="Best Seller Products" />
      <Products products={products} />
    </div>
  );
};

export default Page;
