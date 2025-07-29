import React, { useRef } from "react";

export const FileUpload = () => {
  const fileInput = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fileInput.current || !fileInput.current.files) {
      console.log('we got some error here, cannot upload')
    }
    if (fileInput.current && fileInput.current.files) {
      const formData = new FormData();
      formData.append("file", fileInput.current.files[0]);
      const response = await fetch(`${import.meta.env.VITE_BACK}goods/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      alert(JSON.stringify(data));
    }


  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input type="file" ref={fileInput} />
      <button type="submit">Upload XLS</button>
    </form>
  );
}