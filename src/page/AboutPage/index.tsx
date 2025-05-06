import PageBanner from "@/components/ui/Banner";
import aboutImage from '../../assets/image/banner/bg.svg'
import OurStory from "./OurStory";

const AboutPage = () => {
    return (
        <div>
            <PageBanner
                backgroundImage={aboutImage}
                title="About"
                breadcrumb={[
                    { label: 'Home', href: '/' },
                    { label: 'About', href: '/about' }
                ]}
            >
            </PageBanner>
            <OurStory />
        </div>
        
    );
};

export default AboutPage;