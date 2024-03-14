import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupIcon from "@mui/icons-material/Group";
import PaymentIcon from "@mui/icons-material/Payment";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ReceiptIcon from "@mui/icons-material/Receipt";
import InventoryIcon from "@mui/icons-material/Inventory";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import SettingsIcon from "@mui/icons-material/Settings";
import Link from "next/link";
const pagesArray = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Users",
    link: "/users",
    icon: <GroupIcon />,
  },
  {
    name: "Expenses",
    link: "/expenses",
    icon: <PaymentIcon />,
  },
  {
    name: "Revenues",
    link: "/revenues",
    icon: <MonetizationOnIcon />,
  },
  {
    name: "Invoices",
    link: "/invoices",
    icon: <ReceiptIcon />,
  },
  {
    name: "Inventory",
    link: "/inventory",
    icon: <InventoryIcon />,
  },
  {
    name: "Barcodes",
    link: "/barcodes",
    icon: <QrCode2Icon />,
  },
  {
    name: "Settings",
    link: "/settings",
    icon: <SettingsIcon />,
  },
];

export const mainListItems = (
  <React.Fragment>
    {pagesArray?.map((item, index) => {
      return (
        <ListItemButton key={item?.name + index}>
          <Link
            href={item.link}
            style={{
              display: "flex",
              textDecoration: "none",
              alignItems: "center",
            }}
          >
            <ListItemIcon>{item?.icon}</ListItemIcon>
            <ListItemText
              primary={item?.name}
              sx={{
                color: "black",
              }}
            />
          </Link>
        </ListItemButton>
      );
    })}
    {/* <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton> */}
  </React.Fragment>
);

// export const secondaryListItems = (
//   <React.Fragment>
//     <ListSubheader component="div" inset>
//       Saved reports
//     </ListSubheader>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Current month" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Last quarter" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Year-end sale" />
//     </ListItemButton>
//   </React.Fragment>
// );
