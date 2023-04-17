import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import type { ReactElement } from "react";
import Features from "../components/home/features";
import Hero from "../components/home/hero";
import Products from "../components/home/products/products";
import SectionTitle from "../components/home/sectionTitle";
import Trending from "../components/home/trending/trending";
import Layout from "../components/layout";

const Page = () => {
  return (
    <div className="">
      <Navbar/>
      <Hero />
      <Features />
      <SectionTitle title="Checkout our Featured Products" />
      <Products />
      <Trending />
      <SectionTitle title="Best Seller Products" />
      <Products />
      <Footer/>
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
