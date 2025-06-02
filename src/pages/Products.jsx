"use client";

import { Download, Plus, Upload } from "lucide-react";
import { useState, useEffect } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All category");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    status: "Active",
    category: "",
    image: "/placeholder.svg?height=40&width=40",
  });

  const itemsPerPage = 10;

  useEffect(() => {
    // Load initial data
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(() => {
        // Fallback data if fetch fails
        const fallbackData = [
          {
            id: 1,
            name: "Brands of Change Organic Quinoa",
            price: 24.5,
            status: "Active",
            date: "02.11.2023",
            image: "/placeholder.svg?height=40&width=40",
            category: "Organic food",
          },
        ];
        setProducts(fallbackData);
        setFilteredProducts(fallbackData);
      });
  }, []);

  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "All category") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, products]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Archived":
        return "bg-orange-100 text-orange-800";
      case "Disabled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCreateProduct = () => {
    const product = {
      id: Math.max(...products.map((p) => p.id)) + 1,
      name: newProduct.name,
      price: Number.parseFloat(newProduct.price),
      status: newProduct.status,
      date: new Date().toLocaleDateString("en-GB"),
      image: newProduct.image,
      category: newProduct.category,
    };

    setProducts([...products, product]);
    setNewProduct({
      name: "",
      price: "",
      status: "Active",
      category: "",
      image: "/placeholder.svg?height=40&width=40",
    });
    setIsCreateDialogOpen(false);
  };

  const handleEditProduct = () => {
    if (!editingProduct) return;

    setProducts(
      products.map((p) => (p.id === editingProduct.id ? editingProduct : p))
    );
    setIsEditDialogOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(products, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = "products.json";
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target?.result);
          setProducts(importedData);
        } catch (error) {
          alert("Invalid JSON file");
        }
      };
      reader.readAsText(file);
    }
  };

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Products List
          </h1>
          <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet.</p>
        </div>
        <div className="flex space-x-2">
          <buutton variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </buutton>
          <button variant="outline" asChild>
            <label>
              <Upload className="w-4 h-4 mr-2" />
              Import
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
          </button>
          <div open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <div>
              <button className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Create new
              </button>
            </div>
            <div>
              <div>
                <h1>Create New Product</h1>
              </div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="price">Price</label>
                  <input
                    id="price"
                    type="number"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, price: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="category">Category</label>
                  <select
                    value={newProduct.category}
                    onValueChange={(value) =>
                      setNewProduct({ ...newProduct, category: value })
                    }
                  >
                    {/* <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger> */}
                    <select>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </select>
                </div>
                <div>
                  <label htmlFor="status">Status</label>
                  <select
                    value={newProduct.status}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, status: e.target.value })
                    }
                  >
                    <option value="Active">Active</option>
                    <option value="Archived">Archived</option>
                    <option value="Disabled">Disabled</option>
                  </select>
                </div>
                <button onClick={handleCreateProduct} className="w-full">
                  Create Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-48 border border-gray-300 rounded px-2 py-1"
        >
          <option value="All category">All category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <div className="flex items-center space-x-2">
          <input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <span className="text-sm text-gray-500">Status</span>
        </div>
      </div>

      <div className="bg-white rounded-lg border">
        <table className="w-full border-collapse border border-gray-300 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="w-12 border px-2 py-1"></th>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Price</th>
              <th className="border px-2 py-1">Status</th>
              <th className="border px-2 py-1">Date</th>
              <th className="border px-2 py-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="border px-2 py-1">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={40}
                    height={40}
                    className="rounded"
                  />
                </td>
                <td className="border px-2 py-1 font-medium">{product.name}</td>
                <td className="border px-2 py-1">
                  ${product.price.toFixed(2)}
                </td>
                <td className="border px-2 py-1">
                  <span
                    className={`px-2 py-1 rounded text-white ${getStatusColor(
                      product.status
                    )}`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="border px-2 py-1">{product.date}</td>
                <td className="border px-2 py-1">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setEditingProduct(product);
                        setIsEditDialogOpen(true);
                      }}
                      className="text-green-600 border border-green-600 px-2 py-1 rounded hover:bg-green-50"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-600 border border-red-600 px-2 py-1 rounded hover:bg-red-50"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of{" "}
          {filteredProducts.length} results
        </div>
        <div className="flex space-x-2">
          <button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      <div open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <div>
          <div>
            <p>Edit Product</p>
          </div>
          {editingProduct && (
            <div className="space-y-4">
              <div>
                <label htmlFor="edit-name">Name</label>
                <input
                  id="edit-name"
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="edit-price">Price</label>
                <input
                  id="edit-price"
                  type="number"
                  step="0.01"
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      price: Number.parseFloat(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="edit-category">Category</label>
                <select
                  value={editingProduct.category}
                  onValueChange={(value) =>
                    setEditingProduct({ ...editingProduct, category: value })
                  }
                >
                  {/* <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger> */}
                  <select>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </select>
              </div>
              <div>
                <label htmlFor="edit-status">Status</label>
                <select
                  value={editingProduct.status}
                  onValueChange={(value) =>
                    setEditingProduct({ ...editingProduct, status: value })
                  }
                >
                  {/* <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger> */}
                  
                    <option value="Active">Active</option>
                    <option value="Disabled">Disabled</option>
                    <option value="Archived">Archived</option>
                  
                </select>
              </div>
              <button onClick={handleEditProduct} className="w-full">
                Update Product
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
