import axios from "axios"
import { useEffect, useState } from "react"
import './Category.css';
export default function Categories() {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState('');

  useEffect(() => {
    getCategories();
  }, [])


  function getCategories() {
    axios
      .get("http://localhost:3000/categories")
      .then((response) => setCategories(response.data))
  }

  function addCategory() {
    axios
      .post("http://localhost:3000/categories", {
        name: name
      })
  }

  function editCategory(idEdit, nameEdit) {
    axios
      .put(`http://localhost:3000/categories/${idEdit}`, {
        name: nameEdit
      })
      .then(() => getCategories())
  }

  function deleteCategort(idEdit) {
    axios
      .delete(`http://localhost:3000/categories/${idEdit}`)
      .then(() => getCategories())
  }

  return (
    <div className="category">
      <h1>Add new category</h1>
      <form>
        <input value={name} type="text" placeholder="Category name" onChange={(event) => setName(event.target.value)} />
        <button type="submit" onClick={() => addCategory()}>Add</button>
      </form>

      <h1>Categories</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>
                <form>
                  <input
                    value={category.name}
                    type="text"
                    placeholder="Category name"
                    onChange={(event) => editCategory(category.id, event.target.value)}
                  />
                </form>
              </td>
              <td>
                <button onClick={() => deleteCategort(category.id)} >X</button>
              </td>
            </tr>
          ), [])}
        </tbody>
      </table>
    </div>
  )
}
