import PageBanner from "@/components/ui/Banner";
import aboutImage from "../../assets/image/banner/bg.svg";
import OurStory from "./OurStory";
import Cooparature from "./Cooparature";
import Member from "./Member";
import OurValue from "./OurValue";

const AboutPage = () => {
  const scrollToMemberSection = () => {
    const memberSection = document.getElementById("get-to-know-us");
    if (memberSection) {
      memberSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToOurValueSection = () => {
    const ourValueSection = document.getElementById("our-values-section");
    if (ourValueSection) {
      ourValueSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
      <OurStory
        scrollToMember={scrollToMemberSection}
        scrollToValues={scrollToOurValueSection}
      />
      <Cooparature />
      <Member />
      <OurValue />
    </div>
  );
};

export default AboutPage;
