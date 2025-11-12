import { useRef, useState } from "react";
import { cadastrarUsuario } from "../../services/cadastroService";
import { loginUsuario } from "../../services/loginService";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    setFoto(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", nameRef.current.value);
    formData.append("email", emailRef.current.value);
    formData.append("password", passwordRef.current.value);
    if (foto) formData.append("foto", foto);

    try {
      await cadastrarUsuario(formData);
      alert("Cadastro realizado com sucesso!");

      const loginResponse = await loginUsuario({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      const { token } = loginResponse;
      localStorage.setItem("token", token);
      navigate("/listar-usuarios");
    } catch (error) {
      alert(error.response?.data?.message || "Erro ao cadastrar usuário.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-sm transition-colors duration-300"
        encType="multipart/form-data"
      >
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 text-center">
          Criar Conta
        </h2>

        <div className="flex justify-center mb-8">
          <label
            htmlFor="foto-upload"
            className="cursor-pointer relative group"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center">
              {preview ? (
                <img
                  src={preview}
                  alt="Pré-visualização"
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-gray-500 text-2xl">📷</span>
              )}
            </div>
            <input
              id="foto-upload"
              type="file"
              accept="image/*"
              onChange={handleFotoChange}
              className="hidden"
            />
            <div className="absolute inset-0 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
              <span className="text-white text-xs font-medium">Trocar</span>
            </div>
          </label>
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Nome completo
          </label>
          <input
            ref={nameRef}
            type="text"
            placeholder="Seu nome completo"
            required
            className="w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
              dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            E-mail
          </label>
          <input
            ref={emailRef}
            type="email"
            placeholder="email@exemplo.com"
            required
            className="w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
              dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Senha
          </label>
          <input
            ref={passwordRef}
            type="password"
            placeholder="••••••••"
            required
            className="w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
              dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 text-white font-semibold rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 
            focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-blue-300 ${
              loading
                ? "bg-blue-700 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            }`}
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}
