import Box from "@mui/material/Box";
import logo from "../../assets/Images/logo.png";
import { NavabarItems } from "../../store/NavbarItems";
import { INavBarItems } from "./INavbar";
import { Grid, Typography } from "@mui/material";

const NavBar = () => {
  return (
    <Grid container className="py-4 px-2 bg-black flex">
      <Grid size={6}>
        <Box sx={{
          display: "flex",
          justifyContent: "start"
        }}>
          <img src={logo} alt="Logo" />
        </Box>
      </Grid>
      <Grid size={6} className="flex justify-end gap-[25px] items-center">
        <Box className="flex gap-6">
          {NavabarItems.map((navItem: INavBarItems, index) => (
            <Typography component="span" key={`${navItem.name}-${index}`} className="relative cursor-pointer">
                {navItem.name === "Bell" && 
                <Typography component="span" className="w-[20px] h-[20px] bg-[#F72B35] absolute top-[-6px] right-[-7px] rounded-full text-white items-center flex justify-center">
                    8
                </Typography>
                }
              <img src={navItem.icon} alt={navItem.name} />
            </Typography>
          ))}
        </Box>
        
        <Box className="border-l border-gray-500 pl-5">
            <Typography  className="text-white text-md">
                Hello, Abdallah Fahmawi
            </Typography>
            <Typography component="span" className="text-[#748AA1] text-sm">
                UI Developer
            </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default NavBar;
