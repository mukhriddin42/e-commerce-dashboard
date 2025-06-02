"use client"

import React, { useState, useEffect } from "react"
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material"
import { Edit, Delete, Add, ArrowBack } from "@mui/icons-material"

export default function Categories({ onBack }) {
  const [categories, setCategories] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    parent: "",
    description: "",
  })
  const [editingCategory, setEditingCategory] = useState(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState(null)

  useEffect(() => {
    fetch("/data/categories.json")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => {
        const fallbackData = [
          { id: 1, name: "Organic food", description: "Fresh and organic food products", slug: "organic-food", order: 1 },
          { id: 2, name: "Beverages", description: "All kinds of drinks and beverages", slug: "beverages", order: 2 },
          { id: 3, name: "Bakery", description: "Fresh bread and bakery items", slug: "bakery", order: 3 },
          { id: 4, name: "Electronics", description: "Electronic devices and gadgets", slug: "electronics", order: 4 },
          { id: 5, name: "Clothing", description: "Fashion and clothing items", slug: "clothing", order: 5 },
        ]
        setCategories(fallbackData)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      alert("Category name is required")
      return
    }
    if (editingCategory) {
      setCategories(
        categories.map((cat) =>
          cat.id === editingCategory.id
            ? {
                ...editingCategory,
                ...formData,
                slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-"),
              }
            : cat,
        ),
      )
      setEditingCategory(null)
    } else {
      const newCategory = {
        id: Math.max(...categories.map((c) => c.id), 0) + 1,
        name: formData.name,
        description: formData.description,
        slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-"),
        order: categories.length + 1,
      }
      setCategories([...categories, newCategory])
    }
    setFormData({ name: "", slug: "", parent: "", description: "" })
  }

  const handleEdit = (category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      slug: category.slug,
      parent: category.parent || "",
      description: category.description,
    })
  }

  const handleDelete = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id))
    setDeleteDialogOpen(false)
    setCategoryToDelete(null)
  }

  const openDeleteDialog = (category) => {
    setCategoryToDelete(category)
    setDeleteDialogOpen(true)
  }

  const handleCancel = () => {
    setEditingCategory(null)
    setFormData({ name: "", slug: "", parent: "", description: "" })
  }

  const exportCategories = () => {
    const dataStr = JSON.stringify(categories, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = "categories.json"
    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {onBack && (
            <Button variant="outlined" startIcon={<ArrowBack />} onClick={onBack}>
              Back to Products
            </Button>
          )}
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Categories
            </Typography>
            <Typography color="text.secondary" mt={0.5}>
              Add, edit or delete categories
            </Typography>
          </Box>
        </Box>
        <Button variant="outlined" onClick={exportCategories}>
          Export Categories
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        {/* Form */}
        <Card sx={{ flex: "1 1 300px", maxWidth: 400 }}>
          <CardHeader
            title={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Add />
                {editingCategory ? "Edit Category" : "Add New Category"}
              </Box>
            }
          />
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                required
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                helperText="Leave empty to auto-generate from name"
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="parent-label">Parent Category</InputLabel>
                <Select
                  labelId="parent-label"
                  value={formData.parent}
                  label="Parent Category"
                  onChange={(e) => setFormData({ ...formData, parent: e.target.value })}
                >
                  <MenuItem value="">No parent</MenuItem>
                  {categories
                    .filter((cat) => (editingCategory ? cat.id !== editingCategory.id : true))
                    .map((cat) => (
                      <MenuItem key={cat.id} value={cat.name}>
                        {cat.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                margin="normal"
              />

              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Button variant="contained" type="submit" fullWidth>
                  {editingCategory ? "Update Category" : "Create Category"}
                </Button>
                {editingCategory && (
                  <Button variant="outlined" onClick={handleCancel} fullWidth>
                    Cancel
                  </Button>
                )}
              </Box>
            </form>
          </CardContent>
        </Card>

        {/* Table */}
        <Card sx={{ flex: "2 1 600px" }}>
          <CardHeader title={`Categories List (${categories.length})`} />
          <CardContent sx={{ p: 0 }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Slug</TableCell>
                    <TableCell>Order</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>
                        {category.name}
                        {category.parent && (
                          <Typography variant="caption" color="text.secondary" display="block">
                            Parent: {category.parent}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell sx={{ maxWidth: 250, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {category.description}
                      </TableCell>
                      <TableCell>
                        <code>{category.slug}</code>
                      </TableCell>
                      <TableCell>{category.order}</TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                          <Button variant="outlined" size="small" startIcon={<Edit />} onClick={() => handleEdit(category)}>
                            Edit
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            startIcon={<Delete />}
                            onClick={() => openDeleteDialog(category)}
                          >
                            Delete
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>

      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the category "{categoryToDelete?.name}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button color="error" onClick={() => handleDelete(categoryToDelete?.id)} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
