"use client";
import React, { useState } from "react";
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "@/app/components/ui/navbar-menu";
import { cn } from "@/lib/utils";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-0" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Categories">
          <div className="flex flex-col space-y-4 text-sm">
            New categories coming soon ...
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Sales">
          <div className="flex flex-col space-y-4 text-sm">
            1M+ user buy in last 1 month
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Clearance">
          <div className="flex flex-col space-y-4 text-sm">
            Clearance
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="New Stock">
          <div className="  text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Algochurn"
              href=""
              src="https://assets.aceternity.com/demos/algochurn.webp"
              description="Prepare for tech interviews like never before."
            />
            <ProductItem
              title="Tailwind Master Kit"
              href=""
              src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
              description="Production ready Tailwind css components for your next project"
            />
            <ProductItem
              title="Moonbeam"
              href=""
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
              description="Never write from scratch again. Go from idea to blog in minutes."
            />
            <ProductItem
              title="Rogue"
              href=""
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Trending">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="">Automotive</HoveredLink>
            <HoveredLink href="">Beauty</HoveredLink>
            <HoveredLink href="">Team</HoveredLink>
            <HoveredLink href="">Enterprise</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Search🔍">
          <div className="flex flex-col space-y-4 text-sm">
      <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-40 sm:w-56"
          />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Cart🛒">
          <div className="flex text-red-700 flex-col space-y-4 text-sm">
            View all
          </div>
        </MenuItem>
 

      </Menu>
    </div>
  );
}
