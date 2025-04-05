import { useState, useEffect } from "react";
import { Row, Col, Drawer } from "antd";
import { withTranslation, TFunction } from "react-i18next";
import { Link } from "react-router-dom";
import Container from "../../common/Container";
import { Button } from "../../common/Button";
import {
  HeaderSection,
  LogoContainer,
  Burger,
  NotHidden,
  Menu,
  CustomNavLinkSmall,
  Label,
  Outline,
  Span,
} from "./styles";

import "./index.css";

const Header = ({ t, className }: { t: TFunction; className?: string }) => {
  const [visible, setVisibility] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  // Track the index of the menu item with an open dropdown, if any.
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  // Store the dropdown direction ("dropdown" for down, "dropup" for up) for each menu item.
  const [dropdownDirection, setDropdownDirection] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = (document.querySelector(".parallax-container") as HTMLElement)?.offsetHeight || 0;
      setIsSticky(window.scrollY > headerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleButton = () => {
    setVisibility(!visible);
  };

  // Define your menu items; add a subpages array to any menu that should have a dropdown.
  const menuItems = [
    { title: t("About"), link: "/About" },
    {
      title: t("Atlassian Apps"),
      link: "/AtlassianApps",
      subpages: [
        { title: t("Subpage 1"), link: "/AtlassianApps/sub1" },
        { title: t("Subpage 2"), link: "/AtlassianApps/sub2" },
      ],
    },
    {
      title: t("Services"),
      link: "/Services",
      subpages: [
        { title: t("Service 1"), link: "/Services/service1" },
        { title: t("Service 2"), link: "/Services/service2" },
      ],
    },
    { title: t("Contact"), link: "/Contact", isButton: true },
  ];

  // When hovering over a menu item with subpages, decide if the dropdown should open up or down.
  const handleMouseEnter = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Assume an approximate submenu height of 150px.
    const direction = rect.bottom + 150 > window.innerHeight ? "dropup" : "dropdown";
    setDropdownDirection((prev) => ({ ...prev, [index]: direction }));
    setActiveDropdown(index);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  // Render each menu item. Button items render only one version; others support subpages.
  const MenuItem = () => {
    return (
      <>
        {menuItems.map((item, index) =>
          item.isButton ? (
            <CustomNavLinkSmall
              key={index}
              style={{ width: "180px", display: "inline-block" }}
              onClick={() => setVisibility(false)}
            >
              <Link to={item.link}>
                <Span>
                  <Button>{item.title}</Button>
                </Span>
              </Link>
            </CustomNavLinkSmall>
          ) : (
            <div
              key={index}
              className="menu-item"
              style={{ display: "inline-block" }}
              onMouseEnter={item.subpages ? (e) => handleMouseEnter(index, e) : undefined}
              onMouseLeave={item.subpages ? handleMouseLeave : undefined}
            >
              <CustomNavLinkSmall onClick={() => setVisibility(false)}>
                <Link to={item.link}>
                  <Span>{item.title}</Span>
                </Link>
              </CustomNavLinkSmall>
              {/* Render the dropdown only if subpages exist and this item is active */}
              {item.subpages && activeDropdown === index && (
                <div className={`submenu ${dropdownDirection[index]}`}>
                  {item.subpages.map((subitem, subIndex) => (
                    <div key={subIndex} className="submenu-item" onClick={() => setVisibility(false)}>
                      <Link to={subitem.link}>
                        <Span>{subitem.title}</Span>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        )}
      </>
    );
  };

  return (
    <HeaderSection className={className}>
      <Container className={`navbar ${isSticky ? "sticky" : ""} ${className}`}>
        <Row justify="space-between">
          <LogoContainer to="/" aria-label="homepage">
            <img
              src="https://t2consult.de/wp-content/uploads/2024/08/t2consult-vector-neu-blauer-rand.png"
              alt="Logo"
              className={`nav-logo ${isSticky ? "visible" : "hidden"}`}
            />
          </LogoContainer>
          <NotHidden>
            <MenuItem />
          </NotHidden>
          <Burger onClick={toggleButton}>
            <Outline />
          </Burger>
        </Row>
        <Drawer closable={false} open={visible} onClose={toggleButton}>
          <Col style={{ marginBottom: "2.5rem" }}>
            <Label onClick={toggleButton}>
              <Col span={12}>
                <Menu>Menu</Menu>
              </Col>
              <Col span={12}>
                <Outline />
              </Col>
            </Label>
          </Col>
          <MenuItem />
        </Drawer>
      </Container>
    </HeaderSection>
  );
};

export default withTranslation()(Header);
