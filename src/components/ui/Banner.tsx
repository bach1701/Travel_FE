import React from 'react';
import styled from 'styled-components';

interface PageBannerProps {
    backgroundImage: string;
    title: string;
    breadcrumb: { label: string; href: string }[];
  }  

const BannerWrapper = styled.div<{ backgroundImage: string }>`
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: white;
  text-align: center;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0); /* lớp phủ mờ */
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Breadcrumb = styled.div`
  font-size: 16px;
  a {
    color: #fff;
    text-decoration: none;
    margin: 0 5px;
  }
  span {
    margin: 0 5px;
  }
`;

const PageBanner: React.FC<PageBannerProps> = ({ backgroundImage, title, breadcrumb }) => {
  return (
    <BannerWrapper backgroundImage={backgroundImage}>
      <Overlay />
      <Content>
        <Title>{title}</Title>
        <Breadcrumb>
            {breadcrumb.map((item, index) => (
                <React.Fragment key={index}>
                <a href={item.href}>{item.label}</a>
                {index < breadcrumb.length - 1 && <span>/</span>}
                </React.Fragment>
            ))}
        </Breadcrumb>
      </Content>
    </BannerWrapper>
  );
};

export default PageBanner;
