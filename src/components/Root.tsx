import { Outlet } from "react-router-dom"
import { NavBar } from '../components/NavBar';

export const Root = () => {
    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    )
}