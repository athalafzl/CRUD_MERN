import { useEffect, useState } from "react";

function Buku({ setMessage, message }) {
  const [buku, setBuku] = useState([]);
  const [isLoadingBuku, setIsLoadingBuku] = useState(true);
  const [judul, setJudul] = useState("");
  const [penulis, setPenulis] = useState("");
  const [tahun, setTahun] = useState("");
  const [editId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    async function getBuku() {
      setIsLoadingBuku(true);
      try {
        const response = await fetch("https://crud-mern-15iw.vercel.app/buku", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const dataBuku = await response.json();
        setBuku(dataBuku.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadingBuku(false);
      }
    }

    getBuku();
  }, []);

  function handleOpenAddModal() {
    setEditId(null);
    setJudul("");
    setPenulis("");
    setTahun("");
    setMessage("");
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setEditId(null);
    setJudul("");
    setPenulis("");
    setTahun("");
    setMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("https://crud-mern-15iw.vercel.app/buku", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          judul: judul,
          penulis: penulis,
          tahun: Number(tahun),
        }),
      });

      const dataBuku = await response.json();

      if (!response.ok) {
        setMessage(dataBuku.message);
        return;
      }

      setBuku([...buku, dataBuku.dataBuku]);
      setMessage("");
      setJudul("");
      setPenulis("");
      setTahun("");
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdate(event) {
    event.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://crud-mern-15iw.vercel.app/buku/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            judul,
            penulis,
            tahun: Number(tahun),
          }),
        },
      );

      const dataBuku = await response.json();

      if (!response.ok) {
        setMessage(dataBuku.message);
        return;
      }

      setBuku(
        buku.map((item) => {
          if (item._id === editId) {
            return dataBuku.data;
          }

          return item;
        }),
      );

      setMessage("");
      setEditId(null);
      setJudul("");
      setPenulis("");
      setTahun("");
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  function handleEdit(item) {
    setEditId(item._id);
    setJudul(item.judul);
    setPenulis(item.penulis);
    setTahun(item.tahun);
    setMessage("");
    setIsModalOpen(true);
  }

  async function handleDelete(id) {
    const token = localStorage.getItem("token");

    await fetch(`https://crud-mern-15iw.vercel.app/buku/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setBuku(buku.filter((item) => item._id !== id));
  }

  return (
    <>
      {/* Action Bar */}
      <div className="action-bar">
        <button className="add-book-button" onClick={handleOpenAddModal}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Add New Book</span>
        </button>
      </div>

      {/* Books Table Card */}
      <div className="books-card">
        <div className="table-responsive">
          <table className="books-table">
            <thead>
              <tr>
                <th style={{ width: "42%" }}>BOOK</th>
                <th style={{ width: "30%" }}>AUTHOR</th>
                <th style={{ width: "16%" }}>YEAR</th>
                <th style={{ width: "12%", textAlign: "right" }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {isLoadingBuku ? (
                <tr>
                  <td
                    colSpan="4"
                    style={{
                      textAlign: "center",
                      padding: "48px 20px",
                      color: "#64748b",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          border: "3px solid #e2e8f0",
                          borderTopColor: "#0d1527",
                          animation: "loadingSpin 0.8s linear infinite",
                        }}
                      />
                      <span style={{ fontSize: "13.5px", fontWeight: 500 }}>
                        Memuat data buku...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : buku && buku.length > 0 ? (
                buku.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td className="book-title-cell">{item.judul}</td>
                      <td className="book-author-cell">{item.penulis}</td>
                      <td>
                        <span className="book-year-badge">{item.tahun}</span>
                      </td>
                      <td>
                        <div className="actions-cell">
                          <button
                            className="action-icon-button"
                            onClick={() => handleEdit(item)}
                            aria-label="Edit book"
                            title="Edit"
                          >
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                              <path d="m15 5 4 4" />
                            </svg>
                          </button>

                          <button
                            className="action-icon-button delete"
                            onClick={() => handleDelete(item._id)}
                            aria-label="Delete book"
                            title="Delete"
                          >
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M3 6h18" />
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                              <line x1="10" y1="11" x2="10" y2="17" />
                              <line x1="14" y1="11" x2="14" y2="17" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    style={{
                      textAlign: "center",
                      padding: "40px",
                      color: "#94a3b8",
                    }}
                  >
                    No books found. Click "+ Add New Book" to add one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="table-pagination">
          <button className="pagination-button" disabled>
            &lt; Previous
          </button>
          <button className="pagination-button">Next &gt;</button>
        </div>
      </div>

      {/* Modal Form Tambah / Edit Buku */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-accent-bar" />

            <div className="modal-header">
              <h3 className="modal-title">
                {editId === null ? "Add Book" : "Edit Book"}
              </h3>
              <button
                type="button"
                className="close-button"
                onClick={handleCloseModal}
                aria-label="Close modal"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <form
              className="modal-form"
              onSubmit={editId === null ? handleSubmit : handleUpdate}
            >
              <div className="form-field">
                <label className="form-label" htmlFor="modal-judul">
                  Book Title <span className="required-star">*</span>
                </label>
                <div className="modal-input-box">
                  <span className="modal-input-icon">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                  </span>
                  <input
                    id="modal-judul"
                    type="text"
                    name="judul"
                    className="modal-input-field"
                    placeholder="Enter book title"
                    value={judul}
                    onChange={(event) => setJudul(event.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="modal-penulis">
                  Author <span className="required-star">*</span>
                </label>
                <div className="modal-input-box">
                  <span className="modal-input-icon">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  <input
                    id="modal-penulis"
                    type="text"
                    name="penulis"
                    className="modal-input-field"
                    placeholder="Enter author name"
                    value={penulis}
                    onChange={(event) => setPenulis(event.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="modal-tahun">
                  Publication Year <span className="required-star">*</span>
                </label>
                <div className="modal-input-box">
                  <span className="modal-input-icon">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </span>
                  <input
                    id="modal-tahun"
                    type="number"
                    name="tahun"
                    className="modal-input-field"
                    placeholder="e.g. 2024"
                    value={tahun}
                    onChange={(event) => setTahun(event.target.value)}
                    required
                  />
                </div>
              </div>

              {message && <div className="alert-message">{message}</div>}

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  {editId === null ? (
                    <>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                      <span>Add Book</span>
                    </>
                  ) : (
                    <span>Save Changes</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Buku;
