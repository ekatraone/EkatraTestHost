import React, { useMemo } from "react";
import styled from "styled-components";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SignalCellularAltOutlinedIcon from "@mui/icons-material/SignalCellularAltOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import ImportContactsOutlinedIcon from "@mui/icons-material/ImportContactsOutlined";
import CameraOutdoorOutlinedIcon from "@mui/icons-material/CameraOutdoorOutlined";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Sidebar = () => {
  const currentRoute = useHistory().location.pathname.toLowerCase();
  const navigationItems = useMemo(() => [
    {
      value: "Dashboard",
      src: <HomeOutlinedIcon />,
      link: "/",
      id:1
    },
    // {
    //   value: "Analytics",
    //   src: <SignalCellularAltOutlinedIcon />,
    //   link: "/2",
    //   id:2
    // },
    {
      value: "Courses",
      src: <Groups2OutlinedIcon />,
      link: "/courses",
      id:3

    },
    {
      value: "Cohorts",
      src: <ImportContactsOutlinedIcon />,
      link: "/cohorts",
      id:4

    },
    // {
    //   value: "Live Courses",
    //   src: <CameraOutdoorOutlinedIcon />,
    //   link: "/3",
    //   id:5
    // },
  ]);

  return (
    <Container>
      <TopContainer>
        <Link to="/">
          <HeadingContainer>
            <Image src="/images/Logo1.svg" />
            <Image src="/images/Logo2.svg" />
          </HeadingContainer>
        </Link>
        <NavigationMenu>
          {navigationItems.map((item,index) => (
            <Link to={item.link} key={index}>
              <NavigationItem
                active={{ main: item['link'] === currentRoute && "active" }}
              >
                {item.src}
                <CustomHeading  >{item.value}</CustomHeading>
              </NavigationItem>
            </Link>
          ))}
        </NavigationMenu>
      </TopContainer>
      <BottomContainer>
        <HelpContainer>
          <Image src="/images/questionMark.svg" />
          <HelpHeading>Help</HelpHeading>
        </HelpContainer>
        <EmptyContainer></EmptyContainer>
      </BottomContainer>
    </Container>
  );
};

const Container = styled.aside`
  flex: 1;
  border-right: 3px solid #f3f3f3;
  width: 100%;
  padding: 0.4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const TopContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`;
const BottomContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  position: relative;
  bottom: 0.3rem;
  left: 1.2rem;
  width: 100%;
`;

const HeadingContainer = styled.div`
  margin-bottom: 4rem;
  margin-top: 0.6rem;
`;
const Image = styled.img``;
const NavigationMenu = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`;
const NavigationItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  margin-bottom: 2.3rem;
  display: flex;
  justify-content: flex-start;
  padding: 0.5rem 1rem 0.5rem 0.8rem;
  transition: all 0.5s ease;
  svg,
  img {
    color: #c4c4c4;
  }
  &:hover {
    background-color: #e9f5f5;
    background: rgba(34, 124, 157, 0.1);
    border-radius: 0.6rem;
    cursor: pointer;
    svg,
    img,
    span {
      color: #227c9d;
    }
  }
  ${({ active }) =>
    active.main === "active"
      ? `
    span {
      color: #227c9d;
    }
    background: rgba(34, 124, 157, 0.1);
    border-radius: 0.6rem;
  `
      : ""}
`;

const CustomHeading = styled.span`
  color: #9f9d9d;
  margin-left: 0.5rem;
`;

const HelpContainer = styled.div`
  background-color: #227c9d;
  display: flex;
  align-items: center;
  padding: 0.4rem;
  border-radius: 1.3rem 0.1rem 1.3rem 1.3rem;
  cursor: pointer; ;
`;

const HelpHeading = styled.span`
  color: #fff;
  font-weight: 600;
  margin-left: 0.2rem;
`;
const EmptyContainer = styled.div``;

export default Sidebar;
