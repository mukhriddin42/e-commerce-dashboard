"use client"

import { useState } from "react"
import ProductsList from "@/components/products-list"
import CategoriesPage from "@/components/categories-page"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [currentPage, setCurrentPage] = useState("products")

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex space-x-4">
          <Button
            variant={currentPage === "products" ? "default" : "outline"}
            onClick={() => setCurrentPage("products")}
          >
            Products
          </Button>
          <Button
            variant={currentPage === "categories" ? "default" : "outline"}
            onClick={() => setCurrentPage("categories")}
          >
            Categories
          </Button>
        </div>
      </nav>

      <div className="p-6">{currentPage === "products" ? <ProductsList /> : <CategoriesPage />}</div>
    </div>
  )
}
