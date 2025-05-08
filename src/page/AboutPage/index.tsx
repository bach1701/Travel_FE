import PageBanner from "@/components/ui/Banner";
import aboutImage from "../../assets/image/banner/bg.svg";
import OurStory from "./OurStory";
import Cooparature from "./Cooparature";
import Member from "./Member";
import OurValue from "./OurValue";

const AboutPage = () => {
  return (
    <div>
      <PageBanner
        backgroundImage={aboutImage}
        title="About"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
      ></PageBanner>
      <OurStory />
      <Cooparature />
      <Member />
      <OurValue />
    </div>
  );
};

export default AboutPage;
