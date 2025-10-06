"use client";
import { useAuth } from "../../context/AuthContext";
import React from "react";
import { usePathname } from "next/navigation";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  BuildingStorefrontIcon,
  TagIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function AsideBar() {
  const [open, setOpen] = React.useState(0); // accordion open
  const [isOpen, setIsOpen] = React.useState(true); // sidebar open
  const { logout } = useAuth();
  const pathname = usePathname();

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  // Automatically open accordion based on current page
  React.useEffect(() => {
    if (
      pathname.startsWith("/dashboard/admin/categories") ||
      pathname.startsWith("/dashboard/admin/suppliers")
    ) {
      setOpen(2);
    } else if (
      pathname.startsWith("/dashboard/admin/overview") ||
      pathname.startsWith("/dashboard/admin/reports")
    ) {
      setOpen(1);
    }
  }, [pathname]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="relative flex">
      {/* Toggle button */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-[-12px] bg-blue-500 text-white p-1 rounded-full shadow-md z-50"
      >
        {isOpen ? "<" : ">"}
      </button>

      <Card
        className={`h-[calc(100vh-2rem)] p-4 shadow-xl shadow-blue-gray-900/5
          ${isOpen ? "w-64" : "w-16"} transition-all duration-300 ease-in-out
          overflow-hidden rounded-none`}
      >
        <List>
          {/* Dashboard Accordion */}
          <Accordion
            open={open === 1}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === 1 ? "rotate-180" : ""
                }`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 1}>
              <AccordionHeader
                onClick={() => handleOpen(1)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <PresentationChartBarIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography
                  color="blue-gray"
                  className={`mr-auto font-normal transition-opacity duration-300 ${
                    isOpen ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Dashboard
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <Link href="/dashboard/admin/overview">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    <span
                      className={`transition-opacity duration-300 ${
                        isOpen ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      Overview
                    </span>
                  </ListItem>
                </Link>
                <Link href="/dashboard/admin/reports">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    <span
                      className={`transition-opacity duration-300 ${
                        isOpen ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      Reports
                    </span>
                  </ListItem>
                </Link>
                <Link href="/dashboard/admin/logs">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    <span
                      className={`transition-opacity duration-300 ${
                        isOpen ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      Logs
                    </span>
                  </ListItem>
                </Link>
              </List>
            </AccordionBody>
          </Accordion>

          {/* Inventory Accordion */}
          <Accordion
            open={open === 2}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === 2 ? "rotate-180" : ""
                }`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 2}>
              <AccordionHeader
                onClick={() => handleOpen(2)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <ShoppingBagIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography
                  color="blue-gray"
                  className={`mr-auto font-normal transition-opacity duration-300 ${
                    isOpen ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Inventory
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <Link href="/dashboard/admin/orders">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    <span
                      className={`transition-opacity duration-300 ${
                        isOpen ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      Orders
                    </span>
                  </ListItem>
                </Link>
                <Link href="/dashboard/admin/products">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    <span
                      className={`transition-opacity duration-300 ${
                        isOpen ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      Products
                    </span>
                  </ListItem>
                </Link>
                <Link href="/dashboard/admin/addproduct">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    <span
                      className={`transition-opacity duration-300 ${
                        isOpen ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      Add Product
                    </span>
                  </ListItem>
                </Link>
                <Link href="/dashboard/admin/categories">
                  <ListItem>
                    <ListItemPrefix>
                      <TagIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    <span
                      className={`transition-opacity duration-300 ${
                        isOpen ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      Categories
                    </span>
                  </ListItem>
                </Link>
                <Link href="/dashboard/admin/suppliers">
                  <ListItem>
                    <ListItemPrefix>
                      <BuildingStorefrontIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    <span
                      className={`transition-opacity duration-300 ${
                        isOpen ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      Suppliers
                    </span>
                  </ListItem>
                </Link>
              </List>
            </AccordionBody>
          </Accordion>

          {/* Users */}
          <Link href="/dashboard/admin/users">
            <ListItem selected={pathname === "/dashboard/admin/users"}>
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              <span
                className={`transition-opacity duration-300 ${
                  isOpen ? "opacity-100" : "opacity-0"
                }`}
              >
                Users
              </span>
            </ListItem>
          </Link>

          {/* Settings */}
          <Link href="/dashboard/admin/settings">
            <ListItem>
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              <span
                className={`transition-opacity duration-300 ${
                  isOpen ? "opacity-100" : "opacity-0"
                }`}
              >
                Settings
              </span>
            </ListItem>
          </Link>

          {/* Inbox Example */}
          <ListItem>
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            <span
              className={`transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              Inbox
            </span>
            <ListItemSuffix>
              <Chip
                value="14"
                size="sm"
                variant="ghost"
                color="blue-gray"
                className="rounded-full"
              />
            </ListItemSuffix>
          </ListItem>

        </List>
      </Card>
    </div>
  );
}
