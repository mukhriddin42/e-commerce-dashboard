"use client";

import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Badge,
  IconButton,
  Typography,
  Box,
} from "@mui/material";

import {
  Download as DownloadIcon,
  PlusOne as PlusIcon,
  Upload as UploadIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Category as TagsIcon,
} from "@mui/icons-material";

const getStatusColor = (status) => {
  switch (status) {
    case "Active":
      return "primary";
    case "Archived":
      return "default";
    case "Disabled":
      return "error";
    default:
      return "secondary";
  }
};

export default function Products({ onNavigateToCategories }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
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
    // Load products data
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(() => {
        // Fallback products data
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
          {
            id: 2,
            name: "Premium Coffee Beans",
            price: 18.99,
            status: "Active",
            date: "01.11.2023",
            image: "/placeholder.svg?height=40&width=40",
            category: "Beverages",
          },
          {
            id: 3,
            name: "Artisan Bread",
            price: 5.5,
            status: "Disabled",
            date: "31.10.2023",
            image: "/placeholder.svg?height=40&width=40",
            category: "Bakery",
          },
          {
            id: 4,
            name: "Fresh Vegetables Pack",
            price: 12.75,
            status: "Archived",
            date: "30.10.2023",
            image: "/placeholder.svg?height=40&width=40",
            category: "Organic food",
          },
        ];
        setProducts(fallbackData);
        setFilteredProducts(fallbackData);
      });

    // Load categories data
    fetch("/data/categories.json")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => {
        // Fallback categories data
        const fallbackCategories = [
          { id: 1, name: "Organic food", slug: "organic-food" },
          { id: 2, name: "Beverages", slug: "beverages" },
          { id: 3, name: "Bakery", slug: "bakery" },
          { id: 4, name: "Electronics", slug: "electronics" },
          { id: 5, name: "Clothing", slug: "clothing" },
        ];
        setCategories(fallbackCategories);
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

  const handleCreateProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      alert("Please fill in all required fields");
      return;
    }

    const product = {
      id: Math.max(...products.map((p) => p.id), 0) + 1,
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

  const availableCategories = Array.from(
    new Set([
      ...products.map((p) => p.category),
      ...categories.map((c) => c.name),
    ])
  );

  return (
    <Box sx={{ p: 3, spaceY: 4 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Products List
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Manage your product inventory
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          {onNavigateToCategories && (
            <Button
              variant="outlined"
              startIcon={<TagsIcon />}
              onClick={onNavigateToCategories}
            >
              Manage Categories
            </Button>
          )}

          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleExport}
          >
            Export
          </Button>

          <Button
            variant="outlined"
            component="label"
            startIcon={<UploadIcon />}
            sx={{ cursor: "pointer" }}
          >
            Import
            <input type="file" accept=".json" hidden onChange={handleImport} />
          </Button>

          <Button
            variant="contained"
            color="success"
            startIcon={<PlusIcon />}
            onClick={() => setIsCreateDialogOpen(true)}
          >
            Create new
          </Button>
        </Box>
      </Box>

      {/* Filters */}
      <Paper
        sx={{ p: 2, mb: 3, display: "flex", gap: 2, alignItems: "center" }}
      >
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            value={selectedCategory}
            label="Category"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <MenuItem value="All category">All category</MenuItem>
            {availableCategories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          variant="outlined"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
          }}
          sx={{ flexGrow: 1, maxWidth: 400 }}
        />
      </Paper>

      {/* Products Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={40}
                    height={40}
                    style={{ borderRadius: 4, objectFit: "cover" }}
                  />
                </TableCell>

                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>

                <TableCell>
                  <Badge
                    color={getStatusColor(product.status)}
                    badgeContent={product.status}
                    sx={{
                      "& .MuiBadge-badge": {
                        right: -15,
                        top: 10,
                        padding: "0 8px",
                        borderRadius: 1,
                      },
                    }}
                  />
                </TableCell>

                <TableCell>{product.date}</TableCell>

                <TableCell align="right">
                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}
                  >
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setEditingProduct(product);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create Product Dialog */}
      <Dialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create New Product</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Name *"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Price *"
              type="number"
              inputProps={{ step: "0.01" }}
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={newProduct.status}
                label="Status"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, status: e.target.value })
                }
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Archived">Archived</MenuItem>
                <MenuItem value="Disabled">Disabled</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Category *</InputLabel>
              <Select
                value={newProduct.category}
                label="Category *"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.name}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
          <Button
  variant="contained"
  onClick={handleCreateProduct}
  disabled={
    !newProduct.name || !newProduct.price}
>
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent dividers>
          {editingProduct && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Name"
                value={editingProduct.name}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, name: e.target.value })
                }
                fullWidth
              />
              <TextField
                label="Price"
                type="number"
                inputProps={{ step: "0.01" }}
                value={editingProduct.price}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    price: e.target.value,
                  })
                }
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={editingProduct.status}
                  label="Status"
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      status: e.target.value,
                    })
                  }
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Archived">Archived</MenuItem>
                  <MenuItem value="Disabled">Disabled</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={editingProduct.category}
                  label="Category"
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      category: e.target.value,
                    })
                  }
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.name}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditProduct}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 1 }}>
        <Button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Typography sx={{ alignSelf: "center" }}>
          Page {currentPage} of {totalPages}
        </Typography>
        <Button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
