import React from "react";
import Layout from "../components/layouts/Layout";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import CTA from "../components/home/CTA";

const Home = ({ onLoginClick }) => {
  return (
    <Layout onLoginClick={onLoginClick}>
      <Hero />
      <Features />
      <CTA />
    </Layout>
  );
};

export default Home;
