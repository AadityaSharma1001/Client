import React from "react"
import { Navigate } from "react-router-dom"
import useLocalStorage from "./useLocalStorage"

const ProtectedRoute = ({ children }) => {
    const [token] = useLocalStorage("token", "")
    return token ? children : <Navigate to="/register" replace />
}

export default ProtectedRoute