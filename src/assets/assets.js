import logo from "./icons/logo.svg";
import search_icon from "./icons/search_icon.svg";
import remove_icon from "./icons/remove_icon.svg";
import arrow_right_icon_colored from "./icons/arrow_right_icon_colored.svg";
import star_icon from "./icons/star_icon.svg";
import star_dull_icon from "./icons/star_dull_icon.svg";
import cart_icon from "./icons/cart_icon.svg";
import nav_cart_icon from "./icons/nav_cart_icon.svg";
import add_icon from "./icons/add_icon.svg";
import refresh_icon from "./icons/refresh_icon.svg";
import product_list_icon from "./icons/product_list_icon.svg";
import order_icon from "./icons/order_icon.svg";
import upload_area from "./icons/upload_area.png";
import profile_icon from "./icons/profile_icon.png";
import menu_icon from "./icons/menu_icon.svg";
import delivery_truck_icon from "./icons/delivery_truck_icon.svg";
import leaf_icon from "./icons/leaf_icon.svg";
import coin_icon from "./icons/coin_icon.svg";
import box_icon from "./icons/box_icon.svg";
import trust_icon from "./icons/trust_icon.svg";
import black_arrow_icon from "./icons/black_arrow_icon.svg";
import white_arrow_icon from "./icons/white_arrow_icon.svg";
import main_banner_bg from "./images/main_banner_bg.png";
import main_banner_bg_sm from "./images/main_banner_bg_sm.png";
import bottom_banner_image from "./images/bottom_banner_image.png";
import bottom_banner_image_sm from "./images/bottom_banner_image_sm.png";
import add_address_iamge from "./icons/add_address_image.svg";
import organic_vegitable_image from "./images/organic_vegitable_image.png";
import fresh_fruits_image from "./images/fresh_fruits_image.png";
import bottles_image from "./images/bottles_image.png";
import maggi_image from "./images/maggi_image.png";
import dairy_product_image from "./images/dairy_product_image.png";
import bakery_image from "./images/bakery_image.png";
import grain_image from "./images/grain_image.png";
import fresh_bg from "./images/fresh_bg2.png";

export const assets = {
  logo,
  search_icon,
  remove_icon,
  arrow_right_icon_colored,
  star_icon,
  star_dull_icon,
  cart_icon,
  nav_cart_icon,
  add_icon,
  refresh_icon,
  product_list_icon,
  order_icon,
  upload_area,
  profile_icon,
  menu_icon,
  delivery_truck_icon,
  leaf_icon,
  coin_icon,
  trust_icon,
  black_arrow_icon,
  white_arrow_icon,
  main_banner_bg,
  main_banner_bg_sm,
  bottom_banner_image,
  bottom_banner_image_sm,
  add_address_iamge,
  box_icon,
  fresh_bg,
};

export const categories = [
  {
    text: "Organic veggies",
    path: "Vegetables",
    image: organic_vegitable_image,
    bgColor: "#FEF6DA",
  },
  {
    text: "Fresh Fruits",
    path: "Fruits",
    image: fresh_fruits_image,
    bgColor: "#FEE0E0",
  },
  {
    text: "Cold Drinks",
    path: "Drinks",
    image: bottles_image,
    bgColor: "#F0F5DE",
  },
  {
    text: "Instant Food",
    path: "Instant",
    image: maggi_image,
    bgColor: "#E1F5EC",
  },
  {
    text: "Dairy Products",
    path: "Dairy",
    image: dairy_product_image,
    bgColor: "#FEE6CD",
  },
  {
    text: "Bakery & Breads",
    path: "Bakery",
    image: bakery_image,
    bgColor: "#E0F6FE",
  },
  {
    text: "Grains & Cereals",
    path: "Grains",
    image: grain_image,
    bgColor: "#F1E3F9",
  },
];

export const footerLinks = [
  {
    title: "Quick Links",
    links: [
      { text: "Home", url: "#" },
      { text: "Best Sellers", url: "#" },
      { text: "Offers & Deals", url: "#" },
      { text: "Contact Us", url: "#" },
      { text: "FAQs", url: "#" },
    ],
  },
  {
    title: "Need help?",
    links: [
      { text: "Delivery Information", url: "#" },
      { text: "Return & Refund Policy", url: "#" },
      { text: "Payment Methods", url: "#" },
      { text: "Track your Order", url: "#" },
      { text: "Contact Us", url: "#" },
    ],
  },
  {
    title: "Follow Us",
    links: [
      { text: "Instagram", url: "#" },
      { text: "Twitter", url: "#" },
      { text: "Facebook", url: "#" },
      { text: "YouTube", url: "#" },
    ],
  },
];

export const features = [
  {
    icon: delivery_truck_icon,
    title: "Fastest Delivery",
    description: "Groceries delivered in under 30 minutes.",
  },
  {
    icon: leaf_icon,
    title: "Freshness Guaranteed",
    description: "Fresh produce straight from the source.",
  },
  {
    icon: coin_icon,
    title: "Affordable Prices",
    description: "Quality groceries at unbeatable prices.",
  },
  {
    icon: trust_icon,
    title: "Trusted by Thousands",
    description: "Loved by 10,000+ happy customers.",
  },
];
