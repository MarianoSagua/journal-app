export const fileUpload = async (file) => {
  if (!file) throw new Error("No tenemos ningun archivo a subir");

  const cloudUrl = process.env.REACT_APP_CLOUDINARY_URL;

  const formData = new FormData();
  formData.append("upload_preset", "react-journal");
  formData.append("file", file);

  try {
    const resp = await fetch(cloudUrl, {
      method: "POST",
      body: formData,
    });

    if (!resp.ok) throw new Error("No se pudo subir la imagen");

    const cloudResp = await resp.json();

    return cloudResp;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
