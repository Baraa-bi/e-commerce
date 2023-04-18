import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import type { ReactElement } from "react";
import Features from "../../components/home/features";
import Hero from "../../components/home/hero";
import Products from "../../components/home/products/products";
import SectionTitle from "../../components/home/sectionTitle";
import Trending from "../../components/home/trending/trending";

const Page = () => {
  return (
    <div className="">
      <Hero />
      <Features />
      <SectionTitle title="Checkout our Featured Products" />
      <Products />
      <Trending />
      <SectionTitle title="Best Seller Products" />
      <Products />
    </div>
  );
};

export default Page;
