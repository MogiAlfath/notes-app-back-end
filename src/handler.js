const { nanoid } = require("nanoid");
const notes = require("./notes");
// Add Notes
const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updateAt = createdAt;

  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updateAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Catatan Berhasil ditambahkan!",
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Catatan Gagal Ditambahkan!",
    data: {
      noteId: id,
    },
  });
  response.code(500);
  return response;
};
// GET Notes
const getAllNoteHandler = () => ({
  status: "success",
  data: {
    notes,
  },
});
//GET Notes By ID
const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const note = notes.filter((n) => n.id === id)[0];
  if (note !== undefined) {
    return {
      status: "success",
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: "fail",
    message: "Catatan tidak ditemukan",
  });
  response.code(404);
  return response;
};
//EDIT NOTES
const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const { title, tags, body } = request.payload;
  const updateAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updateAt,
    };

    const response = h.response({
      status: "success",
      message: "Catatan Berhasil diPerbarui",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Gagal Memperbarui Catatan, ID tidak ditemukan!",
  });
  response.code(404);
  return response;
};
// DELETE NOTES
const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Catatan Berhasil Dihapus",
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Catatan Gagal Dihapus, ID tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNoteHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
