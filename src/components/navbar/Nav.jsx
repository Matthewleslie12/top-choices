// import {Icon} from "@iconify/react";
// import {Link} from "react-router-dom";
// const Nav = () => {
//   const Menus = [
//     {
//       name: "Home",
//       icon: "solar:home-2-linear",
//       path: "/",
//     },
//     {
//       name: "Saved",
//       icon: "solar:bookmark-linear",
//       path: "/saved",
//     },
//     {
//       name: "Account",
//       icon: "solar:settings-linear",
//       path: "/account",
//     },
//   ];

//   return (
//     <nav className="md:p-6 fixed bottom-0 w-full border-t-2 md:top-0 md:border-0 bg-dullGreen md:bg-white h:12">
//       <div className="md:flex flex-row justify-between items-center md:bg-dullGreen md:-m-6 md:h-20">
//         <h1 className="hidden md:block md:items-center md:px-6 md:justify-center text-2xl text-paleBlue font-bold">
//           Top Choices
//         </h1>

//         <div className="md:flex justify-evenly flex-row flex ">
//           {Menus.map((menu, index) => (
//             <li key={index} className="list-none">
//               <Link
//                 to={menu.path}
//                 key={index}
//                 className="text-md mx-4 py-3 items-center flex flex-col justify-center text-white"
//               >
//                 <span>
//                   <Icon
//                     className="md:hidden"
//                     icon={menu.icon}
//                     color=""
//                     width={30}
//                   ></Icon>
//                 </span>
//                 <span className="block pt-2 md:pt-0 md:hover:underline">
//                   {menu.name}
//                 </span>
//               </Link>
//             </li>
//           ))}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Nav;

import {Icon} from "@iconify/react";
import {Link, useLocation} from "react-router-dom";
import {useState} from "react";

const Nav = () => {
  const Menus = [
    {
      name: "Home",
      icon: "solar:home-2-linear",
      filledIcon: "solar:home-2-bold",
      path: "/",
    },
    {
      name: "Saved",
      icon: "solar:bookmark-linear",
      filledIcon: "solar:bookmark-bold",
      path: "/saved",
    },
    {
      name: "Account",
      icon: "solar:settings-linear",
      filledIcon: "solar:settings-bold",
      path: "/account",
    },
  ];

  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(location.pathname);

  return (
    <nav className="md:p-6 fixed bottom-0 w-full border-t-2 md:top-0 md:border-0 bg-dullGreen md:bg-white h:12 ">
      <div className="md:flex flex-row justify-between items-center md:bg-dullGreen md:-m-6 md:h-20">
        <h1 className="hidden md:block md:items-center md:px-6 md:justify-center text-2xl text-paleBlue font-bold">
          Top Choices
        </h1>

        <div className="md:flex justify-evenly flex-row flex">
          {Menus.map((menu, index) => (
            <li key={index} className="list-none">
              <Link
                to={menu.path}
                key={index}
                className={`text-md mx-4 py-3 items-center flex flex-col justify-center text-white ${
                  activeMenu === menu.path ? "active" : ""
                }`}
                onClick={() => setActiveMenu(menu.path)}
              >
                <span>
                  <Icon
                    className="md:hidden"
                    icon={
                      activeMenu === menu.path ? menu.filledIcon : menu.icon
                    }
                    width={30}
                  ></Icon>
                </span>
                <span className="block pt-2 md:pt-0 md:hover:underline">
                  {menu.name}
                </span>
              </Link>
            </li>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
