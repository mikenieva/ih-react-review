import React, { useState } from "react";
import { nanoid } from "nanoid";

export default function Main() {
  // 1. HOOKS
  const [newComment, setNewComment] = useState({
    title: "",
    description: "",
  });
  const [comments, setComments] = useState([]);
  const [edition, setEdition] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState(null);

  // 2. FORMULARIO

  const handleChange = (event) => {
    event.preventDefault();

    setNewComment({
      ...newComment,
      id: nanoid(),
      [event.target.name]: event.target.value,
    });
  };

  // 3. CRUD

  const addComment = (event) => {
    event.preventDefault();

    if (!newComment.title.trim() || !newComment.description.trim()) {
      setError("Escriba algo por favor...");
      return;
    }

    setComments([newComment, ...comments]);
    setNewComment({
      title: "",
      description: "",
    });
    setError(null);
  };

  const deleteComment = (id) => {
    const arrayFiltrado = comments.filter((item) => item.id !== id);
    setComments(arrayFiltrado);
  };

  const editComment = (e) => {
    e.preventDefault();

    if (!newComment.title.trim() || !newComment.description.trim()) {
      setError("Debes rellenar los cuadros");
      return;
    }

    const modifiedArray = comments.map((element) => {
      return element.id === id
        ? {
            id: id,
            title: newComment.title,
            description: newComment.description,
          }
        : element;
    });

    setComments(modifiedArray);
    setEdition(false);
    setNewComment({
      title: "",
      description: "",
    });
    setError(null);
  };

  const edit = (element) => {
    setEdition(true);
    setNewComment({
      id: element.id,
      title: element.title,
      description: element.description,
    });
    setId(element.id);
  };

  // 4. RETORNO

  return (
    <>
      {/* TÍTULO */}
      <h2 className="text-center text-3xl text-gray-900 py-8 sm:text-4xl">Caja de Comentarios</h2>
      {/* FORMULARIO */}
      <div className={edition ? "max-w-5xl mx-auto px-6 pb-6 sm:px-12 bg-yellow-100 rounded-md" : "max-w-5xl mx-auto px-6 sm:px-12" }>
        <form onSubmit={edition ? editComment : addComment}>
          <h3 className="text-lg leading-6 font-medium text-gray-900 py-3">Asunto</h3>
          <input
            name="title"
            className="border shadow-sm mt-2 p-2 border-gray-200 block w-full focus:ring-blue-700 focus:border-blue sm:text-sm"
            onChange={(e) => handleChange(e)}
            value={newComment.title}
          />
          <h3 className="text-lg mt-4 leading-6 font-medium text-gray-900 py-3">Descripción</h3>
          <textarea
            name="description"
            rows="3"
            onChange={(e) => handleChange(e)}
            className="max-w-full mt-2 border p-2 shadow-sm border-gray-200 block w-full focus:ring-blue-700 focus:border-blue sm:text-sm"
            value={newComment.description}
          />
          {edition ? 
            ( <button className="inline-flex items-center max-h-12 px-3 my-4 py-2 border border-transparent text-sm leading-4 font-medium shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">Editar</button> ) 
          : 
            ( <button className="inline-flex items-center max-h-12 px-3 my-4 py-2 border border-transparent text-sm leading-4 font-medium shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700">Agregar</button> ) }  
        </form>

        {error ? (
          <div className="bg-yellow-50 p-4 my-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="whitespace-nowrap text-sm font-medium text-yellow-800">{error}</h3>
            </div>
          </div>
        </div>
        ) : null}
      </div>
      {/* LISTADO DE COMENTARIOS */}
      <div className="max-w-5xl mx-auto px-6 sm:px-12">
      {comments.length === 0 ? (
          <div className="bg-blue-50 p-4 my-4">
            <div className="flex">
              <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              </div>
              <div className="ml-3">
                <h3 className="whitespace-nowrap text-sm font-medium text-blue-800">Aún no has creado comentarios.</h3>
              </div>
            </div>
          </div>
        ) 
        : 
        (
          comments.map((element, i) => (
            <article 
              className="flex justify-between pb-5 pt-5 border-b border-gray-200"
              key={i}
            >
              <div className="max-w-6xl">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{element.title}</h3>
                <p className="mt-2 max-w-4xl text-sm text-gray-500">{element.description}</p>
              </div>
              <div className="mt-3 flex sm:mt-0 sm:ml-4">
                <button 
                  onClick={() => deleteComment(element.id)}
                  className="inline-flex max-h-12 items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
                >
                  Eliminar
                </button>
                <button 
                  className="ml-3 max-h-12 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
                  onClick={() => edit(element)}>
                  Editar
                </button>
              </div>
            </article>
          )
        ))}
      </div>
    </>
  );
}