import React from "react";
import Banner from "../Components/Banner/Banner";
import BannerMarquee from "../Components/BannerMarquee/BannerMarquee";
import Layout from "../Components/Layout/Layout";
import Products from "../Components/Products/Products";

const HomeScreen = () => (
  <Layout>
    <Banner />
    <BannerMarquee />
    <Products />
  </Layout>
);

export default HomeScreen;
