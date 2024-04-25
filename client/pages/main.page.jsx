import React from 'react'
import { Outlet } from "react-router-dom";

export default function MainPage() {
  return (
    <>

    <h3>Main Page</h3>
    <Outlet></Outlet>
    </>
  )
}
