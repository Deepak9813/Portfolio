import { useState, useEffect } from "react";
import { FileText, Upload, Download, ExternalLink, FileCode } from "lucide-react";

export default function Blog() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Cleanup object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      files.forEach((f) => URL.revokeObjectURL(f.url));
    };
  }, [files]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
      type: file.type,
      name: file.name
    }));
    setFiles(selectedFiles);
  };

  const handleUpload = async () => {
    if (!files.length) return;
    setUploading(true);
    try {
      const formData = new FormData();
      files.forEach((f) => formData.append("files", f.file));
      
      // Simulated API call (replace with your Django endpoint)
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");
      
      const data = await res.json(); 
      setUploadedFiles(data);
      setFiles([]);
    } catch (err) {
      // For demo purposes, we'll simulate a success if no real API is connected
      console.error("Upload Error:", err.message);
      // alert(err.message); 
    } finally {
      setUploading(false);
    }
  };

  const handleOpen = (f) => {
    const url = f.url || f.file?.url;
    if (!url) return;
    if (f.type === "application/pdf") {
      window.open(url, "_blank");
    } else {
      window.open(`https://docs.google.com/gview?url=${url}&embedded=true`, "_blank");
    }
  };

  const renderFileCard = (f) => (
    <div key={f.url || f.name} className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-4 transition-all hover:border-blue-500/50 group">
      <div className="flex items-center gap-4 w-full">
        <div className="p-3 bg-slate-900 rounded-lg text-blue-400 group-hover:bg-blue-500/10 transition-colors">
          {f.type === "application/pdf" ? <FileText size={24} /> : <FileCode size={24} />}
        </div>
        <div className="overflow-hidden">
          <p className="text-slate-200 font-medium truncate w-full max-w-[200px] md:max-w-xs">
            {f.file?.name || f.name}
          </p>
          <span className="text-[10px] uppercase tracking-wider text-blue-500 font-bold">
            {f.type === "application/pdf" ? "PDF Document" : "DOCX / Word"}
          </span>
        </div>
      </div>
      
      <div className="flex gap-2 w-full sm:w-auto">
        <button 
          onClick={() => handleOpen(f)} 
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-700 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm transition-colors"
        >
          <ExternalLink size={16} /> Open
        </button>
        <a 
          href={f.url || f.file?.url} 
          download={f.file?.name || f.name} 
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm transition-colors"
        >
          <Download size={16} /> Download
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans">
      {/* ================= HERO SECTION ================= */}
      <div className="w-full h-[45vh] relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" 
          alt="Blog Cover" 
          className="w-full h-full object-cover brightness-[0.3]" 
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
          <span className="bg-blue-600/20 text-blue-400 border border-blue-500/30 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            Development Insights
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            Professional <span className="text-blue-500">Blog</span>
          </h1>
          <p className="text-slate-400 max-w-2xl text-lg">
            Exploring the intersection of scalable backend architecture and modern frontend design.
          </p>
        </div>
      </div>

      {/* ================= CONTENT SECTION ================= */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 p-8 md:p-12 rounded-3xl shadow-2xl">
          <article className="prose prose-invert max-w-none mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">File Handling in Full Stack Apps</h2>
            <p className="text-slate-400 leading-relaxed text-lg mb-6">
              This module demonstrates a professional file handling system. Whether you're managing
              academic documentation for <strong>projects or corporate reports</strong>, 
              scalable file processing is essential. This system allows for real-time previews 
              and secure downloads.
            </p>
          </article>

          {/* ================= FILE UPLOAD AREA ================= */}
          <div className="bg-slate-900/60 p-8 rounded-2xl border border-slate-800 shadow-inner">
            <div className="flex items-center gap-3 mb-8">
              <Upload className="text-blue-500" size={28} />
              <h3 className="text-xl font-bold text-white">Project Documentation</h3>
            </div>
            
            <div className="group relative border-2 border-dashed border-slate-700 hover:border-blue-500/50 transition-colors rounded-xl p-8 text-center bg-slate-800/30">
              <input 
                type="file" 
                accept=".pdf,.doc,.docx" 
                multiple 
                onChange={handleFileChange} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center">
                <FileText className="text-slate-500 mb-4 group-hover:text-blue-400 transition-colors" size={48} />
                <p className="text-slate-400">
                  <span className="text-blue-500 font-bold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-slate-500 mt-2">PDF, DOC, DOCX (Max 10MB)</p>
              </div>
            </div>

            {files.length > 0 && (
              <button 
                onClick={handleUpload} 
                disabled={uploading} 
                className="w-full mt-6 bg-blue-600 hover:bg-blue-500 py-4 rounded-xl text-white font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] disabled:opacity-50"
              >
                {uploading ? "Processing Files..." : `Upload ${files.length} Document(s)`}
              </button>
            )}

            {/* Preview List */}
            {files.length > 0 && (
              <div className="mt-10">
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Selected Previews</h4>
                <div className="space-y-4">
                  {files.map(renderFileCard)}
                </div>
              </div>
            )}

            {/* Uploaded List */}
            {uploadedFiles.length > 0 && (
              <div className="mt-10 pt-10 border-t border-slate-800">
                <h4 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-4">Vaulted Documents</h4>
                <div className="space-y-4">
                  {uploadedFiles.map(renderFileCard)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}