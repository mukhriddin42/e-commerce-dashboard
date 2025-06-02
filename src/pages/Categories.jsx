"use client"

import { useState, useEffect } from "react"

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    parent: "",
    description: "",
  })
  const [editingCategory, setEditingCategory] = useState(null)

  useEffect(() => {
    // Load initial data
    fetch("/data/categories.json")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => {
        // Fallback data
        const fallbackData = [
          {
            id: 1,
            name: "Cafe & Milk",
            description: "Cafe & Milk",
            slug: "cafe",
            order: 1,
          },
        ]
        setCategories(fallbackData)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

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

    setFormData({
      name: "",
      slug: "",
      parent: "",
      description: "",
    })
  }

  const handleEdit = (category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      slug: category.slug,
      parent: "",
      description: category.description,
    })
  }

  const handleDelete = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id))
  }

  const handleCancel = () => {
    setEditingCategory(null)
    setFormData({
      name: "",
      slug: "",
      parent: "",
      description: "",
    })
  }

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Categories</h1>
      <p style={{ color: "#666" }}>Add, edit or delete a category</p>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px", flexWrap: "wrap" }}>
        {/* Form */}
        <form onSubmit={handleSubmit} style={{ flex: "1", minWidth: "300px", border: "1px solid #ddd", padding: "20px", borderRadius: "8px" }}>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="name">Name</label><br />
            <input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Category name"
              required
              style={{ width: "100%", padding: "8px" }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="slug">Slug</label><br />
            <input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="category-slug"
              style={{ width: "100%", padding: "8px" }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="parent">Parent</label><br />
            <select
              id="parent"
              value={formData.parent}
              onChange={(e) => setFormData({ ...formData, parent: e.target.value })}
              style={{ width: "100%", padding: "8px" }}
            >
              <option value="">No parent</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>{category.name}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="description">Description</label><br />
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Category description"
              rows={3}
              style={{ width: "100%", padding: "8px" }}
            ></textarea>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button type="submit" style={{ flex: 1, background: "green", color: "white", padding: "10px", border: "none", cursor: "pointer" }}>
              {editingCategory ? "Update category" : "Create category"}
            </button>
            {editingCategory && (
              <button type="button" onClick={handleCancel} style={{ padding: "10px" }}>
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Table */}
        <div style={{ flex: "2", minWidth: "400px", border: "1px solid #ddd", borderRadius: "8px", padding: "10px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f0f0f0" }}>
                <th style={{ padding: "8px", border: "1px solid #ddd" }}>Name</th>
                <th style={{ padding: "8px", border: "1px solid #ddd" }}>Description</th>
                <th style={{ padding: "8px", border: "1px solid #ddd" }}>Slug</th>
                <th style={{ padding: "8px", border: "1px solid #ddd" }}>Order</th>
                <th style={{ padding: "8px", border: "1px solid #ddd" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>{category.name}</td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>{category.description}</td>
                  <td style={{ padding: "8px", border: "1px solid #ddd", color: "blue" }}>{category.slug}</td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>{category.order}</td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    <button onClick={() => handleEdit(category)} style={{ marginRight: "5px" }}>Edit</button>
                    <button onClick={() => handleDelete(category.id)} style={{ color: "red" }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
